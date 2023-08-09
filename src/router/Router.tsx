// src/router/Router.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ProfilePage from "../pages/ProfilePage";
import AboutPage from "../pages/AboutPage";
import DonatePage from "../pages/DonatePage";
import ReceivePage from "../pages/ReceivePage";
import Information from "../components/Information/Information";
import Dashboard from "../components/Dashboard/Dashboard";
import Message from "../components/Message/Message";
import Notification from "../components/Notification/Notification";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/profile" element={<ProfilePage />}>
                    <Route index element={<Information />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="message" element={<Message />} />
                    <Route path="notification" element={<Notification />} />
                </Route>
                <Route path="/about" element={<AboutPage />}></Route>
                <Route path="/donate" element={<DonatePage />}></Route>
                <Route path="/receive" element={<ReceivePage />}></Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
