import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* REACT ICONS */
import { HiChevronDown } from "react-icons/hi";
import logo from "../assets/Logo.svg";



export function SidebarCopy() {

    const [showMenu, setShowMenu] = useState(false);
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [showServicios, setShowServicios] = useState(false);



    return (
        <>
            <div className={`xl:h-[100vh] fixed xl:static bg-[#F7F6F9] w-[70%] md:w-[30%] lg:[w-25%] xl:w-auto h-full top-0 p-2 flex flex-col justify-between z-50 
        ${showMenu ? "left-0" : "-left-full"} transition-all`}>
                {/* LOGO */}
                <div>
                    <div className='m-4 flex justify-center'>
                        {/* Logo */}
                        <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                            <div>
                                <img src={logo} alt="" />
                            </div>
                        </div>
                    </div>
                    <ul>
                        <li className='mb-8'>
                            <span className="w-full flex items-center justify-between gap-4 py-2 px-4 font-bold hover:text-primary transition-colors">Home</span>
                        </li>

                        <li className='mb-8'>
                            <span className="w-full flex items-center justify-between gap-4 py-2 px-4 font-bold hover:text-primary transition-colors">Dashboards</span>
                        </li>

                        <li className="mb-8">
                            <button onClick={() => setShowServicios(!showServicios)}
                                className="w-full flex items-center justify-between  py-2 px-4 rounded-lg hover:text-primary transition-colors">
                                <span className="flex items-center font-bold">Servicios</span>
                                <HiChevronDown
                                    className={`mt-1 ${showServicios && "rotate-180"
                                        } transition-all`}
                                />
                            </button>
                            <ul className={`my-2 ${!showServicios && "hidden"}`}>

                                <li className="mb-2 text-sm">
                                    <Link to="/" className="p-4 hover:text-primary">AMD</Link>
                                </li>
                                <li className="mb-2 text-sm">
                                    <Link to="tld" className="p-4 hover:text-primary">TLD</Link>
                                </li>
                                <li className="mb-2 text-sm">
                                    <Link to="/phd" className="p-4 hover:text-primary">PHD</Link>
                                </li>

                            </ul>

                        </li>


                        <li className='mb-8'>
                            <span className="w-full flex items-center justify-between gap-4 py-2 px-4 font-bold hover:text-primary transition-colors">Servicios Urgent Care</span>
                        </li>

                    </ul>
                </div>

            </div>
        </>
    )
}

