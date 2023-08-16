import React, { useContext, useEffect } from "react";
import StatsGrid from "../components/Chart/StatsGrid";
import TransactionChart from "../components/Chart/TransactionChart";
import UserPieChart from "../components/Chart/UserPieChart";
import PostTable from "../components/Chart/PostTable";
import { AuthContext } from "../contexts/authContext";
import { PostContext } from "../contexts/postContext";

const DashboardPage: React.FC = () => {
    const { authState } = useContext(AuthContext);

    const { postState, getAllPosts, getUserPosts } = useContext(PostContext);

    const postData = postState.posts;
    const authUser = authState.user;
    const authUsers = authState.users;

    useEffect(() => {
        const fetchData = async () => {
            if (authUser?.role === "collaborator") {
                await getAllPosts();
            } else {
                await getUserPosts();
            }
        };

        fetchData();
    }, []);

    const totalDonation = postData.reduce((total, post) => {
        if (post.type === "Donating" && post.status === "Done") {
            return total + 1;
        }
        return total;
    }, 0);

    const totalReceive = postData.reduce((total, post) => {
        if (post.type === "Receiving" && post.status === "Done") {
            return total + 1;
        }
        return total;
    }, 0);

    const totalUser = authUsers ? authUsers.length : 0;

    const totalConnection = totalDonation + totalReceive;

    return (
        <div className="flex flex-col gap-4">
            {authUser?.role === "collaborator" && <StatsGrid
                totalDonations={totalDonation}
                totalReceives={totalReceive}
                totalUsers={totalUser}
                totalConnections={totalConnection}
                authUser={authUser}
            />}
            <div className="flex flex-row gap-4 w-full">
                {authUser?.role === "collaborator" && <TransactionChart />}
                {authUser?.role === "collaborator" && <UserPieChart />}
            </div>
            <PostTable
                authUser={authUser}
                authUsers={authUsers}
                postData={postData}
            />
        </div>
    );
};

export default DashboardPage;
