// Main Express app setup
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import * as routes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

import { stripeWebhook } from './controllers/webhookController.js';
const app = express();

app.post('/webhook/stripe', express.raw({ type: 'application/json' }), stripeWebhook);

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));



app.use(bodyParser.json());
app.use(express.json());

// Mount all routes
app.use('/auth', routes.authRoutes);
app.use('/user', routes.userRoutes);
app.use('/chatroom', routes.chatroomRoutes);
app.use('/subscribe', routes.subscribeRoutes);

app.use('/subscription', routes.subscriptionRoutes);

// Error handler middleware
app.use(errorHandler);

export default app;
