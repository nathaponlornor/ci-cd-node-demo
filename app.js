const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('My Family are Fendy,Serene and Dami we love together');
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});

