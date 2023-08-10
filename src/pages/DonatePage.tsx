import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header/Header";
import { CategoryEnum, PostForm } from "../contexts/postContext";
import { PostTypeEnum, StatusEnum } from "../contexts/postContext";
import { SiAddthis } from "react-icons/si"
import { RiDeleteBinLine } from "react-icons/ri"

const initialPostState: PostForm = {
    type: PostTypeEnum.Donate,
    title: "",
    body: "",
    items: [],
    status: StatusEnum.Published,
    location: "",
    match: [],
};

interface AddedItem {
    item_id: string;
    name: string;
    quantity: string;
    category: CategoryEnum;
}

const categoryEnumToString = {
    [CategoryEnum.Unknown]: "--Select category--",
    [CategoryEnum.Electronic]: "Electronic",
    [CategoryEnum.Clothing]: "Clothing",
    [CategoryEnum.Book]: "Book",
    [CategoryEnum.Food]: "Food",
    [CategoryEnum.Vehicle]: "Vehicle",
    [CategoryEnum.Household]: "Household",
};

const DonatePage: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/home");
    };

    const [formData, setFormData] = useState<PostForm>(initialPostState);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
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

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null; // Use null as a default value;
        setSelectedImage(file);
    };


    const [addedItemData, setAddedItemData] = useState<AddedItem[]>([
        {
            item_id: "1",
            name: "rice",
            quantity: "50kg",
            category: CategoryEnum.Food,
        },
        {
            item_id: "2",
            name: "electric fan",
            quantity: "1",
            category: CategoryEnum.Electronic,
        },
        {
            item_id: "3",
            name: "mac mini m2",
            quantity: "1",
            category: CategoryEnum.Electronic,
        },
        {
            item_id: "4",
            name: "ipad air 5",
            quantity: "1",
            category: CategoryEnum.Electronic,
        },
    ]);

    const [newItem, setNewItem] = useState<AddedItem>({
        item_id: "",
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
        const newItemData: AddedItem = {
            item_id: (addedItemData.length + 1).toString(),
            name: newItem.name,
            quantity: newItem.quantity,
            category: newItem.category,
        };

        setAddedItemData((prevData) => [...prevData, newItemData]);
        setNewItem({
            item_id: "",
            name: "",
            quantity: "",
            category: CategoryEnum.Book,
        });
    };

    const handleDeleteItem = (index: number) => {
        const updatedItems = [...addedItemData];
        updatedItems.splice(index, 1);
        setAddedItemData(updatedItems);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("body", formData.body);
        formDataToSend.append("location", formData.location);
        formDataToSend.append("image", selectedImage || ''); // Provide a default value if selectedImage is null
        console.log(formData);
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
                        <p className="p-3 pt-5 pr-6 font-bold text-xl text-center cursor-pointer" onClick={handleLogoClick}>
                            Donate Form
                        </p>
                        <div className="flex-1">
                            <Header />
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-4 gap-5 flex flex-row">
                        <div className="mb-2 w-1/2 flex flex-col ">
                            <label htmlFor="title" className="block font-bold mb-1">
                                Title: <span className="text-red-500 font-normal">*</span>
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
                            <label htmlFor="location" className="block font-bold mb-1">
                                Location:
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-400"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="body" className="block font-bold mb-1">
                            Description: <span className="text-red-500 font-normal">*</span>
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
                            Items: <span className="text-red-500 font-normal">*</span>
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
                                        <option value={CategoryEnum.Unknown}>
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
                                        <option value={CategoryEnum.Electronic}>
                                            Electronic
                                        </option>
                                        <option value={CategoryEnum.Clothing}>
                                            Clothing
                                        </option>
                                        <option value={CategoryEnum.Book}>Book</option>
                                        <option value={CategoryEnum.Food}>Food</option>
                                        <option value={CategoryEnum.Vehicle}>
                                            Vehicle
                                        </option>
                                        <option value={CategoryEnum.Household}>
                                            Household
                                        </option>
                                    </select>

                                    <div className="mt-3 mb-3 float-right flex gap-2 items-center cursor-pointer text-blue-500 hover:text-blue-600 " onClick={handleAddItem}>
                                        Add Item
                                        <SiAddthis fontSize="30" />
                                    </div>

                                    <div className="mt-12">
                                        <label htmlFor="image" className="block font-bold mb-1 ">
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
                                                <th className="px-4 py-2">ID</th>
                                                <th className="px-4 py-2">Name</th>
                                                <th className="px-4 py-2">Quantity</th>
                                                <th className="px-4 py-2">Category</th>
                                                <th className="px-4 py-2"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {addedItemData.map((item, index) => (
                                                <tr
                                                    key={item.item_id}
                                                    className="border"
                                                >
                                                    <td className="px-4 py-2 text-blue-500 font-semibold">
                                                        <Link
                                                            to={`/post/${item.item_id}`}
                                                        >
                                                            #{item.item_id}
                                                        </Link>
                                                    </td>
                                                    <td className="px-4 py-2 font-semibold">
                                                        <Link to={`/profile`}>
                                                            {item.name}
                                                        </Link>
                                                    </td>
                                                    <td className="px-4 py-2 ">
                                                        <Link to={`/profile`}>
                                                            {item.quantity}
                                                        </Link>
                                                    </td>
                                                    <td className="px-4 py-2 ">
                                                        <Link to={`/profile`}>
                                                            {categoryEnumToString[item.category]}
                                                        </Link>
                                                    </td>
                                                    <td className="px-2 py-2 ">
                                                        <RiDeleteBinLine
                                                            onClick={() => handleDeleteItem(index)}
                                                            className="text-red-500 hover:text-red-600 cursor-pointer"
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`flex text-white px-4 py-2 rounded-md  float-right
                            ${(!formData.title || !formData.body || !newItem) ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                        >
                            Submit Form
                        </button>
                    </div>
                </form>
            </div>
        </div >

    );
};

export default DonatePage;
