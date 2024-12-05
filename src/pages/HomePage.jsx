import React from "react";
import FilterFlight from "../components/common/filter/FilterFlight";

const HomePage = () => {
    return (
        <>
            <form className="grid grid-cols-2 gap-4 md:grid-cols-7">
                {/* from */}
                <div className="col-span-1 flex justify-center items-center">
                    <input
                        type="text"
                        className="h-[48px] w-full leading-[36px] border border-[#eaeaea] bg-transparent text-[#3b3b3b] rounded-md  placeholder:text-black py-[6px] px-[12px] focus:border-none focus:outline-blue-500"
                        placeholder="From"
                    />
                </div>
                {/* to */}
                <div className="col-span-1">
                    <input
                        type="text"
                        className="h-[48px] w-full leading-[36px] border border-[#eaeaea] bg-transparent text-[#3b3b3b] rounded-md  placeholder:text-black py-[6px] px-[12px] focus:border-none focus:outline-blue-500"
                        placeholder="To"
                    />
                </div>
                {/* depart */}
                <div className="col-span-1">
                    <input
                        type="date"
                        className="h-[48px] w-full leading-[36px] border border-[#eaeaea] bg-transparent text-[#3b3b3b] rounded-md  placeholder:text-black py-[6px] px-[12px] focus:border-none focus:outline-blue-500"
                        placeholder="depart"
                    />
                </div>
                {/*  way */}
                <div className="col-span-1">
                    <select
                        type="inputWay"
                        className="h-[48px] w-full leading-[36px] border border-[#eaeaea] bg-transparent text-[#3b3b3b] rounded-md  placeholder:text-black py-[6px] px-[12px] focus:border-none focus:outline-blue-500"
                    >
                        <option selected>One Way</option>
                        <option>Multiple Way</option>
                    </select>
                </div>
                {/* passengers */}
                <div className="col-span-1">
                    <select
                        type="passengers"
                        className="h-[48px] w-full leading-[36px] border border-[#eaeaea] bg-transparent text-[#3b3b3b] rounded-md  placeholder:text-black py-[6px] px-[12px] focus:border-none focus:outline-blue-500"
                    >
                        <option selected>1 Passenger</option>
                        <option>2 Passengers</option>
                        <option>3 Passengers</option>
                        <option>4 Passengers</option>
                        <option>5 Passengers</option>
                    </select>
                </div>

                {/* type */}
                <div className="col-span-1">
                    <select
                        type="type"
                        className="h-[48px] w-full leading-[36px] border border-[#eaeaea] bg-transparent text-[#3b3b3b] rounded-md  placeholder:text-black py-[6px] px-[12px] focus:border-none focus:outline-blue-500"
                    >
                        <option selected>Business</option>
                        <option>Economy</option>
                        <option>1st Class</option>
                    </select>
                </div>
                {/* button */}
                <div className="col-span-2 md:col-span-1">
                    <button className="text-white min-h-[48px] w-full text-[15px] py-[5px] px-[30px] bg-blue-600 hover:opacity-90 rounded-md">
                        Search
                    </button>
                </div>
            </form>
            <FilterFlight />
        </>
    );
};

export default HomePage;
