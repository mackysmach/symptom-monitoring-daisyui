'use client'
import { useState, useEffect, useRef } from 'react';
import { Form, Button, Modal, Col, Row, Container, Image, Dropdown } from 'react-bootstrap';
import { useMyContext } from '@/app/_Handlers/Mycontext';
import { getonepet } from '@/app/_Handlers/Getonepet';
import { useRouter } from 'next/navigation'
import Remindercard from '@/app/_componenets/Remindercard';
// import Spinner from 'react-bootstrap/Spinner';
import { getpetimg } from '@/app/_Handlers/Getpetimg';
import { BsPencilSquare } from 'react-icons/bs';
import Editpetimg from '@/app/_Handlers/Editpetimg';
import { deletepetimg } from '@/app/_Handlers/deletepetimg';
import { ToastContainer, toast } from 'react-toastify';
import Addpetimg from '@/app/_Handlers/Addpetimg';
const defaultpetimage = '/pngtree-cute-and-cute-cat-and-dog-image_2297890.jpg';


const PetDetails = ({ params }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [image, setimage] = useState('');
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const [fileSelected, setFileSelected] = useState(false);
    const { trigger, setTrigger } = useMyContext();
    const [showDeleteModal, setShowDeleteModal] = useState(false);




    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getonepet(params.petid);
                if (data) {
                    setUser(data);
                }
                const url = await getpetimg(params.petid);
                if (url) {
                    setimage(url);
                    setImagePreview(url)
                    console.log(image)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false after data fetching is done
            }
        };

        fetchData();
    }, [params.petid, trigger]);

    console.log(image)
    const handleNavigate = () => {
        router.push(`/Account/${params.petid}/Addreminder?petid=${params.petid}`);
    };


    const handleViewFullImage = () => {
        setShowModal(true);
    };


    const handleCloseModal = () => {
        setShowModal(false);
        setImagePreview(image);
        setFileSelected(false)
    };


    const handleEditImage = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFileSelected(true); // Set fileSelected to true when file is selected
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleConfirmEdit = async () => {
        const formData = new FormData();

        if (selectedFile) {

            formData.append('image', selectedFile);

        }
        if (image == null || image == '') {
            const formResponse = await Addpetimg(formData, params.petid);
            handleCloseModal();
            setSelectedFile(null);
            toast.success(formResponse.message, {
                autoClose: 1500,
                onClose: () => {
                    setTimeout(() => {
                        setTrigger(prev => prev + 1)
                    }, 1700);
                },
            });
        }
        else {
            const formResponse = await Editpetimg(formData, params.petid);
            handleCloseModal();
            setSelectedFile(null);
            toast.success(formResponse.message, {
                autoClose: 1500,
                onClose: () => {
                    setTimeout(() => {
                        setTrigger(prev => prev + 1)
                    }, 1700);
                },
            });
        }

        setFileSelected(false);
    };
    const handleDeleteConfirm = async () => {
        // Perform deletion action here
        const deleteResponse = await deletepetimg(params.petid);
        toast.success(deleteResponse.message, {
            autoClose: 1500,
            onClose: () => {
                setTimeout(() => {
                    setTrigger(prev => prev + 1)
                }, 1700);
            },
        });
        setShowDeleteModal(false); // Close the delete confirmation modal
        // Handle success or failure response
        console.log(deleteResponse);
    };



    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    return (
        <>
            {/* <Container className='mb-5'>
                <Row className='align-items-center'>
                    <Col xs={2}>
                        <div style={{
                            position: 'relative',
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            margin: 'auto',
                            cursor: 'pointer',
                        }}>
                            <Image src={image} alt={user.name} onClick={() => document.getElementById('petimagemodal').showModal()}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover', // Ensure the image fills the container while maintaining aspect ratio
                                }} roundedCircle fluid />
                        </div>
                    </Col>
                    <Col xs={8}>
                        <h2>{user.name}</h2>
                    </Col>

                </Row>
            </Container> */}
     <div className="container mx-auto px-4 sm-12">

            <div className="container  mb-10">
                <div className="flex items-center ">
                    <div >
                        <div className="avatar cursor-pointer">
                            <div className="w-32 rounded-full">
                                <img src={image||defaultpetimage}  onClick={() => document.getElementById('petimagemodal').showModal()} alt="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                    </div>
                    <div className='ml-4'>
                        <h4 className="text-3xl font-bold">{user.name}</h4>
                    </div>
                </div>
            </div>
            <input
                type="file"
                id="fileInput"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />


            <dialog id="petimagemodal" className="modal  w-full h-full">
                <div className="modal-box  w-11/12 max-w-xl">
                    <div className="text-center py-4">
                        <img  className=''src={imagePreview} alt="Selected Image" fluid />
                    </div>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>

                    <div className="modal-action ">
                        <form method="dialog">
                            {fileSelected && (
                                <button className='btn btn-primary  btn-left' onClick={handleConfirmEdit}>
                                    Confirm
                                </button>
                            )}
                            <div className="dropdown dropdown-top dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-accent m-1"><BsPencilSquare /> แก้ไขรูปสัตว์เลี้ยง</div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a onClick={handleEditImage}>เปลี่ยนรูปสัตว์เลี้ยง</a></li>
                                    <li><a onClick={() => document.getElementById('deleteconfirmmodal').showModal()}>ลบรูปสัตว์เลี้ยง</a></li>
                                </ul>
                            </div>
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <dialog id="deleteconfirmmodal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">แจ้งเตือน!!</h3>
                    <p className="py-4">คุณต้องการที่จะลบรูปสัตว์เลี้ยงใช่หรือไม่</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className='btn btn-secondary' onClick={handleDeleteConfirm}>ยืนยัน</button>
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">ยกเลิก</button>
                        </form>
                    </div>
                </div>
            </dialog>





            <div className='mb-3'>
                <Button variant="primary" onClick={handleNavigate}>เพิ่มการแจ้งเตือน</Button>
            </div>
            <Row >
                <hr style={{ margin: '20px 0', borderColor: '#000', borderWidth: '2px' }} />
            </Row>
            <div>
                <Remindercard petid={params.petid} />
            </div>
            <ToastContainer />
        </div>
        </>
    );
};

export default PetDetails;


//