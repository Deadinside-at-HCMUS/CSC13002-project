import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Search from "../components/Search/Search";
import Postlist from "../components/Postlist/PostList";
import Footer from "../components/Footer/Footer";
import Value from "../components/Value/Value";
import ChatBot from "../components/Chatbox/ChatBox";
import { AuthContext } from "../contexts/authContext";

const HomePage: React.FC = () => {
    const {
        authState: { isAuthenticated },
    } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleAboutClick = () => {
        navigate("/about");
    };

    const handleDonateClick = () => {
        isAuthenticated ? navigate("/donate") : navigate("/login");
    };

    const handleReceiveClick = () => {
        isAuthenticated ? navigate("/receive") : navigate("/login");
    };

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handelProfileClick = () => {
        navigate("/profile");
    };

    return (
        <div className="w-[85%] m-auto bg-white">
            <Navbar
                logoUrl="https://file.rendit.io/n/BMguV6XTfgasPlBI7Wr2.svg"
                name="Connect Me"
                onAboutClick={handleAboutClick}
                onDonateClick={handleDonateClick}
                onReceiveClick={handleReceiveClick}
                onLoginClick={handleLoginClick}
                onProfileClick={handelProfileClick}
            />
            <Search />
            <Postlist
                selectedType="selectedType"
                selectedSortBy="selectedSortBy"
            />
            <ChatBot />
            <Value />
            <Footer />
        </div>
    );
};

export default HomePage;
