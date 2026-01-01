const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('version 2 of Hello from CI/CD Pipeline 🚀');
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});

