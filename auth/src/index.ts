import express from 'express';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/singin';
import { signoutRotuer } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signupRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
