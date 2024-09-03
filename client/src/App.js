import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/shared/HeaderContents/Header";
import Footer from "./components/shared/FooterContents/Footer";
import EducationPage from "../admin/pages/singleHobbyTemplate/EducationPage";
import { UserProvider } from "./context/UserContext.js";
import AdminRoute from './context/AdminRoute.jsx';
import SpecialAdminRoute from "./context/SpecialAdminRoute.jsx";
import NewBlogPost from "../admin/components/NewBlogPost.jsx";
import EditBlogPost from "../admin/components/Blog/EditBlogPost.jsx";
import AdminRequests from '../admin/pages/AdminRequests.jsx';

const AdminStatusPage = lazy(() => import('../admin/components/Status/AdminStatus'));
const AdminEducationPage = lazy(() => import('../admin/pages/singleHobbyTemplate/EducationPage'));
const AdminAboutPage = lazy(() => import('../admin/pages/AdminAboutPage'));
const ProjectsTestPage = lazy(() => import('./pages/ProjectsTest'))
const SkillsTestPage = lazy(() => import('./pages/SkillsTest'));
const Homepage = lazy(() => import("./pages/Home"));
const Skillspage = lazy(() => import("./pages/Skills"));
const Aboutpage = lazy(() => import("./pages/About"));
const Blogpage = lazy(() => import("./pages/Blog"));
const Contactpage = lazy(() => import("./pages/Contact"));
const Projectspage = lazy(() => import("./pages/Projects"));
const Resumepage = lazy(() => import("./pages/Resume"));
const BlogPostpage = lazy(() => import("./pages/BlogPost"));
const Accountpage = lazy(() => import("./pages/Account"));
const HobbyPage = lazy(() => import("../admin/pages/singleHobbyTemplate/HobbyPage"));
const AdminCategorySubmit = lazy(() => import('../admin/pages/SubmitCategories'));
const AdminSkillSubmit = lazy(() => import('../admin/pages/SubmitSkills'));
const AdminSingleSkillPage = lazy(() => import('../admin/pages/singleSkillTemplate/Skill'));
const AdminProjectSubmit = lazy(() => import('../admin/pages/SubmitProject'));
const AdminSingleProjectPage = lazy(() => import('../admin/pages/singleProjectTemplate/Project'));
const AdminsPanel = lazy(() => import('../admin/pages/AdminPanel'));
const Registration = lazy(() => import('./components/ProfileAuth/Register'));
const SignIn = lazy(() => import('./components/ProfileAuth/SignIn'));
const AdminsRequests = lazy(() => import('../admin/pages/AdminRequests'));
const SingleExperiencePage = lazy(() => import('../admin/pages/singleHobbyTemplate/ExperiencePage'));


const App = () => {

  const isAdmin = true;

  return (
    <div className="flex flex-col h-screen">
      <BrowserRouter>
        <UserProvider>
          <Header />
          <main className="flex-grow">
            <Suspense fallback={""}>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/skills" element={<SkillsTestPage />} />
                <Route path="/about" element={<Aboutpage />} />
                <Route path="/blog/new" element={
                  <AdminRoute>
                    <NewBlogPost />
                  </AdminRoute>
                } />
                <Route path="/blog" element={<Blogpage />} />
                <Route path="/blog/post/:id" element={<BlogPostpage />} />
                <Route path="/admin/edit-blog/:id" element={
                  <AdminRoute>
                    <EditBlogPost />
                  </AdminRoute>
                } />
                <Route path="/admin/about" element={
                  <AdminRoute>
                    <AdminAboutPage />
                  </AdminRoute>
                } />
                <Route path="/admin/status" element={
                  <AdminRoute>
                    <AdminStatusPage />
                  </AdminRoute>
                } />
                <Route path="/edit/education/:id" element={
                  <AdminRoute>
                    <EducationPage />
                  </AdminRoute>
                } />
                <Route path="/edit/experience/:id" element={
                  <AdminRoute>
                    <SingleExperiencePage />
                  </AdminRoute>
                } />
                <Route path="/edit/hobbies/:id" element={
                  <AdminRoute>
                    <HobbyPage />
                  </AdminRoute>
                } />
                <Route path="/contact" element={<Contactpage />} />
                <Route path="/projects" element={<ProjectsTestPage />} />
                <Route path="/resume" element={<Resumepage />} />
                <Route path="/account" element={<Accountpage isAdmin={isAdmin} />} isAdmin={isAdmin} />
                <Route path="/admin/categories" element={
                  <AdminRoute>
                    <AdminCategorySubmit />
                  </AdminRoute>
                } />
                <Route path="/admin/skills" element={
                  <AdminRoute>
                    <AdminSkillSubmit />
                  </AdminRoute>
                } />
                <Route path="/admin/skill/:id" element={
                  <AdminRoute>
                    <AdminSingleSkillPage />
                  </AdminRoute>
                } />
                <Route path="/admin/projects" element={
                  <AdminRoute>
                    <AdminProjectSubmit />
                  </AdminRoute>
                } />
                <Route path="/admin/project/:id" element={
                  <AdminRoute>
                    <AdminSingleProjectPage />
                  </AdminRoute>
                } />
                <Route path='/admin' element={
                  <AdminRoute>
                    <AdminsPanel />
                  </AdminRoute>
                } />
                <Route path="/admin/requests" element={
                  <SpecialAdminRoute>
                    <AdminRequests />
                  </SpecialAdminRoute>
                } />

                <Route path='/skilltest' element={<SkillsTestPage />} />
                <Route path="/projectstest" element={<ProjectsTestPage />} />
                <Route path='/registeruser' element={<Registration />} />
                <Route path='/signin' element={<SignIn />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
