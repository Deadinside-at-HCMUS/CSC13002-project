import React from "react";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { BsHouseDoor } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

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
                        id="type"
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
                        id="relevance"
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
                        id="location"
                        onChange={onLocationSelect}
                        className="bg-white rounded-[3px] px-4 py-1"
                    >
                        <option value=""></option>
                        <option value="An Giang">An Giang</option>
                        <option value="Ba ria Vung tau">Bà rịa Vũng tàu</option>
                        <option value="Bac Giang">Bắc Giang</option>
                        <option value="Bac Kan">Bắc Kạn</option>
                        <option value="Bac Lieu">Bạc Liêu</option>
                        <option value="Bac Ninh">Bắc Ninh</option>
                        <option value="Ben Tre">Bến Tre</option>
                        <option value="Binh Dinh">Bình Định</option>
                        <option value="Binh Duong">Bình Dương</option>
                        <option value="Binh Phuoc">Bình Phước</option>
                        <option value="Binh Thuan">Bình Thuận</option>
                        <option value="Ca Mau">Cà Mau</option>
                        <option value="Can Tho">Cần Thơ</option>
                        <option value="Cao Bang">Cao Bằng</option>
                        <option value="Da Nang">Đà Nẵng</option>
                        <option value="Dak Lak">Đắk Lắk</option>
                        <option value="Dak Nong">Đắk Nông</option>
                        <option value="Dien Bien">Điện Biên</option>
                        <option value="Dong Nai">Đồng Nai</option>
                        <option value="Dong Thap">Đồng Tháp</option>
                        <option value="Gia Lai">Gia Lai</option>
                        <option value="Ha Giang">Hà Giang</option>
                        <option value="Ha Nam">Hà Nam</option>
                        <option value="Ha Noi">Hà Nội</option>
                        <option value="Ha Tinh">Hà Tĩnh</option>
                        <option value="Hai Duong">Hải Dương</option>
                        <option value="Hai Phong">Hải Phòng</option>
                        <option value="Hau Giang">Hậu Giang</option>
                        <option value="Hoa Binh">Hòa Bình</option>
                        <option value="Hung Yen">Hưng Yên</option>
                        <option value="Khanh Hoa">Khánh Hòa</option>
                        <option value="Kien Giang">Kiên Giang</option>
                        <option value="Kon Tum">Kon Tum</option>
                        <option value="Lai Chau">Lai Châu</option>
                        <option value="Lam Dong">Lâm Đồng</option>
                        <option value="Lang Son">Lạng Sơn</option>
                        <option value="Lao Cai">Lào Cai</option>
                        <option value="Long An">Long An</option>
                        <option value="Nam Dinh">Nam Định</option>
                        <option value="Nghe An">Nghệ An</option>
                        <option value="Ninh Binh">Ninh Bình</option>
                        <option value="Ninh Thuan">Ninh Thuận</option>
                        <option value="Phu Tho">Phú Thọ</option>
                        <option value="Phu Yen">Phú Yên</option>
                        <option value="Quang Binh">Quảng Bình</option>
                        <option value="Quang Nam">Quảng Nam</option>
                        <option value="Quang Ngai">Quảng Ngãi</option>
                        <option value="Quang Ninh">Quảng Ninh</option>
                        <option value="Quang Tri">Quảng Trị</option>
                        <option value="Soc Trang">Sóc Trăng</option>
                        <option value="Son La">Sơn La</option>
                        <option value="Tay Ninh">Tây Ninh</option>
                        <option value="Thai Binh">Thái Bình</option>
                        <option value="Thai Nguyen">Thái Nguyên</option>
                        <option value="Thanh Hoa">Thanh Hóa</option>
                        <option value="Thua Thien Hue">Thừa Thiên Huế</option>
                        <option value="Tien Giang">Tiền Giang</option>
                        <option value="Tp Ho Chi Minh">Tp Hồ Chí Minh</option>
                        <option value="Tra Vinh">Other</option>
                        <option value="Tuyen Quang">Other</option>
                        <option value="Vinh Long">Other</option>
                        <option value="Vinh Phuc">Vĩnh Phúc</option>
                        <option value="Yen Bai">Yên Bái</option>
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
