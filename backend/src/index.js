import express from 'express';
import cors from 'cors';

import userRouter from './routers/user.js';
import boxRouter from './routers/box.js';
import bitRouter from './routers/bit.js';
import commentRouter from './routers/comment.js';

import './db/connect.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(boxRouter);
app.use(bitRouter);
app.use(commentRouter);

app.listen(port, ()=>{console.log(`server running on port ${port}`)});