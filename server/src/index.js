const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((error, request, respose, next) => {
  console.log(error);
  return respose.sendStatus(500);
});

app.listen(3000, () => {
  console.log('🔥 Server started at http://localhost:3000');
});
