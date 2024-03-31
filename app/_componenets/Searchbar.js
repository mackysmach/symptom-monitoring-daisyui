'use client'
import { Form, Button } from "react-bootstrap";
import './Searchbar.css';
import { useMyContext } from "../_Handlers/Mycontext";
import { useState } from "react";

function Searchbar() {
    const { sharedState, setSharedState } = useMyContext();

    const handleInputChange = (e) => {
        setSharedState(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSharedState(e.target[0].value)
        console.log('Form submitted!');
    };
    var createAlertDialog = function () {
        var dialog = document.getElementById('my-alert-dialog');

        if (dialog) {
            dialog.show();
        } else {
            ons.createElement('alert-dialog.html', { append: true })
                .then(function (dialog) {
                    dialog.show();
                });
        }
    };

    var hideAlertDialog = function () {
        document
            .getElementById('my-alert-dialog')
            .hide();
    };

    var notify = function () {
        ons.notification.alert('This dialog was created with ons.notification');
    };
    const [data, setData] = useState([]);

   

    return (
        <>
            {/* <Form className="searchbar" onSubmit={handleSubmit}>
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    // value={sharedState} // Controlled component: value from sharedState
                    // onChange={handleInputChange} // Handle input change
                    onSubmit={handleSubmit}
                />
                <Button variant="success" type="submit">
                    Search
                </Button>
            </Form> */}
            <form onSubmit={handleSubmit} className="">
                <label className="input input-bordered input-primary flex items-center gap-2 w-full max-w-xs">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>

                    <input type="text" className="" placeholder="ค้นหา" />
                </label>
            </form>
           
        </>




    );
}

export default Searchbar;
