// Vercel serverless function for code review (CommonJS)
const { reviewCode } = require('../src/services/ai.service.js');

module.exports = async (req, res) => {
         if (req.method !== 'POST') {
                  res.status(405).json({ error: 'Method not allowed' });
                  return;
         }
         try {
                  const { code } = req.body;
                  const review = await reviewCode(code);
                  res.status(200).json(review);
         } catch (error) {
                  res.status(500).json({ error: 'Error fetching review' });
         }
};
