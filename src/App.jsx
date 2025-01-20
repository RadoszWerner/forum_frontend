import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Pages/LoginPage";
import HomePage from "./components/Pages/HomePage";
import PrivateRoute from "./components/Routes/PrivateRoute";
import Layout from "./components/Layout/Layout";
import RegistrationPage from "./components/Pages/RegistrationPage";
import UserPostPage from "./components/Pages/UserPostPage";
import PostDetails from "./components/Posts/PostDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Strony bez navbar i autentykacji */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />

        {/* Strony z navbar i autentykacja */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Layout>
                <HomePage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/user-posts"
          element={
            <PrivateRoute>
              <Layout>
                <UserPostPage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <PrivateRoute>
              <Layout>
                <PostDetails />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
