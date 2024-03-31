import { Table, Modal, Button, Card, Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import './Remindercard.css';
import { useMyContext } from "../_Handlers/Mycontext";
import Pagination from 'react-bootstrap/Pagination';
import { ToastContainer, toast } from 'react-toastify';
import { getallremindder } from '@/app/_Handlers/Getallreminder';
import { deletereminder } from "../_Handlers/Deletereminder";
import { getreminder } from '../_Handlers/Getreminder';
import EditReminderModal from "./Editremindermodal";

function Remindercard(petid) {
    const [items, setItems] = useState([]);
    const { sharedState } = useMyContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [reminderid, setreminderid] = useState(null);
    const [reminderdata, setreminderdata] = useState(null);
    const [remindertype, setremindertype] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [deleteitemtype, setdeleteitemtype] = useState(null);
    const { trigger, setTrigger } = useMyContext();

    const totalPages = Math.ceil(items.total / 10);

    const handleDelete = async () => {
        if (deleteItemId && deleteitemtype) {
            const response = await deletereminder(deleteItemId, deleteitemtype);
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
            setDeleteItemId(null);
            setShowDeleteModal(false);

        }
    };

    const handleShowDeleteModal = (itemId) => {
        document.getElementById('deletemodal').showModal()
        setDeleteItemId(itemId.reminder_id);
        setdeleteitemtype(itemId.type)
        // setShowDeleteModal(true);
        console.log(itemId)
    };

    const handleHideDeleteModal = () => {
        setDeleteItemId(null);
        setShowDeleteModal(false);
    };


    const handleEdit = async (reminderdata) => {
        document.getElementById('Editmodal').showModal()
        setreminderid(reminderdata.reminder_id);
        setremindertype(reminderdata.type)
        setreminderdata(await getreminder(reminderdata.reminder_id, reminderdata.type));
        setShowEditModal(true);
    };

    useEffect(() => {
        getallremindder(petid.petid).then(data => {
            if (Array.isArray(data)) { // Check if data is an array
                setItems(data);
            } else {
                setItems([]); // Set pets to an empty array if data is not an array
            }
        });
    }, [sharedState, currentPage, trigger]);

    return (
        <>
            {items.length > 0 ? (
                <div style={{ borderRadius: '10px', overflow: 'scroll' }}>
                    <ToastContainer />
                    {items.map((item, index) => (
                        <div key={index} className="card w-100 bg-base-200 shadow-lg mb-4">
                            <div className="card-body">
                                <h2 className="card-title"> ชื่อยา:<br/> {item.drug_name}</h2>

                                {item.type === 'period' && (
                                    <div>
                                        <p>
                                            <strong>รูปแบบการแจ้งเตือน:</strong><br />
                                            แจ้งเตือนตามช่วงเวลา
                                        </p>
                                        <p>
                                            <strong>วิธีการใช้ยา:</strong><br />
                                            {item.drug_usage}
                                        </p>
                                        <p>
                                            <strong>รหัสรายการแจ้งเตือน:</strong><br />
                                            {item.reminder_id}
                                        </p>
                                    </div>
                                )}
                                {item.type === 'hour' && (
                                    <div>
                                        <p>
                                            <strong>รูปแบบการแจ้งเตือน:</strong><br />
                                            แจ้งเตือนตามจำนวนชั่วโมง
                                        </p>
                                        <p>
                                            <strong>วิธีการใช้ยา:</strong><br />
                                            {item.drug_usage}
                                        </p>
                                        <p>
                                            <strong>รหัสรายการแจ้งเตือน:</strong><br />
                                            {item.reminder_id}
                                        </p>
                                    </div>
                                )}
                                <div className="card-actions justify-end">
                                    <div className="dropdown dropdown-top dropdown-end">
                                        <div tabIndex={0} role="button" className="btn btn-active btn-secondary">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                                        </div>
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li><a onClick={() => handleEdit(item)}>แก้ไขการแจ้งเตือน</a></li>
                                            <li><a onClick={() => handleShowDeleteModal(item)}>ลบการแจ้งเตือน</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <EditReminderModal
                        show={showEditModal}
                        handleClose={() => setShowEditModal(false)}
                        reminder_id={reminderid}
                        type={remindertype}
                        reminderdata={reminderdata}
                    />
                    <dialog id="deletemodal" className="modal">
                        <div className="modal-box w-11/12 max-w-5xl">
                            <h3 className="font-bold text-lg">แจ้งเตือน!!</h3>
                            <p className="py-4">คุณต้องการที่จะลบรายการการแจ้งเตือนนี้ใช่หรือไม่</p>
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
            ) : (
                <div className="text-center mt-4">
                    <p>ยังไม่มีรายการการแจ้งเตือน</p>
                </div>
            )}
        </>
    );

}

export default Remindercard;
