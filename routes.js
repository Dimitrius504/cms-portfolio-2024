import express from "express";
import skillsRouter from './server/routes/skills.js'
import categoriesRouter from './server/routes/categories.js'
import projectsRouter from './server/routes/projects.js'
import authRouter from './server/routes/auth.js'
import contactrouter from './server/routes/contact.js'
import blogRouter from './server/routes/blog.js'
import aboutRouter from './server/routes/about.js'
import testimonialRouter from './server/routes/testimonials.js'
import statusRouter from './server/routes/status.js'

const router = express.Router();

router.use('/', authRouter)
router.use('/blog', blogRouter)
router.use('/about', aboutRouter)
router.use('/skills', skillsRouter)
router.use('/categories', categoriesRouter)
router.use('/projects', projectsRouter)
router.use('/send-email', contactrouter)
router.use('/testimonials', testimonialRouter)
router.use('/status', statusRouter);


export default router;
