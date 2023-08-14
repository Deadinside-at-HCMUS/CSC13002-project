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
    type: "Donating",
    title: "",
    body: "",
    author: "",
    items: [],
    status: "Posted",
    location: "",
    match: [],
    isArchived: false,
    photoId: "",
    photoUrl: "",
    createAt: "",
};

type CategoryEnumToString = {
    [key in CategoryEnum]: string;
};

const categoryEnumToString: CategoryEnumToString = {
    [CategoryEnum.Unknown]: "--Select category--",
    [CategoryEnum.Electronic]: "Electronic",
    [CategoryEnum.Clothing]: "Clothing",
    [CategoryEnum.Book]: "Book",
    [CategoryEnum.Food]: "Food",
    [CategoryEnum.Vehicle]: "Vehicle",
    [CategoryEnum.Household]: "Household",
    [CategoryEnum.Medical]: "Medical",
};

const DonatePage: React.FC = () => {
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
                            Donate Form
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

export default DonatePage;
