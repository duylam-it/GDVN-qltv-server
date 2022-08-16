import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { json, urlencoded } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });
const app = express();

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Logger
import log from 'morgan';
app.use(log('dev'));

// Setup Cookie Parser
app.use(cookieParser());

// Setup Cross Origin
app.use(
  cors({
    origin: '*'
  })
);

// Bring in the routes
import routes from './routes/index.js';
routes(app);

// DB Connect
import db from './config/db.js';
db.connect();

// Cron
import cron from 'node-cron';
import { cleanUser } from './controller/scheduleController.js';
cron.schedule(
  '0 6 * * *',
  () => {
    console.log('Schedule started');
    cleanUser();
    console.log('Schedule stopped');
  },
  { scheduled: true, timezone: 'Asia/Ho_Chi_Minh' }
);

const PORT = Number(process.env.PORT) || 8000;
app.listen(PORT, () => console.log('Connected to port ' + PORT));
