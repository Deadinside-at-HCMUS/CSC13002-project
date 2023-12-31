import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Search from "../components/Search/Search";
import Postlist from "../components/Postlist/PostList";
import Footer from "../components/Footer/Footer";
import Value from "../components/Value/Value";
import ChatBot from "../components/Chatbox/ChatBox";
import { AuthContext } from "../contexts/authContext";
import { PostContext } from "../contexts/postContext";

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

    const { postState, getAllPosts } = useContext(PostContext);

    const [selectedType, setSelectedType] = useState<string>("");
    const [selectedSortBy, setSelectedSortBy] = useState<string>("");
    const [selectedLocation, setSelectedLocation] = useState<string>("");

    const handleClearAll = () => {
        setSelectedType("");
        setSelectedSortBy("");
        setSelectedLocation("");

        // Reset the dropdown boxes to their default empty choice
        const typeDropdown = document.getElementById("typeDropdown") as HTMLSelectElement;
        const sortByDropdown = document.getElementById("sortByDropdown") as HTMLSelectElement;
        const locationDropdown = document.getElementById("locationDropdown") as HTMLSelectElement;

        if (typeDropdown) {
            typeDropdown.selectedIndex = 0;
        }

        if (sortByDropdown) {
            sortByDropdown.selectedIndex = 0;
        }

        if (locationDropdown) {
            locationDropdown.selectedIndex = 0;
        }
    };

    const handleTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setSelectedType(selectedValue);
        console.log("Selected Type:", selectedValue);
    };

    const handleSortBySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setSelectedSortBy(selectedValue);
        console.log("Selected Sort By:", selectedValue);
    };

    const handleLocationSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setSelectedLocation(selectedValue);
        console.log("Selected Location:", selectedValue);
    };

    useEffect(() => {
        const fetchData = async () => {
            await getAllPosts();
        };

        fetchData();
    }, []);

    // console.log(selectedType);

    const [searchText, setSearchText] = useState<string>("");

    const handleSearch = (text: string) => {
        setSearchText(text);
    };

    const handleClearSearch = () => {
        setSearchText("");
    };

    const postData = postState.posts;

    let filteredPosts = selectedType
        ? postData.filter((postDatum) => postDatum.type === selectedType)
        : postData;

    // Apply search filter
    if (searchText) {
        const searchQuery = searchText.toLowerCase();
        filteredPosts = filteredPosts.filter(
            (postDatum) =>
                postDatum.title.toLowerCase().includes(searchQuery) ||
                postDatum.body.toLowerCase().includes(searchQuery)
        );
    }

    if (selectedSortBy === "time") {
        filteredPosts.sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );
    } else if (selectedSortBy === "verified") {
        filteredPosts = filteredPosts.filter(
            (postDatum) => postDatum.status === "Verified"
        );
    }

    filteredPosts = selectedLocation
        ? filteredPosts.filter(
            (postDatum) => postDatum.location === selectedLocation
        )
        : filteredPosts;

    // console.log(filteredPosts);

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
            <Search
                onSearch={handleSearch}
                onClearSearch={handleClearSearch}
                onTypeSelect={handleTypeSelect}
                onSortBySelect={handleSortBySelect}
                onLocationSelect={handleLocationSelect}
                onClearAll={handleClearAll}
            />
            <Postlist filteredPosts={filteredPosts} />
            <ChatBot />
            <Value />
            <Footer />
        </div>
    );
};

export default HomePage;