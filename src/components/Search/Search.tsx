import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { BsHouseDoor } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import PostList from "../Postlist/PostList";

const Search: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string>("");
    const [selectedSortBy, setSelectedSortBy] = useState<string>("");
    const [selectedLocation, setSelectedLocation] = useState<string>("");

    const handleClearAll = () => {
        setSelectedType("");
        setSelectedSortBy("");
        setSelectedLocation("");
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

    return (
        <div className="grid gap-10 bg-[#f1f4f8] rounded-[10px] p-[3rem]">
            <form action="">
                <div className="flex justify-between items-center rounded-[8px] gap-[10px] bg-white p-5 shadow-lg shadow-[#f1f4f8]-700">
                    <div className="flex gap-2 items-center">
                        <AiOutlineSearch className="text-[25px] icon" />
                        <input
                            type="text"
                            className="bg-transparent text-blue-500 focus:outline-none w-[100%]"
                            placeholder="Search Post Here..."
                        />
                        <AiOutlineCloseCircle className="text-[25px] text-[#a5a6a6] hover:text-[#000] icon" />
                    </div>
                    <div className="flex gap-2 items-center">
                        <BsHouseDoor className="text-[25px] icon" />
                        <input
                            type="text"
                            className="bg-transparent text-blue-500 focus:outline-none w-[100%]"
                            placeholder="Search Donator Here..."
                        />
                        <AiOutlineCloseCircle className="text-[25px] text-[#a5a6a6] hover:text-[#000] icon" />
                    </div>
                    <div className="flex gap-2 items-center">
                        <CiLocationOn className="text-[25px] icon" />
                        <input
                            type="text"
                            className="bg-transparent text-blue-500 focus:outline-none w-[100%]"
                            placeholder="Search Location Here..."
                        />
                        <AiOutlineCloseCircle className="text-[25px] text-[#a5a6a6] hover:text-[#000] icon" />
                    </div>
                    <button className="bg-blue-500 h-full p-3 px-6 rounded-[10px] text-white cursor-pointer hover:bg-blue-300">
                        Search
                    </button>
                </div>
            </form>

            <PostList
                selectedType={selectedType}
                selectedSortBy={selectedSortBy}
            />

            <div className="flex items-center gap-10 justify-center">
                <div className="flex items-center gap-2">
                    <label
                        htmlFor="type"
                        className="text-[#808080] font-semibold"
                    >
                        Type:
                    </label>
                    <select
                        name="type"
                        id="type"
                        value={selectedType}
                        onChange={handleTypeSelect}
                        className="bg-white rounded-[3px] px-4 py-1"
                    >
                        <option value=""></option>
                        <option value="Donating">Donation</option>
                        <option value="Receiving">Receive</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <label
                        htmlFor="relevance"
                        className="text-[#808080] font-semibold"
                    >
                        Sort by:
                    </label>
                    <select
                        name=""
                        id="relevance"
                        value={selectedSortBy}
                        onChange={handleSortBySelect}
                        className="bg-white rounded-[3px] px-4 py-1"
                    >
                        <option value=""></option>
                        <option value="time">Newest</option>
                        {/* <option value="priority">Priority</option> */}
                        <option value="verified">Verified</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <label
                        htmlFor="location"
                        className="text-[#808080] font-semibold"
                    >
                        Location:
                    </label>
                    <select
                        name=""
                        id="location"
                        value={selectedLocation}
                        onChange={handleLocationSelect}
                        className="bg-white rounded-[3px] px-4 py-1"
                    >
                        <option value=""></option>
                        <option value="hcm">Ho Chi Minh</option>
                        <option value="hn">Ha Noi</option>
                        <option value="dn">Da Nang</option>
                    </select>
                </div>

                <span
                    className="text-[#a1a1a1] cursor-pointer"
                    onClick={handleClearAll}
                >
                    Clear All
                </span>
            </div>
        </div>
    );
};

export default Search;
