'use client'
import React, { useEffect, useState } from 'react';
import { Image, Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { getallpet } from '../_Handlers/Getallpet';
import { useMyContext } from '../_Handlers/Mycontext';
import { getpetimg } from '../_Handlers/Getpetimg';
import Editpetname from '../_Handlers/Editpetname';
import { deletepet } from '../_Handlers/Deletepet';
import { ToastContainer, toast } from 'react-toastify';
const defaultpetimage = '/pngtree-cute-and-cute-cat-and-dog-image_2297890.jpg';

async function fetchData(userID, setPets) {
    try {
        const pets = await getallpet(userID);
        let i = 0;
        for (const pet of pets) {
            let imageURL;
            try {
                imageURL = await getpetimg(pet.pet_id);
            } catch (error) {
                console.error(`Error fetching image for pet ${pet.pet_id}:`, error);
                // Set a default image URL when there's an error fetching the image
                imageURL = defaultpetimage; // Adjust this to your actual default image path
            }
            pets[i] = { ...pet, image: imageURL };
            i++;
        }
        setPets(pets);
    } catch (error) {
        console.error('Error fetching pets:', error);
    }
}


const Petprofile = ({ user }) => {
    const { trigger, setTrigger } = useMyContext();
    const [pets, setPets] = useState([]);
    const [imgurl, setimgurl] = useState('')
    const [petImages, setPetImages] = useState({});
    const [input1, setInput1] = useState('')
    const [petid, setpetid] = useState('')
    const [name, setname] = useState('');
    console.log(defaultpetimage)
    useEffect(() => {
        fetchData(user.user_id, setPets)
    }, [trigger])

    async function handleEdit() {
        try {
            let jsondata = {

                "pet_id": petid, // Adjust as needed
                "name": input1, // Adjust as needed

            };
            console.log(jsondata)
            const response = await Editpetname(jsondata)
            toast.success(response.message, {
                autoClose: 1500,
                onClose: () => {
                    setTrigger(prev => prev + 1)
                    setTimeout(() => {
                    }, 1700);
                },
            });
            setname('')
            setpetid('')
            setInput1('')
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async () => {

        const response = await deletepet(petid);
        console.log(response)
        toast.success(response.message, {
            autoClose: 800,
            onClose: () => {
                setTimeout(() => {
                    console.log(trigger);
                    setTrigger(prev => prev + 1);
                }, 1100);
            },
        });
        setpetid('')
    };
    return (
        <div className='container mx-auto px-5 mt-5'>
            <ToastContainer />

            <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1  xl:grid-cols-3 gap-2 place-items-start text-center items-center  	">
                {pets?.map((item, index) => (
                    // <div  key={index} className='col-span-1'>
                    //     <a href={`/Account/${item.pet_id}`}>
                    //         <div style={{ position: 'relative', width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', margin: 'auto' }}>
                    //             <img
                    //                 src={item.image}
                    //                 alt={item.name}
                    //                 roundedCircle
                    //                 fluid
                    //                 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%' }}
                    //             />
                    //         </div>
                    //     </a>
                    //     <h4>
                    //         <a href={`/Account/${item.pet_id}`} style={{textDecoration:'none'}}>
                    //             <h1>{item.name}</h1>
                    //         </a>
                    //     </h4>
                    // </div>

                    // <div key={index} className="card card-compact w-96 bg-base-100 shadow-xl">
                    //     <a href={`/Account/${item.pet_id}`}>
                    //         <figure style={{ width: '100%', height: '150px', overflow: 'hidden' }}>
                    //             <img src={item.image} alt="Pets" className='w-full h-full object-cover rounded-tl-xl rounded-tr-xl' />
                    //         </figure>
                    //     </a>
                    //     <div className="card-body">
                    //         <h2 className="card-title">{item.name}</h2>
                    //         <div className="card-actions justify-end">
                    //             <div className="dropdown">
                    //                 <div tabIndex={0} role="button" className="btn btn-active btn-secondary">
                    //                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                    //                 </div>
                    //                 <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    //                     <li><a onClick={() => { document.getElementById('editpetname').showModal(); setpetid(item.pet_id); setname(item.name) }}>Edit pet name</a></li>
                    //                     <li><a onClick={() => { document.getElementById('deletepet').showModal(); setpetid(item.pet_id) }}>Delete pet</a></li>
                    //                 </ul>
                    //             </div>
                    //         </div>
                    //     </div>
                    //     <dialog id="editpetname" className="modal">
                    //         <div className="modal-box">
                    //             <h2 className="font-bold text-lg">Edit Pet name</h2>



                    //             <input
                    //                 controlId="formInput1"
                    //                 value={input1}
                    //                 onChange={(e) => setInput1(e.target.value)}
                    //                 type="text"
                    //                 placeholder={name}
                    //                 required
                    //                 className="input input-bordered input-primary w-64  mb-4 mt-5"
                    //             />
                    //             <form method='dialog'>
                    //                 <div className="flex mt-4 ml-4">
                    //                     <button
                    //                         className="btn btn-active btn-primary ml-5"
                    //                         onClick={handleEdit}
                    //                         disabled={!input1}
                    //                     >
                    //                         Submit
                    //                     </button>
                    //                 </div>
                    //             </form>

                    //             <p className="py-4">Press ESC key or click outside to close</p>
                    //         </div>
                    //         <form method="dialog" className="modal-backdrop">
                    //             <button>close</button>
                    //         </form>
                    //     </dialog>

                    //     <dialog id="deletepet" className="modal">
                    //         <div className="modal-box">
                    //             <h3 className="font-bold text-lg">Alert!</h3>
                    //             <p className="py-4">Are you sure you want to delete this pet?</p>
                    //             <div className="modal-action">
                    //                 <form method="dialog">
                    //                     <button className="btn btn-active btn-secondary" onClick={handleDelete}>Confirm</button>
                    //                     {/* if there is a button, it will close the modal */}
                    //                     <button className="btn ml-3">Cancel</button>
                    //                 </form>
                    //             </div>
                    //         </div>
                    //     </dialog>


                    // </div >
                    <div key={index} className="max-w-md mx-auto rounded-xl shadow-md  md:max-w-2xl flex bg-base-200 mb-4">
                        <div className="md:flex-shrink-0">
                            <a href={`/Account/${item.pet_id}`}>
                                <img className="rounded-tl-xl rounded-bl-xl h-48 w-48 object-cover md:h-48 md:w-48" src={item.image || defaultpetimage} alt="pet image" />
                            </a>
                        </div>
                        <div className="flex flex-col justify-center  p-8 w-48">
                            <a href={`/Account/${item.pet_id}`} className="block mt-1 text-lg leading-tight font-medium  hover:underline">
                                <div className="uppercase tracking-wide text-xl font-semibold">{item.name}</div>
                            </a>

                        </div>
                        <div className="dropdown dropdown-end top-0 right-0 mr-2 mt-2">
                            <div tabIndex={0} role="button" className="btn btn-active btn-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a onClick={() => { document.getElementById('editpetname').showModal(); setpetid(item.pet_id); setname(item.name) }}>แก้ไขชื่อสัตว์เลี้ยง</a></li>
                                <li><a onClick={() => { document.getElementById('deletepet').showModal(); setpetid(item.pet_id) }}>ลบสัตว์เลี้ยง</a></li>
                            </ul>
                        </div>
                    </div>


                ))}
                <dialog id="editpetname" className="modal w-full">
                    <div className="modal-box flex flex-col items-center">
                        <h2 className="font-bold text-lg">แก้ไขชื่อสัตว์เลี้ยง</h2>

                        <input
                            controlId="formInput1"
                            value={input1}
                            onChange={(e) => setInput1(e.target.value)}
                            type="text"
                            placeholder={name}
                            required
                            className="input input-bordered input-primary w-64 mb-4 mt-5"
                        />
                        <form method='dialog'>
                            <div className="flex justify-center"> {/* Center the button */}
                                <button
                                    className="btn btn-active btn-primary items-center"
                                    onClick={handleEdit}
                                    disabled={!input1}
                                >
                                    ยืนยัน
                                </button>
                            </div>
                        </form>

                        <p className="py-4">Press ESC key or click outside to close</p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>ปิด</button>
                    </form>
                </dialog>

                <dialog id="deletepet" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">แจ้งเตือน!</h3>
                        <p className="py-4">คุณต้องการที่จะลบสัตว์เลี้ยงตัวนี้ใช่หรือไม่</p>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn btn-active btn-secondary" onClick={handleDelete}>ยืนยัน</button>
                                {/* if there is a button, it will close the modal */}
                                <button className="btn ml-3">ยกเลิก</button>
                            </form>
                        </div>
                    </div>
                </dialog>


            </div>
        </div >
    );
};

export default Petprofile;


