import { AiFillInstagram, AiFillGithub, AiFillFacebook } from 'react-icons/ai'

const Footer = () => {
    return (
        <div className="p-[3rem] mb-4 bg-blue-400 rounded-[10px] gap-8 grid grid-cols-5 m-auto items-center jusify-center">
            <div className="logo text-white pb-[1.5rem]">
                <img src="https://file.rendit.io/n/BMguV6XTfgasPlBI7Wr2.svg" className="mx-left w-10 py-4" />
                <p className="text-white pb-[13px] opacity-70 leading-7">
                    We always make our seekersand companies find the best jobs and employers find the best candidates.
                </p>
            </div>

            <div className="grid">
                <span className="text-[18px] font-semibold pb-[1.5rem] text-white">
                    Company
                </span>
                <div className="grid gap-3">
                    <li className="text-white opacity-[.7] hover:opacity-[1]">About Us</li>
                    <li className="text-white opacity-[.7] hover:opacity-[1]">Features</li>
                    <li className="text-white opacity-[.7] hover:opacity-[1]">News</li>
                    <li className="text-white opacity-[.7] hover:opacity-[1]">FAQ</li>
                </div>
            </div>

            <div className="grid">
                <span className="text-[18px] font-semibold pb-[1.5rem] text-white">
                    Resources
                </span>
                <div className="grid gap-3">
                    <li className="text-white opacity-[.7] hover:opacity-[1]">Account</li>
                    <li className="text-white opacity-[.7] hover:opacity-[1]">Support Center</li>
                    <li className="text-white opacity-[.7] hover:opacity-[1]">Feedback</li>
                    <li className="text-white opacity-[.7] hover:opacity-[1]">Contact Us</li>
                </div>
            </div>

            <div className="grid">
                <span className="text-[18px] font-semibold pb-[1.5rem] text-white">
                    Support
                </span>
                <div className="grid gap-3">
                    <li className="text-white opacity-[.7] hover:opacity-[1]">Events</li>
                    <li className="text-white opacity-[.7] hover:opacity-[1]">Promo</li>
                    <li className="text-white opacity-[.7] hover:opacity-[1]">Req Demo</li>
                    <li className="text-white opacity-[.7] hover:opacity-[1]">Careers</li>
                </div>
            </div>

            <div className="grid">
                <span className="text-[18px] font-semibold pb-[1.5rem] text-white">
                    Contact Info
                </span>
                <div>
                    <small className="text-[14px] text-white">devjam@gmail.com</small>
                    <div className="icons flex gap-4 py-[1rem]">
                        <AiFillInstagram className="bg-white p-[8px] h-[35px] w-[35px] rounded-full icon text-blue-500" />
                        <AiFillGithub className="bg-white p-[8px] h-[35px] w-[35px] rounded-full icon text-blue-500" />
                        <AiFillFacebook className="bg-white p-[8px] h-[35px] w-[35px] rounded-full icon text-blue-500" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer



