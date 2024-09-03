import passport from "passport";
import Admin from "../models/AdminSchema.js";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from "dotenv";

dotenv.config();

// Define options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

export const passportSetup = (app) => {
    // Setup Passport local strategy using passport-local-mongoose
    passport.use(Admin.createStrategy());

    // Serialize and deserialize user information
    passport.serializeUser(Admin.serializeUser());
    passport.deserializeUser(Admin.deserializeUser());

    // Setup JWT strategy to handle JWT-based authentication
    passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {
        Admin.findById(jwt_payload.id, (err, admin) => {
            if (err) {
                return done(err, false);
            }
            if (admin) {
                return done(null, admin);
            } else {
                return done(null, false);
            }
        });
    }));

    // Initialize Passport and enable session support
    app.use(passport.initialize());
    app.use(passport.session());

    // Custom middleware to set local variables for authentication status and user roles
    app.use((req, res, next) => {
        res.locals.isAuthenticated = req.isAuthenticated();
        res.locals.currentUser = req.user;
        next();
    });
};
