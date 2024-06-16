const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let counters = {
  "g-": 161322,
  "s-": 14444
};

app.get('/', (req, res) => {
  const keys = Object.keys(counters);
  const availableKeys = keys.filter(key => counters[key] > 0);

  if (availableKeys.length === 0) {
    return res.status(400).send('Both counters are zero or less.');
  }

  const randomKey = availableKeys[Math.floor(Math.random() * availableKeys.length)];
  const currentValue = counters[randomKey];

  res.status(200).send(`${randomKey}${currentValue}`);
  counters[randomKey] -= 1;
});

app.listen(port, () => {
  console.log(`Counter app listening at http://localhost:${port}`);
});
