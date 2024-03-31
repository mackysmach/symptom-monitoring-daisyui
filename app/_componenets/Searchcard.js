'use client'

import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import { search } from '../_Handlers/Search';
import { useMyContext } from '../_Handlers/Mycontext';

const SearchCard = () => {
    const [items, setItems] = useState({ data: [], total: 0 });
    const { sharedState } = useMyContext();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(items.total / 10);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await search(currentPage, sharedState);
                if (data) {
                    setItems(data);
                }
                else {
                    setItems({ data: [], total: 0 });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setItems({ data: [], total: 0 });

            }
        };

        fetchData();
    }, [sharedState, currentPage]);

    function extractYouTubeId(url) {
        // Regular expression to match YouTube video IDs
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;

        // Match the URL against the regular expression
        const match = url.match(regExp);

        // If a match is found, return the video ID; otherwise, return null
        return match ? match[1] : null;
    }


    return (
        <>
            {items && items.data && items.data.map(item => (

                <div key={item.id} className="card w-102 bg-base-200 mb-3 max-w-xl w-full "  width="560">
                    <div className="card-body ">
                        {item.trade_name && <h2 className='card-title'><strong>ชื่อทางการค้า:</strong>{item.trade_name}</h2>}
                        {item.drug_name && <h2 className="mb-2 text-muted"><strong>ชื่อตัวยา:</strong> {item.drug_name}</h2>}
                        {item.title && <h2 className='card-title'><strong>  {item.title} </strong></h2>}
                        {item.description && <h2><strong>คำอธิบาย:</strong> {item.description}</h2>}
                        {item.preparation && <h2><strong>วิธีการใช้ยา:</strong> {item.preparation}</h2>}
                        {item.caution && <h2><strong>ข้อควรระวัง:</strong> {item.caution}</h2>}
                        {item.video_url && (
                            <div>
                                <div style={{ marginTop: '10px' }}>
                                <iframe className='w-full h-auto sm:h-96 xs:h-96' src={`https://www.youtube.com/embed/${extractYouTubeId(item.video_url)}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                </div>
                            </div>
                        )}          
                        <div className="card-actions justify-end">

                        </div>
                    </div>
                </div>
            ))}

            <div className="join">
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => (

                    <input key={index}
                        className="join-item btn btn-square" onClick={() => handlePageChange(index + 1)} type="radio" name="options" aria-label={index + 1} />


                ))}
            </div>

        </>
    );
};

export default SearchCard;
