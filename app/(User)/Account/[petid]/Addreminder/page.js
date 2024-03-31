'use client'
import { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import ImageInputModal from '@/app/_componenets/Imageinput';
import { getonepet } from '@/app/_Handlers/Getonepet';
import { useSearchParams } from 'next/navigation'
const Addreminder = () => {
    const searchParams = useSearchParams()
    const [user, setUser] = useState(null);
    const petid = searchParams.get('petid')

    const fetchUser = async () => {

        const userData = await getonepet(petid);
        setUser(userData);

    };
    useEffect(() => {
        fetchUser();
    }, []);
    console.log(user)


    return (
        <>
            <div className="container mx-auto px-4 sm-12">


                <ImageInputModal user_id={user?.user_id} pet_id={user?.pet_id} />
            </div>
        </>
    );
};

export default Addreminder;
