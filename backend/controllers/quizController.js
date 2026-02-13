const { GoogleGenerativeAI } = require('@google/generative-ai');
const Topic = require('../models/Topic');
const Course = require('../models/Course');

const MODELS = ['gemini-2.0-flash-lite', 'gemini-2.5-flash', 'gemini-2.0-flash'];

function extractJson(text) {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('Invalid JSON response');
  }
  const jsonStr = text.slice(start, end + 1);
  return JSON.parse(jsonStr);
}

function normalizeQuestions(rawQuestions, topicId, questionCount) {
  if (!Array.isArray(rawQuestions)) return [];

  const normalized = rawQuestions.map((q, index) => {
    const question = typeof q.question === 'string' ? q.question.trim() : '';
    const options = Array.isArray(q.options)
      ? q.options.map(opt => String(opt).trim()).filter(Boolean).slice(0, 4)
      : [];

    let answerIndex = Number.isInteger(q.answerIndex) ? q.answerIndex : null;
    if ((answerIndex === null || answerIndex < 0 || answerIndex >= options.length) && q.answer) {
      const answerText = String(q.answer).trim().toLowerCase();
      const idx = options.findIndex(opt => opt.toLowerCase() === answerText);
      if (idx >= 0) answerIndex = idx;
    }

    if (!question || options.length !== 4 || answerIndex === null || answerIndex < 0 || answerIndex >= 4) {
      return null;
    }

    return {
      id: `${topicId}_${index + 1}`,
      question,
      options,
      answerIndex,
      explanation: typeof q.explanation === 'string' ? q.explanation.trim() : ''
    };
  }).filter(Boolean);

  return normalized.slice(0, questionCount);
}

// @desc    Generate a quiz for a topic using Gemini
// @route   POST /api/quiz/topic/:topicId
// @access  Private (Student)
exports.generateTopicQuiz = async (req, res) => {
  try {
    const { questionCount = 10, difficulty = 'moderate' } = req.body || {};
    const count = Math.max(1, Math.min(20, parseInt(questionCount, 10) || 10));

    const topic = await Topic.findById(req.params.topicId)
      .populate('course', 'title subject')
      .populate('material', 'content title subject topic');

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    const course = topic.course?._id
      ? topic.course
      : await Course.findById(topic.course).select('title subject');

    const materialContent = topic.material?.content || '';
    const materialSnippet = materialContent
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 4000);

    const prompt = [
      'You are an expert educator creating a quiz for students.',
      `Generate ${count} multiple-choice questions at ${difficulty} difficulty.`,
      'Each question must have 4 options and one correct answer.',
      'Return strict JSON only with this structure:',
      '{"questions":[{"question":"...","options":["A","B","C","D"],"answerIndex":0,"explanation":"..."}]}',
      'Do not include markdown or code fences.',
      '',
      `Course: ${course?.title || 'Course'} (${course?.subject || 'Subject'})`,
      `Topic: ${topic.title}`,
      topic.description ? `Topic Description: ${topic.description}` : '',
      materialSnippet ? `Material Context: ${materialSnippet}` : ''
    ].filter(Boolean).join('\n');

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'Gemini API key not configured' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    let lastError = null;

    for (const modelName of MODELS) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const responseText = result?.response?.text();
        if (!responseText) throw new Error('Empty response');

        const parsed = extractJson(responseText);
        const questions = normalizeQuestions(parsed.questions, topic._id, count);
        if (questions.length < count) {
          throw new Error('Incomplete quiz generated');
        }

        return res.json({
          topicId: topic._id,
          questions,
          modelUsed: modelName
        });
      } catch (err) {
        lastError = err;
      }
    }

    throw lastError || new Error('Failed to generate quiz');
  } catch (error) {
    console.error('Generate quiz error:', error);
    res.status(500).json({ message: 'Error generating quiz' });
  }
};
