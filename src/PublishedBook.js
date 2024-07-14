import React from "react";
import NavBar from "./NavBar";
import SearchBar from './SearchBar';
import './App.css';
import Contact from "./Contact";
import AddCardButton from "./AddCardButton"

export default function PublishedBook () {
    return (
        <div className="container" style={{display: 'flex'}}>
            <NavBar />
            <div className="con">
                <SearchBar />
                <div style={{ height: '500px', marginBottom: '20px'}}>
                    <Contact />
                </div>
                <AddCardButton />
            </div>
            <span className="log">.Firewall Qi co</span>
            <span className='log1'>جميع الحقوق محفوظة لوزارة الصحة قسم القطاع الطبي الخاص</span>
        </div>
    )
}