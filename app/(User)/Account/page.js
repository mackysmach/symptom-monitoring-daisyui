'use client'
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import Profilecomponent from "@/app/_componenets/Userprofile";
import Addpetbuttoncomponent from "@/app/_componenets/Addpetbutton";
import Petprofilecomponent from "@/app/_componenets/Petprofile";
import { getallpet } from "@/app/_Handlers/Getallpet";

function Account() {
    const storedLineProfile = typeof window !== 'undefined'
        ? JSON.parse(sessionStorage.getItem('lineProfile')) || {}
        : {};
    const user = {
        name: storedLineProfile.displayName,        
        photo: storedLineProfile.pictureUrl,
        user_id: storedLineProfile.userId
    };
    const [pets, setPets] = useState([]);

    useEffect(() => {
        // Fetch pets data
        getallpet(user.user_id).then(data => {
            if (Array.isArray(data)) {
                setPets(data);
            }
        });
    }, [user.user_id]);

    return (
        <div className="container mx-auto px-4 sm-12">
            <div className="flex mb-5">
                <Profilecomponent user={user} />
            </div>
            <div className="mt-3 container mx-auto sm-12 flex items-end justify-between">
                <div className="flex-grow">
                    {/* <h4 className="text-2xl ml-10">My Pets</h4> */}
                    <kbd className="kbd kbd-md ml-10">สัตว์เลี้ยงของฉัน</kbd>

                </div>
                <div className="ml-2 mr-4">
                    <Addpetbuttoncomponent user={user.user_id} />
                </div>
            </div>
            {/* <hr className="my-4 border-1 border-black w-90 ml-5" /> */}
            <div className="divider divider-neutral border-1 max-w-8xl ml-5"></div>
            {pets.length > 0 ? (
                <div className="container sm-12">
                <Petprofilecomponent user={user} />
                </div>
            ) : (
                <div className="text-center mt-4">
                    <p>คุณยังไม่มีสัตว์เลี้ยง</p>
                </div>
            )}
        </div>
    );
}

export default Account;
