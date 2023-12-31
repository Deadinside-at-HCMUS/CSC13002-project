import React, { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { AiTwotoneEdit, AiOutlineUser, AiOutlinePhone } from "react-icons/ai";
import {
    HiOutlineLocationMarker,
    HiOutlineMail,
    HiOutlineInformationCircle,
} from "react-icons/hi";
import { RiImageEditFill } from "react-icons/ri";
import { BiSolidHelpCircle, BiClipboard } from "react-icons/bi";
import {
    BsFillSendPlusFill,
    BsQrCodeScan,
    BsGenderAmbiguous,
} from "react-icons/bs";
// import { LiaBirthdayCakeSo } from "react-icons/lia";

const InformationPage: React.FC = () => {
    const {
        authState: { user },
    } = useContext(AuthContext);

    const username = user ? user.username : "";
    const fullname = user ? user.fullName : "";
    const email = user ? user.email : "";
    //const birthday = user ? user.dateOfBirth : "";
    const location = user ? user.location : "";
    const role = user ? user.role : "";
    const gender = user ? user.gender : "";
    const phonenumber = user ? user.phonenumber : "";

    return (
        <div className="flex flex-auto gap-4">
            <div className=" bg-white p-4 rounded-md border border-gray-200 cursor-pointer">
                <strong className="text-gray-700 font-medium">Profile</strong>
                <div className="flex flex-row gap-5  items-start mt-5 mb-5 ml-2 mr-5">
                    <div
                        className="mb-px w-16 h-16 shrink-0 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                        style={{
                            backgroundImage:
                                'url("https://source.unsplash.com/80x80?face")',
                        }}
                    />
                    <div className="relative flex flex-col justify-end mr-3 pt-8 w-3/5">
                        <div className="font-bold absolute top-0 left-0 text-blue-600">
                            {username}
                        </div>
                        <div className="relative h-full">
                            Joined 3 months ago
                        </div>
                    </div>
                    <BsQrCodeScan fontSize={50} className="text-blue-600" />
                </div>
                <div className="flex flex-col gap-5 pt-2 border-t border-neutral-200">
                    <div className="flex flex-row gap-5 pt-2 ml-12 items-center hover:text-blue-500">
                        <AiTwotoneEdit
                            fontSize={25}
                            className="text-[#5c5c5c]"
                        />
                        Edit Profile Information
                    </div>
                    <div className="flex flex-row gap-5 pt-2 ml-12 items-center hover:text-blue-500">
                        <RiImageEditFill
                            fontSize={25}
                            className="text-[#5c5c5c]"
                        />
                        Edit Profile Picture
                    </div>
                    <div className="flex flex-row gap-5 pt-2 ml-12 items-center hover:text-blue-500">
                        <BiSolidHelpCircle
                            fontSize={25}
                            className="text-[#5c5c5c]"
                        />
                        Support
                    </div>
                    <div className="flex flex-row gap-5 pt-2 ml-12 items-center hover:text-blue-500">
                        <BsFillSendPlusFill
                            fontSize={25}
                            className="text-[#5c5c5c]"
                        />
                        Invite
                    </div>
                </div>
            </div>
            <div className=" bg-white p-4 rounded-md border border-gray-200">
                <strong className="font-bolt text-blue-600 flex flex-row mb-3 place-items-center">
                    <HiOutlineInformationCircle
                        fontSize={25}
                        className="text-[#5c5c5c] mr-2"
                    />
                    Details
                </strong>

                <div className="flex flex-col gap-5 pt-2 border-t border-neutral-200">
                    <div className="flex flex-row items-center gap-5 pt-2 ml-8 ">
                        <AiOutlineUser
                            fontSize={25}
                            className="text-[#5c5c5c]"
                        />
                        <label className="font-medium mr-2 ml-2">
                            Full name: <span className="text-[#5c5c5c]">{fullname}</span>
                        </label>
                    </div>
                    <div className="flex flex-row items-center gap-5 pt-1 ml-8 ">
                        <HiOutlineMail
                            fontSize={25}
                            className="text-[#5c5c5c]"
                        />
                        <label className="font-medium mr-2 ml-2">
                            Email: <span className="text-[#5c5c5c]">{email}</span>
                        </label>
                    </div>
                    {/* <div className="flex flex-row place-items-center">
                        <HiOutlineLocationMarker
                            fontSize={25}
                            className="text-[#5c5c5c]"
                        />
                        <label className="font-medium mr-2 ml-2">
                            Date of Birth: {birthday.toString()}
                        </label>
                    </div> */}
                    <div className="flex flex-row items-center gap-5 pt-1 ml-8 ">
                        <HiOutlineLocationMarker
                            fontSize={25}
                            className="text-[#5c5c5c]"
                        />
                        <label className="font-medium mr-2 ml-2">
                            Location: <span className="text-[#5c5c5c]">{location}</span>
                        </label>
                    </div>
                    <div className="flex flex-row items-center gap-5 pt-1 ml-8 ">
                        <BiClipboard fontSize={25} className="text-[#5c5c5c]" />
                        <label className="font-medium mr-2 ml-2">
                            Role: <span className="text-[#5c5c5c]">{role}</span>
                        </label>
                    </div>
                    <div className="flex flex-row items-center gap-5 pt-1 ml-8 ">
                        <BsGenderAmbiguous
                            fontSize={25}
                            className="text-[#5c5c5c]"
                        />
                        <label className="font-medium mr-2 ml-2">
                            Gender: <span className="text-[#5c5c5c]">{gender}</span>
                        </label>
                    </div>
                    <div className="flex flex-row items-center gap-5 pt-1 ml-8 ">
                        <AiOutlinePhone
                            fontSize={25}
                            className="text-[#5c5c5c]"
                        />
                        <label className="font-medium mr-2 ml-2">
                            Phone number: <span className="text-[#5c5c5c]">{phonenumber}</span>
                        </label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default InformationPage;
