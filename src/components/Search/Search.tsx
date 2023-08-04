import { AiOutlineSearch, AiOutlineCloseCircle } from 'react-icons/ai'
import { BsHouseDoor } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'

const Search = () => {
    return (
        <div className="grid gp-10 bg-[#f1f4f8] rounded-[10px] p-[3rem]">
            <form action="">
                <div className="flex justify-between items-center rounded-[8px] gap-[10px] bg-white p-5 shadow-lg shadow-[#f1f4f8]-700">
                    <div className="flex gap-2 items-center">
                        <AiOutlineSearch className="text-[25px] icon" />
                        <input type="text" className="bg-transparent text-blue-500 focus:outline-none w-[100%]" placeholder="Search Post Here..." />
                        <AiOutlineCloseCircle className="text-[25px] text-[#a5a6a6] hover:text-[#000] icon" />
                    </div>
                    <div className="flex gap-2 items-center">
                        <BsHouseDoor className="text-[25px] icon" />
                        <input type="text" className="bg-transparent text-blue-500 focus:outline-none w-[100%]" placeholder="Search Donator Here..." />
                        <AiOutlineCloseCircle className="text-[25px] text-[#a5a6a6] hover:text-[#000] icon" />
                    </div>
                    <div className="flex gap-2 items-center">
                        <CiLocationOn className="text-[25px] icon" />
                        <input type="text" className="bg-transparent text-blue-500 focus:outline-none w-[100%]" placeholder="Search Location Here..." />
                        <AiOutlineCloseCircle className="text-[25px] text-[#a5a6a6] hover:text-[#000] icon" />
                    </div>
                    <button className='bg-blue-500 h-full p-3 px-6 rounded-[10px] text-white cursor-pointer hover:bg-blue-300'>Search</button>
                </div>
            </form>
        </div>
    )
}

export default Search
