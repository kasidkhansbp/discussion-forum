import configureRoutes from './router';
import express from 'express';
import passport from './api/passportStrategySetup';
import cookieSession from 'cookie-session';
import keyGrip from 'keygrip';
import expressStatic from 'express-static';
import path from 'path'; 
import './database'; // configures the database

const logger = require('morgan');

const API_PORT = 3001;

const app = express();
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }));

app.use(cookieSession({
    name: 'session',
    keys: keyGrip(['suchasdcsj', 'dcbhsgccsa'], 'sha256') // random key to 
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(logger('dev'));

configureRoutes(app);
import './api/discussionsApi';
import './api/usersApi';

app.use(expressStatic(path.join(__dirname, 'client/build')))
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
   });
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));