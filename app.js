require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./configs/errorHandler');

const router = require('./routes');

const { MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb', PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use(helmet());
app.use(cookieParser());
app.use(cors());
app.use(router);
app.use(errors());

app.use(errorHandler);

async function start() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await app.listen(PORT);
    // eslint-disable-next-line no-console
    console.log(`Ееееее все запустилось\n${MONGO_URL}\nPort: ${PORT}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

start();
