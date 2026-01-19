/**
 * Semantic Search Service
 * Performs similarity search across material embeddings
 * Modular component for retrieval
 */

const Material = require('../models/Material');
const embeddingService = require('./embeddingService');

class SemanticSearchService {
  /**
   * Search for relevant material chunks based on query
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Promise<Object[]>} - Relevant chunks with similarity scores
   */
  async search(query, options = {}) {
    const {
      subject = null,
      topic = null,
      topK = 5,
      minSimilarity = 0.3
    } = options;

    try {
      // Generate embedding for the query
      const queryEmbedding = await embeddingService.generateEmbedding(query);

      // Build filter query
      const filter = { isProcessed: true };
      if (subject) filter.subject = subject;
      if (topic) filter.topic = topic;

      // Get all processed materials matching filter
      const materials = await Material.find(filter)
        .select('title subject topic chunks')
        .lean();

      // Calculate similarities for all chunks
      const results = [];

      for (const material of materials) {
        if (!material.chunks || material.chunks.length === 0) continue;

        for (const chunk of material.chunks) {
          if (!chunk.embedding || chunk.embedding.length === 0) continue;

          const similarity = embeddingService.cosineSimilarity(
            queryEmbedding,
            chunk.embedding
          );

          if (similarity >= minSimilarity) {
            results.push({
              materialId: material._id,
              materialTitle: material.title,
              subject: material.subject,
              topic: material.topic,
              chunkIndex: chunk.chunkIndex,
              content: chunk.content,
              similarity: similarity
            });
          }
        }
      }

      // Sort by similarity and return top K
      results.sort((a, b) => b.similarity - a.similarity);
      return results.slice(0, topK);
    } catch (error) {
      console.error('Error in semantic search:', error);
      throw error;
    }
  }

  /**
   * Get unique subjects from all materials
   * @returns {Promise<string[]>} - List of subjects
   */
  async getSubjects() {
    try {
      const subjects = await Material.distinct('subject');
      return subjects.sort();
    } catch (error) {
      console.error('Error getting subjects:', error);
      throw error;
    }
  }

  /**
   * Get topics for a specific subject
   * @param {string} subject - Subject name
   * @returns {Promise<string[]>} - List of topics
   */
  async getTopics(subject) {
    try {
      const topics = await Material.distinct('topic', { subject });
      return topics.sort();
    } catch (error) {
      console.error('Error getting topics:', error);
      throw error;
    }
  }

  /**
   * Format retrieved chunks as context for LLM
   * @param {Object[]} chunks - Retrieved chunks
   * @returns {string} - Formatted context string
   */
  formatContext(chunks) {
    if (!chunks || chunks.length === 0) {
      return 'No relevant course materials found.';
    }

    let context = 'Relevant Course Material Context:\n\n';

    chunks.forEach((chunk, index) => {
      context += `[Source ${index + 1}: ${chunk.materialTitle} - ${chunk.subject}/${chunk.topic}]\n`;
      context += `${chunk.content}\n\n`;
    });

    return context;
  }
}

module.exports = new SemanticSearchService();
