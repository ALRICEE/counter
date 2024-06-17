const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

let counters = {
  "g-": 161322,
  "s-": 14444
};

app.use(cors());

app.get('/', (req, res) => {
  const keys = Object.keys(counters);
  const availableKeys = keys.filter(key => counters[key] > 0);

  if (availableKeys.length === 0) {
    return res.status(400).send('Both counters are zero or less.');
  }

  let randomKey;
  if (Math.random() < 1 / 20 && counters["s-"] > 0) {
    randomKey = "s-";
  } else {
	  randomKey = "g-";
  }

  const currentValue = counters[randomKey];
  res.status(200).send(`${randomKey}${currentValue}`);
  counters[randomKey] -= 1;
});

app.listen(port, () => {
  console.log(`Counter app listening at http://localhost:${port}`);
});
