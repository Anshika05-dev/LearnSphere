import express from "express";
import { getAllCourses, getCourseId } from "../controller/courseController.js";
const courseRouter=express.Router()

courseRouter.get('/all',getAllCourses)
courseRouter.get('/:id',getCourseId)



export default courseRouter;