import React from 'react';
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar';
import Search from '../components/Search/Search';
import PostList from '../components/PostList/PostList';
import Footer from '../components/Footer/Footer';
import Value from "../components/Value/Value"

const HomePage: React.FC = () => {
    let navigate = useNavigate();

    const handleAboutClick = () => {
        navigate('/about')
    }

    const handleGiveClick = () => {
        console.log('Give clicked');
    };

    const handleReceiveClick = () => {
        // Handle the click event for Receive button
        console.log('Receive clicked');
    };

    const handleLoginClick = () => {
        // Handle the click event for Login button
        navigate('/login');
    };

    const handelProfileClick = () => {
        navigate('/profile');
    };

    return (
        <div>
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
            <Value />
            <Footer />
        </div>
    )
};

export default HomePage;
