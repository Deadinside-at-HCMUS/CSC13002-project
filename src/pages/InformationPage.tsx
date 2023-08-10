import React, { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { AiTwotoneEdit } from "react-icons/ai"
import { RiImageEditFill } from "react-icons/ri"
import { BiSolidHelpCircle } from "react-icons/bi"
import { BsFillSendPlusFill, BsQrCodeScan } from "react-icons/bs"

const InformationPage: React.FC = () => {
    const {
        authState: { user },
    } = useContext(AuthContext);

    const username = user ? user.username : '';
    const email = user ? user.email : '';
    const gender = user ? user.gender : '';
    const phonenumber = user ? user.phonenumber : '';

    return (
        <div className="flex flex-auto gap-4">
            <div className=" bg-white p-4 rounded-md border border-gray-200 cursor-pointer">
                <strong className="text-gray-700 font-medium">Profile</strong>
                <div className="flex flex-row gap-7 items-start mt-5 mb-5 ml-5 mr-5">
                    <div
                        className="mb-px w-16 h-16 shrink-0 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                        style={{ backgroundImage: 'url("https://source.unsplash.com/80x80?face")' }}
                    />
                    <div className="relative flex flex-col justify-end mr-3 pt-8 w-3/5">
                        <div className="font-bold absolute top-0 left-0 text-[#272727]">
                            {username}
                        </div>
                        <div className="relative h-full">
                            Joined 3 months ago
                        </div>
                    </div>
                    <BsQrCodeScan fontSize={50} />
                </div>
                <div className="flex flex-col gap-5 pt-2 border-t border-neutral-200">
                    <div className="flex flex-row gap-10 pt-2 ml-12 items-center hover:text-blue-500">
                        <AiTwotoneEdit fontSize={25} className="text-[#272727]" />
                        Edit Profile Information
                    </div>
                    <div className="flex flex-row gap-10 pt-2 ml-12 items-center hover:text-blue-500">
                        <RiImageEditFill fontSize={25} className="text-[#272727]" />
                        Edit Profile Picture
                    </div>
                    <div className="flex flex-row gap-10 pt-2 ml-12 items-center hover:text-blue-500">
                        <BiSolidHelpCircle fontSize={25} className="text-[#272727]" />
                        Support
                    </div>
                    <div className="flex flex-row gap-10 pt-2 ml-12 items-center hover:text-blue-500">
                        <BsFillSendPlusFill fontSize={25} className="text-[#272727]" />
                        Invite
                    </div>
                </div>
            </div>
        </div>
    )
};

export default InformationPage;