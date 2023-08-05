import React from 'react'
import { FcCollaboration, FcTouchscreenSmartphone, FcIdea } from 'react-icons/fc'

const Value: React.FC = () => {
    return (
        <div className="mb-[4rem] mt-[6rem]">
            <h1 className="text-[20px] py-[2rem] pb-[3rem] font-semibold w-[500px] block">
                The value that holds us true to account
            </h1>
            <div className="grid gap-[10rem] grid-cols-3 items-center">
                <div className="rounded-[10px] hover:bg-[#e3f4f4] p-[1.5rem]">
                    <div className="flex items-center gap-3">
                        <div className="p-[4px] rounded-[.8rem] bg-[#d2e9e9] h-[40px] w-[40px] flex items-center justify-center">
                            <FcCollaboration className="text-[30px]" />
                        </div>
                        <span className="font-semibold text-[18px]">
                            Simplicity
                        </span>
                    </div>
                    <p className="text-[13px] opacity-[.7] py-[1rem]">
                        Things benif made beautiful simple are at the heart of everything we do.
                    </p>
                </div>
                <div className="rounded-[10px] hover:bg-[#f8e8ee] p-[1.5rem]">
                    <div className="flex items-center gap-3">
                        <div className="p-[4px] rounded-[.8rem] bg-[#fdcedf] h-[40px] w-[40px] flex items-center justify-center">
                            <FcTouchscreenSmartphone className="text-[30px]" />
                        </div>
                        <span className="font-semibold text-[18px]">
                            Simplicity
                        </span>
                    </div>
                    <p className="text-[13px] opacity-[.7] py-[1rem]">
                        We believe in making things better for everyong, even it just by a little bit.
                    </p>
                </div>
                <div className="rounded-[10px] hover:bg-[#fff5b8] p-[1.5rem]">
                    <div className="flex items-center gap-3">
                        <div className="p-[4px] rounded-[.8rem] bg-[#ffe7a0] h-[40px] w-[40px] flex items-center justify-center">
                            <FcIdea className="text-[30px]" />
                        </div>
                        <span className="font-semibold text-[18px]">
                            Simplicity
                        </span>
                    </div>
                    <p className="text-[13px] opacity-[.7] py-[1rem]">
                        We work on the basis of creating trust which can be nutured through authenticity and transparency.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Value
