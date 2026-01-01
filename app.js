const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('version 3 webhook I love Dami and Serene');
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});

