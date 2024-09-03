import path from 'path';
import express from 'express';
import apiRoutes from '../routes.js'
import { fileURLToPath } from 'url';
import MongooseProvider from './providers/mongooseProvider.js';
import dotenv from 'dotenv';
import {passportSetup} from './providers/auth.js';
import Tokens from 'csrf';
import session from 'express-session';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const csrf = new Tokens();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static('uploads'));

MongooseProvider();


const secret = csrf.secretSync();

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: 'auto', maxAge: 3600000 }
}));

passportSetup(app);

app.use((req, _, next) => {
  req.session.secret = secret;
  next();
});

app.use('/api', apiRoutes);

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
