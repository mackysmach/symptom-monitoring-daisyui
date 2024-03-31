'use client'
import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { getusertime } from '@/app/_Handlers/Getusertime';
import Editusertime from '@/app/_Handlers/Editusertime';
import { ToastContainer, toast } from 'react-toastify';
import { useMyContext } from '@/app/_Handlers/Mycontext';
const TimeSettingPage = () => {
    const { trigger, setTrigger } = useMyContext();

    const storedLineProfile = typeof window !== 'undefined'
        ? JSON.parse(sessionStorage.getItem('lineProfile')) || {}
        : {};
    const user_id = storedLineProfile.userId;
    console.log(user_id)
    const [timeSettings, setTimeSettings] = useState({
        morning: '',
        noon: '',
        evening: '',
        before_bed: '',
    });

    const convertToISOStringThaiTime = (time) => {
        if (!time) return null;
        const [hours, minutes] = time.split(':').map(Number);
        const dateObj = new Date();
        dateObj.setUTCHours(hours);
        dateObj.setUTCMinutes(minutes);


        const isoStringThaiTime = dateObj.toISOString().replace('Z', '+07:00');
        // const isoStringThaiTime = dateObj.toISOString()
        return isoStringThaiTime;
    };
    const convertToSimpleTime = (isoString) => {
        if (!isoString) return '';
        const dateObj = new Date(isoString);
        const simpleTime = dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        return simpleTime;
    };

    const handleTimeChange = (timeSlot, value) => {
        setTimeSettings(prevSettings => ({
            ...prevSettings,
            [timeSlot]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jsonData = {
            user_id: user_id,
            morning: convertToISOStringThaiTime(timeSettings.morning),
            noon: convertToISOStringThaiTime(timeSettings.noon),
            evening: convertToISOStringThaiTime(timeSettings.evening),
            before_bed: convertToISOStringThaiTime(timeSettings.before_bed),
        };
        console.log(jsonData)
        try {
            const response = await Editusertime(jsonData);
            console.log(response.message);
            toast.success(response.message, {
                autoClose: 1500,
                onClose: () => {
                    setTrigger(prev => prev + 1)
                    setTimeout(() => {
                    }, 1700);
                },
            });
            // Add any logic for handling the response as needed
        } catch (error) {
            console.error('Error editing user time:', error);
            // Handle the error
        }
    };


    useEffect(() => {
        const fetchDefaultTimeSettings = async () => {
            try {
                const userTime = await getusertime(user_id);
                setTimeSettings({
                    morning: userTime.morning ? convertToSimpleTime(userTime.morning) : '', // Convert to Thai time
                    noon: userTime.noon ? convertToSimpleTime(userTime.noon) : '', // Convert to Thai time
                    evening: userTime.evening ? convertToSimpleTime(userTime.evening) : '', // Convert to Thai time
                    before_bed: userTime.before_bed ? convertToSimpleTime(userTime.before_bed) : '', // Convert to Thai time
                });
            } catch (error) {
                console.error('Error fetching default time settings:', error);
            }
        };

        fetchDefaultTimeSettings();
    }, [user_id]);

    return (
        <div className="container mx-auto px-4 sm-12">

        <div className="container">
            <form className='mt-4' onSubmit={handleSubmit}>
                <label className="form-control  w-full max-w-xl mb-2">
                    <div className="label">
                        <span className="label-text text-lg">เช้า:</span>
                    </div>
                    <input type="time"
                            value={timeSettings.morning}
                            onChange={(e) => handleTimeChange('morning', e.target.value)}
                     
                         className="input input-bordered input-neutral" />
                </label>
                <label className="form-control  w-full max-w-xl mb-2">
                    <div className="label">
                        <span className="label-text text-lg">เที่ยง:</span>
                    </div>
                    <input type="time"
                            value={timeSettings.noon}
                            onChange={(e) => handleTimeChange('noon', e.target.value)}
                     
                         className="input input-bordered input-neutral" />
                </label>
                <label className="form-control  w-full max-w-xl mb-2">
                    <div className="label">
                        <span className="label-text text-lg">เย็น:</span>
                    </div>
                    <input type="time"
                            value={timeSettings.evening}
                            onChange={(e) => handleTimeChange('evening', e.target.value)}
                     
                         className="input input-bordered input-neutral" />
                </label>
                <label className="form-control  w-full max-w-xl mb-2">
                    <div className="label">
                        <span className="label-text text-lg">ก่อนนอน:</span>
                    </div>
                    <input type="time"
                            value={timeSettings.before_bed}
                            onChange={(e) => handleTimeChange('before_bed', e.target.value)}
                     
                         className="input input-bordered input-neutral" />
                </label>

               
               



                <button className='btn btn-primary btn-active mr-2 mt-5 btn-md' type="submit"  >ยืนยัน</button>

            </form>
            <ToastContainer />

        </div>
        </div>
    );
};

export default TimeSettingPage;
