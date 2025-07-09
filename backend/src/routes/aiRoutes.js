import express from "express";
import generateGeminiResponse from "../controller/aiCourseController.js";

const router = express.Router();

router.post("/generate", generateGeminiResponse);

export default router;
