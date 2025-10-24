const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const testTexts = [
  "I love this product!",
  "This is the worst service ever.",
  "It's okay, not too bad."
];

testTexts.forEach(text => {
  const result = sentiment.analyze(text);
  const label = result.score > 0 ? "Positive" : result.score < 0 ? "Negative" : "Neutral";
  console.log(`"${text}" → ${label} (Score: ${result.score})`);
});
