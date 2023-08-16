import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header/Header";
import { PostForm } from "../contexts/postContext";
import { CategoryEnum } from "../reducers/postReducer";
import { SiAddthis } from "react-icons/si";
import { RiDeleteBinLine } from "react-icons/ri";
import { PostContext } from "../contexts/postContext";
import { Item } from "../reducers/postReducer";

const initialPostState: PostForm = {
    _id: "",
    type: "Receiving",
    title: "",
    body: "",
    items: [],
    status: "Posted",
    location: "",
    match: [],
    isArchived: false,
    photoId: "",
    photoUrl: "",
    createdAt: new Date(),
};

const ReceivePage: React.FC = () => {
    const { addPost, uploadImage } = useContext(PostContext);

    const [formData, setFormData] = useState<PostForm>(initialPostState);

    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/home");
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleBodyChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLocationChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { value } = event.target;
        console.log(value);
        setFormData({
            ...formData,
            location: value as any,
        });
        console.log(formData);
    };

    const handleImageChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            try {
                const imgData = await uploadImage(file);

                const { photoId, photoUrl } = imgData;

                setFormData((prevItem) => ({
                    ...prevItem,
                    photoId: photoId,
                    photoUrl: photoUrl,
                }));
            } catch (error) {
                console.log("Error:", error);
            }
        }
    };

    const [addedItemData, setAddedItemData] = useState<Item[]>(formData.items);

    const [newItem, setNewItem] = useState<Item>({
        idx: "",
        name: "",
        quantity: "",
        category: CategoryEnum.Unknown,
    });

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setNewItem((prevItem) => ({ ...prevItem, name: value }));
    };

    const handleQuantityChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value } = event.target;
        setNewItem((prevItem) => ({ ...prevItem, quantity: value }));
    };

    const handleCategoryChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { value } = event.target;
        setNewItem((prevItem) => ({
            ...prevItem,
            category: value as any,
        }));
    };

    const handleAddItem = () => {
        const newItemData: Item = {
            idx: (addedItemData.length + 1).toString(),
            name: newItem.name,
            quantity: newItem.quantity,
            category: newItem.category,
        };

        setAddedItemData((prevData) => [...prevData, newItemData]);

        setNewItem({
            idx: "",
            name: "",
            quantity: "",
            category: CategoryEnum.Unknown,
        });
    };

    const handleDeleteItem = (index: number) => {
        const updatedItems = [...addedItemData];
        updatedItems.splice(index, 1);
        setAddedItemData(updatedItems);
    };

    useEffect(() => {
        setFormData((prevItem) => ({
            ...prevItem,
            items: addedItemData,
        }));
    }, [addedItemData]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const addPostData = await addPost(formData);

            if (addPostData.success) {
                // if submit post successfully
                alert("Upload post successfully");
                navigate("/home");
            } else {
                // if field miss or error
                (() => {
                    alert("Invalid post content!");
                    setTimeout(() => {
                        const alertElement = document.querySelector(
                            ".alert"
                        ) as HTMLElement;
                        if (alertElement) {
                            alertElement.style.display = "none";
                        }
                    }, 5000);
                })();
                console.log(addPostData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-[85%] m-auto mb-3">
            <div className="overflow-hidden flex flex-col">
                <div className="flex flex-col">
                    <div className="flex p-2">
                        <img
                            src="https://file.rendit.io/n/BMguV6XTfgasPlBI7Wr2.svg"
                            className="w-10 h-10 m-2 "
                            alt="Logo"
                            onClick={handleLogoClick}
                        />
                        <p
                            className="p-3 pt-5 pr-6 font-bold text-xl text-center cursor-pointer"
                            onClick={handleLogoClick}
                        >
                            Receive Form
                        </p>
                        <div className="flex-1">
                            <Header />
                        </div>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="p-4"
                    encType="multipart/form-data"
                >
                    <div className="mb-4 gap-5 flex flex-row">
                        <div className="mb-2 w-1/2 flex flex-col ">
                            <label
                                htmlFor="title"
                                className="block font-bold mb-1"
                            >
                                Title:{" "}
                                <span className="text-red-500 font-normal">
                                    *
                                </span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400"
                            />
                        </div>
                        <div className="mb-4 w-1/2 flex flex-col">
                            <label
                                htmlFor="location"
                                className="block font-bold mb-1"
                            >
                                Location:
                            </label>
                            {/* <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400"
                            /> */}
                            <select
                                id="location"
                                name="location"
                                onChange={handleLocationChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400"
                            >
                                <option value="">--Select Location--</option>
                                <option value="An Giang">An Giang</option>
                                <option value="Ba ria Vung tau">
                                    Bà rịa Vũng tàu
                                </option>
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
                                <option value="Thua Thien Hue">
                                    Thừa Thiên Huế
                                </option>
                                <option value="Tien Giang">Tiền Giang</option>
                                <option value="Tp Ho Chi Minh">
                                    Tp Hồ Chí Minh
                                </option>
                                <option value="Tra Vinh">Other</option>
                                <option value="Tuyen Quang">Other</option>
                                <option value="Vinh Long">Other</option>
                                <option value="Vinh Phuc">Vĩnh Phúc</option>
                                <option value="Yen Bai">Yên Bái</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="body" className="block font-bold mb-1">
                            Description:{" "}
                            <span className="text-red-500 font-normal">*</span>
                        </label>
                        <textarea
                            id="body"
                            name="body"
                            value={formData.body}
                            onChange={handleBodyChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400"
                            rows={4}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-bold mb-1">
                            Items:{" "}
                            <span className="text-red-500 font-normal">*</span>
                        </label>
                        <div className="mb-4 ">
                            <div className="flex gap-4">
                                <div className="mb-2 flex-col w-2/5">
                                    <input
                                        type="text"
                                        placeholder="Item Name"
                                        onChange={handleNameChange}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Quantity"
                                        onChange={handleQuantityChange}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400 mt-2"
                                    />
                                    <select
                                        id="category"
                                        name="category"
                                        onChange={handleCategoryChange}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400 mt-2"
                                    >
                                        <option value="Unknown">
                                            --Select category--
                                        </option>
                                        {/* {Object.keys(CategoryEnum).map((key) => (
                                    <option
                                        key={key}
                                        value={
                                            CategoryEnum[
                                                key as keyof typeof CategoryEnum
                                            ]
                                        }
                                    >
                                        {
                                            CategoryEnum[
                                                key as keyof typeof CategoryEnum
                                            ]
                                        }
                                    </option>
                                ))} */}
                                        <option value="Electronic">
                                            Electronic
                                        </option>
                                        <option value="Clothing">
                                            Clothing
                                        </option>
                                        <option value="Book">Book</option>
                                        <option value="Food">Food</option>
                                        <option value="Vehicle">Vehicle</option>
                                        <option value="Household">
                                            Household
                                        </option>
                                    </select>

                                    <div
                                        className="mt-3 mb-3 float-right flex gap-2 items-center cursor-pointer text-blue-500 hover:text-blue-600 "
                                        onClick={handleAddItem}
                                    >
                                        Add Item
                                        <SiAddthis fontSize="25" />
                                    </div>

                                    <div className="mt-12">
                                        <label
                                            htmlFor="image"
                                            className="block font-bold mb-1 "
                                        >
                                            Image:
                                        </label>
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 mr-2">
                                    <table className="w-full table-auto border-collapse border border-gray-300 text-left ml-2 scroll-auto">
                                        <thead>
                                            <tr className="bg-[#F4F2FF] text-blue-500">
                                                <th className="px-4 py-2">
                                                    ID
                                                </th>
                                                <th className="px-4 py-2">
                                                    Name
                                                </th>
                                                <th className="px-4 py-2">
                                                    Quantity
                                                </th>
                                                <th className="px-4 py-2">
                                                    Category
                                                </th>
                                                <th className="px-4 py-2"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {addedItemData.map(
                                                (item, index) => (
                                                    <tr
                                                        key={item.idx}
                                                        className="border"
                                                    >
                                                        <td className="px-4 py-2 text-blue-500 font-semibold">
                                                            <Link
                                                                to={`/post/${item.idx}`}
                                                            >
                                                                #{item.idx}
                                                            </Link>
                                                        </td>
                                                        <td className="px-4 py-2 font-semibold">
                                                            <Link
                                                                to={`/profile`}
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        </td>
                                                        <td className="px-4 py-2 ">
                                                            <Link
                                                                to={`/profile`}
                                                            >
                                                                {item.quantity}
                                                            </Link>
                                                        </td>
                                                        <td className="px-4 py-2 ">
                                                            <Link
                                                                to={`/profile`}
                                                            >
                                                                {item.category}
                                                            </Link>
                                                        </td>
                                                        <td className="px-2 py-2 ">
                                                            <RiDeleteBinLine
                                                                onClick={() =>
                                                                    handleDeleteItem(
                                                                        index
                                                                    )
                                                                }
                                                                className="text-red-500 hover:text-red-600 cursor-pointer"
                                                            />
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`flex text-white px-4 py-2 rounded-md  float-right
                            ${
                                !formData.title || !formData.body || !newItem
                                    ? "bg-gray-500 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        >
                            Submit Form
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReceivePage;
