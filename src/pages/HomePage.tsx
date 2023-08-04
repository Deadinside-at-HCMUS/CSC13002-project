import React from 'react';
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar';
import Search from '../components/Search/Search';
import Post from '../components/Post/Post';
import Footer from '../components/Footer/Footer';

const HomePage: React.FC = () => {
    let navigate = useNavigate();

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
                hotlineNumber="123-456-7890"
                onGiveClick={handleGiveClick}
                onReceiveClick={handleReceiveClick}
                onLoginClick={handleLoginClick}
                onProfileClick={handelProfileClick}
            />
            <Search />
            <Post />
            <Footer />
        </div>
    )
};

export default HomePage;
