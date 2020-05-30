import app from './app';

require('dotenv').config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Listening: http://localhost:${port}`);
});
