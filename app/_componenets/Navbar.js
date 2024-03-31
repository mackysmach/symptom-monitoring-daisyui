'use client'
import React from "react";

import { useState } from 'react';

import { usePathname } from 'next/navigation'
import "./Navbar.css"
import ThemeSwap from "./Themeswapbutton";


function Navbar_basic() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const pathname = usePathname();
    const parts = pathname.split('/'); // Split the pathname using '/' as the delimiter
    const realpathname = parts[1]; // Get the second part of the pathname

    const storedLineProfile = typeof window !== 'undefined'
    ? JSON.parse(sessionStorage.getItem('lineProfile')) || {}
    : {};
    return (
        // <Navbar expand="lg" fixed="top" className="bg-body-tertiary, bg-success ">
        //     <Container className="text-center">
        //         <Button variant="success" onClick={handleShow}>
        //             <img src="/hamburger.svg"></img>
        //         </Button>

        //         <Offcanvas show={show} onHide={handleClose} style={{ backgroundColor: '#33363F' }} s>
        //             <Offcanvas.Header closeButton={false}>
        //                 <Offcanvas.Title></Offcanvas.Title>
        //             </Offcanvas.Header>
        //             <hr className="my-4" style={{ borderColor: 'white' }}></hr>

        //             <Offcanvas.Body >
        //                 <ul className="list-unstyled">

        //                     <li className="mb-4 text-center">
        //                         <a href="../Account" className="menu">Account</a>
        //                     </li>
        //                     <li className="mb-4 text-center">
        //                         <a href="../TimeSettings" className="menu">Setting</a>
        //                     </li>
        //                     <li className="mb-4 text-center">
        //                         <a href="../Search" className="menu">Search</a>
        //                     </li>

        //                 </ul>

        //             </Offcanvas.Body>
        //         </Offcanvas>
        //         <Navbar.Toggle />
        //         <div  >
        //             <p className="pagename">{realpathname}</p>
        //         </div>

        //         <Dropdown as={ButtonGroup} className="justify-content-end">
        //             <Button variant="success">Smart Howhan</Button>

        //             <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

        //             <Dropdown.Menu>
        //                 <Dropdown.Item href="#/action-1">logout</Dropdown.Item>
        //                 <Dropdown.Item href="#/action-2">logout</Dropdown.Item>
        //                 <Dropdown.Item href="#/action-3">logout</Dropdown.Item>
        //             </Dropdown.Menu>
        //         </Dropdown>
        //     </Container>
        // </Navbar>
        <div className="navbar bg-base-200 fixed top-0 w-full z-10 p-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a  href="../../Account">หน้าหลัก</a></li>
                        <li><a  href="../../Search">ค้นหาข้อมูล</a></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl">{realpathname}</a>
            </div>
            <div className="navbar-end">
                <ThemeSwap className="mr-4" />
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={storedLineProfile.pictureUrl} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-52">
                    
                        <li><a  href="../../TimeSettings">ตั้งค่าเวลาพื้นฐาน</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )

}
export default Navbar_basic;
