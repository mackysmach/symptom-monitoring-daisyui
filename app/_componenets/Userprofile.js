// components/Profile.js
'use client'
import React from 'react';
// import { Image, Container, Row, Col } from 'react-bootstrap';

const Profile = ({ user }) => {
    return (
        <div className="container mx-auto px-4">
        <div className="flex items-center">
            <div style={{ marginLeft: '20px' }}>
                        <div className="avatar">
                            <div className="w-24 rounded-full">
                                <img src={user.photo} alt="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                    </div>
                    <div className='ml-4'>
                    <h4 className="text-xl font-bold">{user.name}</h4>
                </div>
            </div>
        </div>
    );
};

export default Profile;
