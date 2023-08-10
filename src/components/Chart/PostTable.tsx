import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { getPostStatus } from './utils/GetPostStatus'
import { FiArchive } from "react-icons/fi"

interface RecentOrder {
    post_id: string;
    name: string;
    customer_id: string;
    address: string;
    phone_number: string;
    order_date: string;
    donation_list: string;
    current_order_status: string;
}

const recentOrderData: RecentOrder[] = [
    {
        post_id: '1',
        name: 'Huynh Duc Thien',
        customer_id: '23143',
        address: 'Cottage Grove, OR 97424',
        phone_number: '0945738232',
        order_date: '2022-05-17T03:24:00',
        donation_list: '$435.50',
        current_order_status: 'POSTED',
    },
    {
        post_id: '7',
        name: 'Dang Dao Duong An',
        customer_id: '96453',
        address: 'Los Angeles, CA 90017',
        phone_number: '0934539982',
        order_date: '2022-05-14T05:24:00',
        donation_list: '$96.35',
        current_order_status: 'VERIFIED',
    },
    {
        post_id: '2',
        name: 'Le Anh Thu',
        customer_id: '65345',
        address: 'Westminster, CA 92683',
        phone_number: '0987654321',
        order_date: '2022-05-17T07:14:00',
        donation_list: '$836.44',
        current_order_status: 'WAITING',
    },
    {
        post_id: '3',
        name: 'Nguyen Minh Dat',
        customer_id: '87832',
        address: 'San Mateo, CA 94403',
        phone_number: '098987654',
        order_date: '2022-05-16T12:40:00',
        donation_list: '$334.50',
        current_order_status: 'DONE',
    },
    {
        post_id: '4',
        name: 'Tia To',
        customer_id: '09832',
        address: 'San Mateo, CA 94403',
        phone_number: '0876738921',
        order_date: '2022-05-14T03:24:00',
        donation_list: '$876.00',
        current_order_status: 'DOING',
    },
]


const PostTable: React.FC = () => {
    const handleArchivePost = (index: number) => {
        console.log("archive")
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
                        {recentOrderData.map((post, index) => (
                            <tr key={post.post_id} className="border">
                                <td className="px-4 py-2 text-blue-500 font-semibold">
                                    <Link to={`/post/${post.post_id}`}>#{post.post_id}</Link>
                                </td>
                                <td className="px-4 py-2 font-semibold">
                                    <Link to={`/profile`}>{post.name}</Link>
                                </td>
                                <td className="px-4 py-2 ">
                                    <Link to={`/profile`}>{post.address}</Link>
                                </td>
                                <td className="px-4 py-2 ">
                                    <Link to={`/profile`}>{post.phone_number}</Link>
                                </td>
                                <td className="px-4 py-2 ">{post.donation_list}</td>
                                <td className="px-4 py-2 ">
                                    {format(new Date(post.order_date), 'dd MMM yyyy')}
                                </td>
                                <td className="px-4 py-2 ">
                                    {getPostStatus(post.current_order_status)}
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

export default PostTable