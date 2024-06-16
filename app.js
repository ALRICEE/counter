const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Internal counters object
let counters = {
  "g-": 157855,
  "s-": 11014
};

app.get('/', (req, res) => {
  // Get keys of counters
  const keys = Object.keys(counters);

  // Filter out keys with values greater than 0
  const availableKeys = keys.filter(key => counters[key] > 0);

  // Check if both counters are 0 or less
  if (availableKeys.length === 0) {
    return res.status(400).send('Both counters are zero or less.');
  }

  // Randomly select one of the available counters
  const randomKey = availableKeys[Math.floor(Math.random() * availableKeys.length)];
  const currentValue = counters[randomKey];

  // Return the counter and decrement it
  res.status(200).send(`${randomKey}${currentValue}`);
  counters[randomKey] -= 1;
});

app.listen(port, () => {
  console.log(`Counter app listening at http://localhost:${port}`);
});
