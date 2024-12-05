import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faArrowRight,
	faSync,
} from "@fortawesome/free-solid-svg-icons";

const OrderForm = () => {
	return (
		<form className="grid grid-cols-2 gap-4 md:grid-cols-7">
			{/* from */}
			<div className="col-span-1 flex justify-center items-center">
				<input
					type="text"
					className="h-[48px] w-full leading-[36px] border border-[#eaeaea] bg-transparent text-[#3b3b3b] rounded-md  placeholder:text-black py-[6px] px-[12px] focus:border-none focus:outline-blue-500"
					placeholder="From"
				/>
				<FontAwesomeIcon icon={faSync} className="text-black ml-2" />
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
	);
};

const Travel1 = () => {
	return (
		<section
			className="ezy__travel1 light py-20 md:p-[100px] bg-[#0b1727] text-white relative z-1 bg-cover bg-no-repeat bg-center flex justify-center items-end overflow-hidden"
			style={{
				backgroundImage:
					"url(https://cdn.easyfrontend.com/pictures/hero/header35-img.png)",
			}}
		>
			<div className="container px-4 mx-auto">
				<div className="grid grid-cols-12">
					<div className="col-span-12">
						<div className="grid grid-cols-12 gap-4 relative">
							<div className="col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3 text-center mb-4">
								<h2 className="font-bold text-[39px] lg:text-[80px] mb-4">
									Your Journey Begins
								</h2>
								<div className="grid grid-cols-12">
									<div className="col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3">
										<p className="text-[18px] leading-[32px] opacity-70 text-center">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Nulla posuere ipsum molestie sem volutpat, non imperdiet
											leo porttitor. Nullam tortor nibh, dictum vitae porttitor
											eu, pharetra nec tellus.
										</p>
									</div>
								</div>
							</div>
							<div className="absolute -bottom-[65px] lg:bottom-0 lg:top-1/2 left-1/2 lg:left-0 lg:right-0 transform -translate-x-1/2 lg:translate-x-0 lg:-translate-y-1/2 flex justify-between opacity-60">
								<button className="h-[60px] w-[60px] rounded-full border border-white hover:border-blue-500 text-white hover:text-blue-500 transition ease-in-out duration-500 flex justify-center items-center cursor-pointer mr-4 lg:mr-0">
									<FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
								</button>
								<button className="h-[60px] w-[60px] rounded-full border border-white hover:border-blue-500 text-white hover:text-blue-500 transition ease-in-out duration-500 flex justify-center items-center cursor-pointer">
									<FontAwesomeIcon icon={faArrowRight} className="text-xl" />
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* search bar  */}
				<div className="grid grid-cols-12 gap-4 mt-20 md:mt-40 bg-white text-black px-4 rounded-md">
					<div className="col-span-12">
						<div className="p-[24px]">
							<OrderForm />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
