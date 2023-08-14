import React, { useContext, useEffect } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { getPostStatus } from "./utils/GetPostStatus";
import { FiArchive } from "react-icons/fi";
import { User } from "../../reducers/authReducer";
import { Post } from "../../reducers/postReducer";

interface RecentPost {
    postId: string;
    name: string;
    customerId: string;
    address: string;
    phoneNumber: string;
    postDate: string;
    donationList: string;
    currentPostStatus: string;
}

interface PostTableProps {
    authUser: User | null;
    authUsers: User[] | null;
    postData: Post[];
}

const PostTable: React.FC<PostTableProps> = ({
    authUser,
    authUsers,
    postData,
}) => {
    let recentPostData: RecentPost[] = [];

    if (authUser?.role === "collaborator" && authUsers) {
        recentPostData = postData.map((post) => {
            const owner = authUsers?.find(
                (user) => user._id === post.author._id
            );
            return {
                postId: post._id,
                name: owner?.fullName || "",
                customerId: owner?._id || "",
                address: owner?.location || "",
                phoneNumber: owner?.phonenumber || "",
                postDate: post.createdAt,
                donationList: "",
                currentPostStatus: post.status,
            };
        });
    } else {
        recentPostData = postData.map((post) => ({
            postId: post._id,
            name: authUser?.fullName || "",
            customerId: authUser?._id || "",
            address: authUser?.location || "",
            phoneNumber: authUser?.phonenumber || "",
            postDate: post.createdAt,
            donationList: "",
            currentPostStatus: post.status,
        }));
    }

    const handleArchivePost = (index: number) => {
        console.log("archive");
    };
    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-md border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">Recent Posts</strong>
            <div className="mt-3 overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300 text-left">
                    <thead>
                        <tr className="bg-[#F4F2FF] text-blue-500">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Address</th>
                            <th className="px-4 py-2">Phone Number</th>
                            <th className="px-4 py-2">Donation List</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Order Status</th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentPostData.map((post, index) => (
                            <tr key={post.postId} className="border">
                                <td className="px-4 py-2 text-blue-500 font-semibold">
                                    <Link to={`/post/${post.postId}`}>
                                        #{post.postId}
                                    </Link>
                                </td>
                                <td className="px-4 py-2 font-semibold">
                                    <Link to={`/profile`}>{post.name}</Link>
                                </td>
                                <td className="px-4 py-2 ">
                                    <Link to={`/profile`}>{post.address}</Link>
                                </td>
                                <td className="px-4 py-2 ">
                                    <Link to={`/profile`}>
                                        {post.phoneNumber}
                                    </Link>
                                </td>
                                <td className="px-4 py-2 ">
                                    {post.donationList}
                                </td>
                                <td className="px-4 py-2 ">
                                    {post.postDate
                                        ? format(
                                              new Date(post.postDate),
                                              "dd MMM yyyy"
                                          )
                                        : ""}
                                </td>

                                <td className="px-4 py-2 ">
                                    {getPostStatus(post.currentPostStatus)}
                                </td>
                                <td className="px-2 py-2 ">
                                    <FiArchive
                                        onClick={() => handleArchivePost(index)}
                                        className="text-red-500 hover:text-red-600 cursor-pointer"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PostTable;
