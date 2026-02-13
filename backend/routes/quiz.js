const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { generateTopicQuiz } = require('../controllers/quizController');

router.use(protect);

router.post('/topic/:topicId', authorize('student'), generateTopicQuiz);

module.exports = router;
