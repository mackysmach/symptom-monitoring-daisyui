'use client'
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Image, FormGroup, FormCheck, Row, Col, Overlay, Tooltip } from 'react-bootstrap';
import "./Editremindermodal.css";
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useMyContext } from '../_Handlers/Mycontext';
import Editreminder from '../_Handlers/Editreminder';
import { getreminder } from '../_Handlers/Getreminder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { getusertime } from '../_Handlers/Getusertime';


function EditReminderModal({ show, handleClose, reminder_id, type, reminderdata }) {
    const formRef = useRef(null);
    const [items, setItems] = useState([]);
    const { setTrigger } = useMyContext();
    const [showOverlay, setShowOverlay] = useState(false);
    const helpButtonRef = useRef(null);
    const [CustomFrequency, setCustomFrequency] = useState(null);
    const [usertime, setusertime] = useState({})

    const storedLineProfile = typeof window !== 'undefined'
        ? JSON.parse(sessionStorage.getItem('lineProfile')) || {}
        : {};

    const convertToSimpleTime = (isoString) => {
        if (!isoString) return '';
        const dateObj = new Date(isoString);
        const simpleTime = dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        console.log(simpleTime)
        return simpleTime;
    };
    const [formData, setFormData] = useState({
        drug_name: '',
        drug_usage: '',
        reminder_type: '',
        frequency: '',
        every: '',
        first_usage: '',
        notify: {
            morning: false,
            noon: false,
            evening: false,
            before_bed: false,
        },
        time: {
            morning: null,
            noon: null,
            evening: null,
            before_bed: null,
        },

    });
    const checkboxLabels = {
        morning: 'เช้า',
        noon: 'เที่ยง',
        evening: 'เย็น',
        before_bed: 'ก่อนนอน',
    };
    useEffect(() => {
        const fetchDefaultTimes = async () => {
            try {
                const userTime = await getusertime(storedLineProfile.userId);
                console.log(userTime)
                setusertime(userTime)
            } catch (error) {
                console.error('Error fetching default time:', error);
            }
        };

        fetchDefaultTimes();
    }, []);


    useEffect(() => {


        if (reminderdata) {
            const { drug_name, drug_usage, every, frequency, morning, noon, evening, before_bed } = reminderdata;
            setCustomFrequency(frequency)
            let updatedFrequency = '';
            if (frequency === 1) {
                updatedFrequency = 'every day';
            } else if (frequency === 2) {
                updatedFrequency = 'every other day';
            } else {
                // Handle other cases here if needed
                updatedFrequency = 'custom'; // Set a default value or handle as per your logic
            }

            const updatedFormData = {
                drug_name,
                drug_usage,
                reminder_type: type,
                frequency: updatedFrequency,
                every: reminderdata.hasOwnProperty('every') ? every : '',
                notify: {
                    morning: !!morning,
                    noon: !!noon,
                    evening: !!evening,
                    before_bed: !!before_bed,
                },
                time: {
                    morning: morning ? convertToSimpleTime(morning) : convertToSimpleTime(usertime.morning),
                    noon: noon ? convertToSimpleTime(noon) : convertToSimpleTime(usertime.noon),
                    evening: evening ? convertToSimpleTime(evening) : convertToSimpleTime(usertime.evening),
                    before_bed: before_bed ? convertToSimpleTime(before_bed) : convertToSimpleTime(usertime.before_bed),
                },
            };

            setFormData(prevFormData => ({
                ...prevFormData,
                ...updatedFormData
            }));
        }

    }, [reminderdata, type]); // 

    const handleHelpButtonClick = () => {
        setShowOverlay(!showOverlay);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'every') {
            setFormData(prevData => ({
                ...prevData,
                every: value
            }));
        } else if (name === 'first_usage') {
            setFormData(prevData => ({
                ...prevData,
                first_usage: value

            }));
        } else if (type === 'checkbox') {
            setFormData(prevData => ({
                ...prevData,
                notify: {
                    ...prevData.notify,
                    [name]: checked
                },
                time: {
                    ...prevData.time,
                    [name]: checked ? prevData.time[name] : null  // Set time to null if checkbox is unchecked
                }
            }));
        } else {
            if (['morning', 'noon', 'evening', 'before_bed'].includes(name)) {
                setFormData(prevData => ({
                    ...prevData,
                    time: {
                        ...prevData.time,
                        [name]: value
                    }
                }));
            } else {
                setFormData(prevData => ({
                    ...prevData,
                    [name]: value
                }));
            }
        }
    };



    const handleSubmit = async (e) => {


        try {
            // Create JSON data object
            let jsonData = {
                "reminder_id": reminder_id,
                "drug_name": formData.drug_name,
                "drug_usage": formData.drug_usage,
                "frequency": formData.frequency,
            };
            const convertToISOStringThaiTime = (time) => {
                if (!time) return null;
                const [hours, minutes] = time.split(':').map(Number);
                const dateObj = new Date();
                dateObj.setUTCHours(hours);
                dateObj.setUTCMinutes(minutes);


                const isoStringThaiTime = dateObj.toISOString().replace('Z', '+07:00');

                return isoStringThaiTime;
            };
            if (formData.frequency === "every day") {
                jsonData = {
                    ...jsonData,
                    "frequency": 1, // Set frequency to 1 for every day
                };
            } else if (formData.frequency === "every other day") {
                jsonData = {
                    ...jsonData,
                    "frequency": 2, // Set frequency to 2 for every other day
                };
            }
            else if (formData.frequency === 'custom') {
                jsonData = {
                    ...jsonData,
                    'frequency': parseInt(CustomFrequency)
                }
            }

            // Check the reminder type
            if (formData.reminder_type === 'hour') {
                jsonData = {
                    ...jsonData,
                    "first_usage": convertToISOStringThaiTime(formData.first_usage),
                    "every": parseInt(formData.every),
                };
                const formResponse = await Editreminder(jsonData, formData.reminder_type);
                console.log(formResponse)
                toast.success(formResponse.message, {
                    autoClose: 1500,
                    onClose: () => {
                        setTimeout(() => {
                            setTrigger(prev => prev + 1)
                            handleClose();

                        }, 1700);
                    },
                });
            } else if (formData.reminder_type === 'period') {

                const checkedNotify = Object.entries(formData.notify)
                    .filter(([time, checked]) => checked)
                    .reduce((acc, [time, _]) => {
                        acc[time] = convertToISOStringThaiTime(formData.time[time]);
                        return acc;
                    }, {});

                jsonData = {
                    ...jsonData,
                    ...checkedNotify
                };
                const formResponse = await Editreminder(jsonData, formData.reminder_type);
                console.log(formResponse)
                toast.success(formResponse.message, {
                    autoClose: 1500,
                    onClose: () => {
                        setTimeout(() => {
                            setTrigger(prev => prev + 1)

                            handleClose();
                        }, 1700);
                    },
                });


            }

            console.log(jsonData)

        } catch (error) {
            // Handle errors
            console.error('Error submitting form data:', error);
        }
    };

    console.log(formData);



    return (
        <>

            <ToastContainer />

            <dialog id="Editmodal" className="modal w-full">
                <div className="modal-box  w-11/12 max-w-xl p-6">
                    <h3 className="font-bold text-lg mb-4">Edit Reminder</h3>

                    <label className="form-control  w-full max-w-xl">
                        <div className="label">
                            <span className="label-text">ชื่อยา:</span>
                        </div>
                        <input type="text"
                            name="drug_name"
                            value={formData.drug_name}
                            onChange={handleChange}
                            placeholder={items.drug_name} className="input input-bordered " />
                    </label>

                    <label className="form-control w-full max-w-xl">
                        <div className="label">
                            <span className="label-text">วิธีการใช้ยา:</span>
                        </div>
                        <textarea className="textarea textarea-bordered h-24"
                            name="drug_usage"
                            value={formData.drug_usage}
                            onChange={handleChange}
                            placeholder='ตัวอย่างการใช้ยา: กินทุกวันหนึ่งเม็ดหลังอาหาร'></textarea>

                    </label>

                    <label className="form-control w-full max-w-xl">
                        <div className="label">
                            <span className="label-text">รูปแบบการแจ้งเตือน:</span>
                        </div>
                        <select name="reminder_type"
                            value={formData.reminder_type}
                            onChange={handleChange} className="select select-bordered ">
                            <option disabled selected>เลือกรูปแบบการแจ้งเตือน</option>
                            <option value="hour">แจ้งเตือนตามจำนวนชั่วโมง</option>
                            <option value="period">แจ้งเตือนตามช่วงเวลา</option>
                        </select>
                    </label>

                    <label className="form-control w-full max-w-xl">
                        <div className="label">
                            <span className="label-text">ความถี่ในการแจ้งเตือน:</span>
                        </div>
                        <select name="frequency"
                            value={formData.frequency}
                            onChange={handleChange} className="select select-bordered ">
                            <option disabled selected>เลือกความถี่ในการแจ้งเตือน</option>
                            <option value="every other day" selected={formData.frequency === 2}>วันเว้นวัน</option>
                            <option value="every day" selected={formData.frequency === 1}>ทุกวัน</option>
                            <option value="custom" selected={formData.frequency >= 3}>กำหนดจำนวนวันด้วยตนเอง</option> {/* New option */}

                        </select>
                    </label>
                    {formData.frequency === 'custom' && (
                        <label className="form-control w-full max-w-xl mb-2 ">
                            <div className="label">
                                <span className="label-text">ทุกๆ กี่วัน:</span>
                            </div>
                            <input type="number"
                                min="3"
                                max="30"  // Change the maximum as needed
                                placeholder="ระบุจำนวน"
                                value={CustomFrequency}
                                onChange={(e) => setCustomFrequency(e.target.value)}
                                disabled={formData.frequency !== 'custom'} className="input input-bordered w-full max-w-xl" />
                        </label>
                    )}

                    {formData.reminder_type === 'hour' && (

                        <label className="form-control w-full max-w-xl mb-2">
                            <div className="label">
                                <span className="label-text">ทุกๆกี่ชั่วโมง:</span>
                            </div>
                            <input type="text"
                                name="every"
                                value={formData.every}
                                onChange={handleChange}
                                disabled={formData.reminder_type === 'period'}
                                placeholder='ใส่เป็นตัวเลขจำนวนชั่วโมงเช่น 12' className="input input-bordered w-full max-w-xl" />
                        </label>
                    )}

                    {formData.reminder_type === 'hour' && (
                        <label className="form-control w-full max-w-xl mb-2">
                            <div className="label">
                                <span className="label-text">เวลาที่ใช้ยาครั้งแรก:</span>
                            </div>
                            <input type="time"
                                name="first_usage"
                                value={formData.first_usage}
                                disabled={formData.every === ''}
                                onChange={handleChange} className="input input-bordered w-full max-w-xl" />
                        </label>
                    )}
                    {formData.reminder_type === 'period' && (
                        <label className="form-control w-full max-w-xl mb-2">
                            <div className="label">
                                <span className="label-text">เวลาที่แจ้งเตือน:</span>
                                <span>
                                    <div className="tooltip tooltip-left" data-tip="เวลาที่ตั้งค่าจะเป็นเวลาที่ผู้ใช้งานได้รับการแจ้งเตือน
                                   หากต้องมีการรับประทานยาก่อนอาหารแนะนำว่าควรตั้งเวลาแจ้งเตือนก่อนเวลาอาหารประมาณ 30นาที">
                                        <button className="btn btn-ghost">
                                            <FontAwesomeIcon icon={faQuestionCircle} style={{ cursor: 'pointer' }} />

                                        </button>
                                    </div>
                                </span>
                            </div>
                            {Object.entries(formData.notify).map(([time, isChecked]) => (
                                <div key={time}>

                                    <label className="label cursor-pointer">
                                        <span className="label-text">{checkboxLabels[time]}</span>
                                        <input type="checkbox" name={time}
                                            checked={isChecked}
                                            onChange={handleChange}
                                            disabled={formData.reminder_type === 'hour'} defaultChecked className="checkbox checkbox-primary" />
                                    </label>

                                    <input type="time"
                                        name={time}
                                        value={formData.time[time]}
                                        onChange={handleChange}
                                        disabled={!isChecked} className="input input-bordered w-full max-w-xl" />

                                </div>
                            ))}
                        </label>
                    )}

                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className='btn btn-primary btn-active mr-2' onClick={handleSubmit} >ยืนยัน</button>
                            <button className="btn btn-accent btn-active">ยกเลิก</button>
                            
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default EditReminderModal;
