'use client'
import React from 'react';
import { useState, useRef } from 'react';
// import { Button, Modal, Form } from 'react-bootstrap';
import './Addpetbutton.css'
import Addnewpet from '../_Handlers/Addnewpet';
import { ToastContainer, toast } from 'react-toastify';
import { useMyContext } from '../_Handlers/Mycontext';
import Addpetimg from '../_Handlers/Addpetimg';

function Addpetbutton(user) {
    const [showModal, setShowModal] = useState(false);
    const [removeImage, setRemoveImage] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const [input1, setInput1] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const formRef = useRef(null);
    const { trigger, setTrigger } = useMyContext();
    const json_data = {
        user_id: user.user,
        name: input1
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview('');
        }
    };




    const handleSubmit = async (event) => {
        event.preventDefault();

        if (input1) {
            try {

                const formResponse = await Addnewpet(json_data);
                console.log(formResponse.message);
                console.log(user.user)
                const formData = new FormData();

                if (imageFile) {

                    formData.append('image', imageFile);

                }
                const formResponse2 = await Addpetimg(formData, formResponse.pet_id);
                console.log(formResponse2)
                console.log(formResponse.pet_id)


                handleCloseModal();
                setInput1('');
                setImageFile(null);
                setImagePreview(null);
                document.getElementById("imageinput").value = ""
                toast.success(formResponse.message, {
                    autoClose: 1500,
                    onClose: () => {
                        setTimeout(() => {
                            setTrigger(prev => prev + 1)
                        }, 1700);
                    },
                });
                console.log(trigger)

            } catch (error) {
                console.error('Error:', error);
                toast.error('Error adding pet. Please try again.');

            }

        } else {
            console.log('Please fill in all inputs.');
        }
    };


    return (
        <>

            {/* <Button variant='success' className='Addbutton' onClick={handleShowModal}>New Pet</Button> */}
            <button className="btn btn-active btn-primary" onClick={() => document.getElementById('my_modal_2').showModal()}>เพิ่มสัตว์เลี้ยง</button>
            <div className="container mx-auto px-4 sm-12">
                <dialog id="my_modal_2" className="modal w-full">
                    <div className="modal-box w-full max-w-xl">
                        <h2 className="font-bold text-xl">เพิ่มสัตว์เลี้ยง</h2>
                        <form ref={formRef} onSubmit={handleSubmit} className='mt-5'>

                            <input
                                controlId="formInput1"
                                value={input1}
                                onChange={(e) => setInput1(e.target.value)}
                                type="text"
                                placeholder="ชื่อสัตว์เลี้ยง"
                                className="input input-bordered input-primary w-full max-w-xl  mb-4 mt-5"
                            />
                            <label className="form-control w-full max-w-xl mb-2 mt-3">
                                <div className="label">
                                    <span className="label-text text-lg">รูปสัตว์เลี้ยง: </span>
                                </div>
                                <input
                                    type="file"
                                    id="imageinput"
                                    onChange={handleFileChange}
                                    className="file-input file-input-ghost file-input-primary w-full max-w-xl mb-4 mt-3"
                                />
                                </label>
                                {imagePreview && (
                                    <div className="mt-2">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="max-w-full h-auto"
                                        />
                                    </div>
                                )}
                                <div className="flex mt-4">
                                    <button
                                        className="btn btn-active btn-primary"
                                        onClick={handleCloseModal}
                                        type='submit'
                                        disabled={!input1}
                                    >
                                        ยืนยัน
                                    </button>
                                </div>
                        </form>
                        <p className="py-4">Press ESC key or click outside to close</p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
            {/* <Modal show={showModal} onHide={handleCloseModal} centered size='lg' >
                <Modal.Header className="text-center p-3">
                    <Modal.Title className="mx-auto">Add new pet</Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-5'>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <Form.Group controlId="formInput1" className="position-relative mb-4">
                            <Form.Control
                                type="text"
                                placeholder="Pet Name "
                                value={input1}
                                style={{ width: '70%', backgroundColor: '#EEEFF4', borderRadius: '12px', height: '50px' }}
                                onChange={(e) => setInput1(e.target.value)}
                                required
                            />

                        </Form.Group>

                        <Form.Group controlId="formFile" className="position-relative mb-4">
                            <Form.Control
                                type="file"
                                onChange={handleFileChange}
                                style={{
                                    width: '50%',
                                    backgroundColor: '#EEEFF4',
                                    borderRadius: '12px',
                                    height: '50px',
                                }}
                            />
                            {imagePreview && (
                                <div className="mt-2">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                                    />
                                </div>
                            )}
                        </Form.Group>


                        <Modal.Footer className="d-flex justify-content-center align-items-center">
                            <Button variant="success" onClick={handleCloseModal} type='submit' disabled={!input1}>
                                Insert
                            </Button>

                            <Button variant="danger" onClick={handleCloseModal}>
                                Cancel
                            </Button>
                        </Modal.Footer>

                    </Form>

                </Modal.Body>

            </Modal> */}

            <ToastContainer />

        </>

    );
};

export default Addpetbutton;