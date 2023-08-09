// src/router/Router.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import ProfilePage from '../pages/ProfilePage';
import DonatePage from '../pages/DonatePage';
import AboutPage from '../pages/AboutPage';
import GivePage from '../pages/GivePage';
import ReceivePage from '../pages/ReceivePage';
import InformationPage from '../pages/InformationPage'
import DashboardPage from '../pages/DashboardPage'
import MessagePage from '../pages/MessagePage';
import NotificationPage from '../pages/Notification';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/profile" element={<ProfilePage />}>
                    <Route index element={<InformationPage />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="message" element={<MessagePage />} />
                    <Route path="notification" element={<NotificationPage />} />
                </Route>
                <Route path="/donate" element={<DonatePage />}></Route>
                <Route path="/about" element={<AboutPage />}></Route>
                <Route path="/give" element={<GivePage />}></Route>
                <Route path="/receive" element={<ReceivePage />}></Route>
            </Routes>
        </Router >
    );
};

export default AppRouter;
