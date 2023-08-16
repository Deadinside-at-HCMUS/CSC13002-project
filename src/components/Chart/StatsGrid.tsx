import React from "react";
import { FiUsers } from "react-icons/fi";
import { BsBoxArrowInDown, BsBoxArrowUp } from "react-icons/bs";
import { VscDebugDisconnect } from "react-icons/vsc";
import { User } from "../../reducers/authReducer";

interface BoxWrapperProps {
    children: React.ReactNode;
}

interface StatisticsProps {
    totalDonations: number;
    totalReceives: number;
    totalUsers: number;
    totalConnections: number;
    authUser: User | null;
}

function BoxWrapper({ children }: BoxWrapperProps) {
    return (
        <div className="bg-white rounded-md p-4 flex-1 border border-gray-200 flex items-center">
            {children}
        </div>
    );
}

const StatsGrid: React.FC<StatisticsProps> = ({
    totalDonations,
    totalReceives,
    totalUsers,
    totalConnections,
    authUser,
}) => {
    return (
        <div className="flex gap-4">
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                    <BsBoxArrowInDown className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">
                        Total Donations
                    </span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">
                            {totalDonations}
                        </strong>
                        <span className="text-sm text-green-500 pl-2">+2</span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                    <BsBoxArrowUp className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">
                        Total Receives
                    </span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">
                            {totalReceives}
                        </strong>
                        <span className="text-sm text-red-500 pl-2">-2</span>
                    </div>
                </div>
            </BoxWrapper>
            {authUser?.role === "collaborator" && (
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                        <FiUsers className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">
                            Total Users
                        </span>
                        <div className="flex items-center">
                            <strong className="text-xl text-gray-700 font-semibold">
                                {totalUsers}
                            </strong>
                            <span className="text-sm text-green-500 pl-2">
                                +5
                            </span>
                        </div>
                    </div>
                </BoxWrapper>
            )}
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                    <VscDebugDisconnect className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">
                        Total Connection
                    </span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">
                            {totalConnections}
                        </strong>
                        <span className="text-sm text-green-500 pl-2">+1</span>
                    </div>
                </div>
            </BoxWrapper>
        </div>
    );
};

export default StatsGrid;
