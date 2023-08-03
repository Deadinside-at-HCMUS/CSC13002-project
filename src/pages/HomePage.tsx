import React from 'react';
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar';

const HomePage: React.FC = () => {
    let navigate = useNavigate();

    const handleSearchClick = () => {
        // Handle the click event for Give button
        console.log('Search Click')
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

    return (
        <div>
            <Navbar
                logoUrl="https://file.rendit.io/n/BMguV6XTfgasPlBI7Wr2.svg"
                name="Connect Me"
                searchPlaceholder="e.g. Ho Chi Minh"
                hotlineNumber="123-456-7890"
                onSearchClick={handleSearchClick}
                onGiveClick={handleGiveClick}
                onReceiveClick={handleReceiveClick}
                onLoginClick={handleLoginClick}
            />
            {/* Your other components and content */}
        </div>
    )
};

export default HomePage;
