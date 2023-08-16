import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import locations from "../data/Location.json"

interface SearchProps {
    onTypeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onSortBySelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onLocationSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onClearAll: () => void;
}

const Search: React.FC<SearchProps> = ({
    onTypeSelect,
    onSortBySelect,
    onLocationSelect,
    onClearAll,
}) => {
    const [searchPost, setSearchPost] = useState("");

    const handleClearPost = () => {
        setSearchPost("");
    };

    return (
        <div className="grid gap-10 bg-[#f1f4f8] rounded-[10px] p-[3rem]">
            <form action="">
                <div className="flex justify-between items-center rounded-[8px] gap-[10px] bg-white p-5 shadow-lg shadow-[#f1f4f8]-700">
                    <div className="flex items-center gap-2 flex-grow">
                        <AiOutlineSearch className="text-[25px] icon" />
                        <input
                            type="text"
                            className="bg-transparent text-blue-500 focus:outline-none flex-grow"
                            placeholder="Search Post Here..."
                            value={searchPost}
                            onChange={(e) => setSearchPost(e.target.value)}
                        />
                        <AiOutlineCloseCircle
                            className="text-[20px] text-[#a5a6a6] hover:text-[#000] icon mr-2"
                            onClick={handleClearPost}
                        />
                    </div>
                    <button className="bg-blue-500 h-full p-3 px-6 rounded-[10px] text-white cursor-pointer hover:bg-blue-300">
                        Search
                    </button>
                </div>
            </form>

            {/* <PostList
                selectedType={selectedType}
                selectedSortBy={selectedSortBy}
            /> */}

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
                        id="typeDropdown"
                        onChange={onTypeSelect}
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
                        id="sortByDropdown"
                        onChange={onSortBySelect}
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
                        id="locationDropdown"
                        onChange={onLocationSelect}
                        className="bg-white rounded-[3px] px-4 py-1"
                    >
                        <option value=""></option>
                        {locations.map((location) => (
                            <option key={location.value} value={location.value}>
                                {location.label}
                            </option>
                        ))}
                    </select>
                </div>

                <span
                    className="text-[#a1a1a1] cursor-pointer hover:text-blue-400"
                    onClick={onClearAll}
                >
                    Clear All
                </span>
            </div>
        </div>
    );
};

export default Search;
