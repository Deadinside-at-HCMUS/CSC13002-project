import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Search from "../components/Search/Search";
import PostList from "../components/PostList/PostList";
import Footer from "../components/Footer/Footer";
import Value from "../components/Value/Value";
import ChatBot from "../components/ChatBox/ChatBox";

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleAboutClick = () => {
        navigate("/about");
    };

    const handleGiveClick = () => {
        navigate("/give")
    };

    const handleReceiveClick = () => {
        navigate("/receive");
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
                onGiveClick={handleGiveClick}
                onReceiveClick={handleReceiveClick}
                onLoginClick={handleLoginClick}
                onProfileClick={handelProfileClick}
            />
            <Search />
            <PostList />
            <ChatBot />
            <Value />
            <Footer />
        </div >
    );
};

export default HomePage;
