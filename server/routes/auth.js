import { login, logout, requestToken, authenticate, isAuthenticated, registerAdmin } from "../controllers/authController.js";
import express from 'express';
import { Router } from "express";
import Admin from "../models/AdminSchema.js";
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const upload = multer({ dest: 'uploads/' });


const router = express.Router();

// GET /login
router.get('/login', login);

// POST /authenticate
router.post('/authenticate', authenticate);

// POST /logout
router.post('/logout', isAuthenticated, logout);

// GET /register
router.get('/register', (req, res) => res.render('register'));

// POST /register
router.post('/register', upload.single('image'), registerAdmin);

// POST /request-token
router.post('/request-token', requestToken);

// POST /update-user
router.post('/update-user', async (req, res) => {
    const { userId, companyInfo } = req.body;
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(userId, {
            $set: {
                'companyInfo.companyName': companyInfo.companyName,
                'companyInfo.companyAddress': companyInfo.companyAddress
            }
        }, { new: true });

        res.json(updatedAdmin);
    } catch (error) {
        console.error("Failed to update admin:", error);
        res.status(500).send("Failed to update admin.");
    }
});

// POST /request-admin
router.post('/request-admin', async (req, res) => {
    const { userId } = req.body;
    try {
        await Admin.findByIdAndUpdate(userId, { adminRequested: "AWAITING" });
        res.status(200).json({ message: "Admin request is now pending." });
    } catch (error) {
        console.error('Error updating admin request status:', error);
        res.status(500).send('Failed to update admin request status.');
    }
});

// Post to update admin status
router.post('/update-admin-status', async (req, res) => {
    const { adminId, status } = req.body;

    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, {
            $set: { adminRequested: status }
        }, { new: true, runValidators: true });

        if (!updatedAdmin) {
            return res.status(404).send('Admin not found');
        }

        res.status(200).json({
            message: `Admin status updated to ${status}.`,
            updatedAdmin
        });
    } catch (error) {
        console.error('Error updating admin status:', error);
        res.status(500).send('Failed to update admin status.');
    }
});



// This route should fetch only admin accounts where adminRequested status is "AWAITING"
router.get('/admin-requests', async (req, res) => {
    try {
        const requests = await Admin.find({ adminRequested: "AWAITING" });
        res.json({ requests });
    } catch (error) {
        console.error('Error fetching admin requests:', error);
        res.status(500).send('Failed to fetch admin requests.');
    }
});

// Route to view admin requests
router.get('/admin/requests', async (req, res) => {
    const user = req.user;
    const authorizedEmail = process.env.SPECIAL_ADMIN_EMAIL;

    if (user && user?.user?.email === authorizedEmail) {
        try {
            res.status(200).json({ message: 'Access granted to admin requests' });
        } catch (error) {
            console.error('An error occurred:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(403).send('Unauthorized');
    }
});



export default router;