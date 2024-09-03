import passport from "passport";
import jwt from "jsonwebtoken";
import Admin from "../models/AdminSchema.js";
import dotenv from "dotenv";

dotenv.config();


// Request a token for the admin
export const requestToken = async (req, res) => {
    passport.authenticate('jwt', { session: false }, (error, admin, info) => {
        if (error) return res.status(500).json({ status: 500, message: "Internal Server Error" });
        if (!admin) return res.status(401).json({ status: 401, message: "Unauthorized" });

        // Generate JWT for the admin
        const payload = { id: admin._id, email: admin.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Token granted', token });
    })(req, res);
};

// Login admin
export const login = (_, res) => {
    res.render("login");
};

// Authenticate admin
export const authenticate = async (req, res, next) => {
    passport.authenticate("local", async (error, admin, info) => {
        if (error) {
            req.session.notifications = [{ alertType: "alert-danger", message: "Login error" }];
            return next(error);
        }
        if (!admin) {
            req.session.notifications = [{ alertType: "alert-danger", message: "Invalid email or password" }];
            return res.redirect("/login");
        }

        req.logIn(admin, async (err) => {
            if (err) {
                req.session.notifications = [{ alertType: "alert-danger", message: "Login session error" }];
                return next(err);
            }

            const fullAdmin = await Admin.findById(admin._id);
            const payload = { id: fullAdmin._id, email: fullAdmin.email };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            req.session.notifications = [{ alertType: "alert-success", message: "Successfully logged in" }];
            res.status(200).json({
                status: 200, 
                message: "SUCCESS",
                user: {
                    id: fullAdmin._id,
                    firstName: fullAdmin.firstName,
                    lastName: fullAdmin.lastName,
                    nickname: fullAdmin.nickname,
                    email: fullAdmin.email,
                    adminRequested: fullAdmin.adminRequested,
                    companyInfo: fullAdmin.companyInfo,
                    contactInfo: fullAdmin.contactInfo
                },
                token
            });
        });
    })(req, res, next);
};


// Logout user, destroy session, and clear cookies
export const logout = (req, res, next) => {
    req.logout((error) => {
        if (error) {
            console.error(error);
            return next(error);
        }
        req.session.destroy((error) => {
            if (error) {
                console.error(error);
                return next(error);
            }
            res.clearCookie("connect.sid", { path: "/" });
            res.format({
                "text/html": () => res.redirect("/login"),
                "application/json": () => res.status(200).json({ status: 200, message: "SUCCESS" }),
                default: () => res.status(406).send("NOT ACCEPTABLE"),
            });
        });
    });
};

// Check if the user is authenticated, and redirect to login if not
export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.clearCookie("connect.sid", { path: "/" });
    res.format({
        "text/html": () => res.redirect("/login"),
        "application/json": () => res.status(401).json({ status: 401, message: "NOT AUTHORIZED" }),
        default: () => res.status(406).send("NOT ACCEPTABLE"),
    });
};


// Check if the user has a specific role
export const isRole = (role) => {
    return (req, res, next) => {
        if (!req.isAuthenticated) {
            req.status = 401;
            return next(new Error("NOT AUTHORIZED"));
        }

        if (role !== req.user.role) {
            req.status = 403;
            return next(new Error("FORBIDDEN"));
        }

        next();
    };
};

// Register a new admin
export const registerAdmin = async (req, res) => {
    console.log("Received registration data:", req.body);

    const { email, password, firstName, lastName, nickname, image, companyName, companyAddress, phoneNumber } = req.body;
    if (req.method === 'POST') {
        try {
            const existingAdmin = await Admin.findOne({ email });
            if (existingAdmin) {
                return res.status(400).json({ status: 400, message: "Admin already exists" });
            }

            const newAdmin = new Admin({
                email,
                firstName,
                lastName,
                nickname,
                image,
                companyInfo: { companyName, companyAddress },
                contactInfo: { phoneNumber }
            });

            Admin.register(newAdmin, password, (err, account) => {
                if (err) {
                    console.error("Error during registration:", err);
                    return res.status(500).json({ status: 500, message: "Internal Server Error" });
                }
                res.status(201).json({
                    status: 201,
                    message: "Admin created successfully",
                    adminId: account._id
                });
            });
        } catch (error) {
            console.error("Error during registration:", error);
            res.status(500).json({ status: 500, message: "Internal Server Error" });
        }
    } else {
        res.render('register');
    }
};

// Ensure that the user is an admin
export const ensureAdmin = async (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized - You must be logged in to perform this action." });
    }

    if (req.user && req.user.adminRequested === "CONFIRMED") {
        return next();
    }

    return res.status(403).json({ message: "Forbidden - Only confirmed admins can access this resource." });
};
