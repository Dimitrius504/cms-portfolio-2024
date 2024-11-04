import express from "express";
import s3Provider from "../providers/s3.js";
import { getLatestResume } from "../providers/s3.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const url = await getLatestResume();
        if (url) {
            res.send({ url });
        } else {
            res.status(404).json({ message: "No resume found" });
        }
    } catch (error) {
        console.error('Failed to fetch latest resume:', error);
        res.status(500).json({ message: "Failed to fetch latest resume", error: error.message });
    }
});
export default router;
