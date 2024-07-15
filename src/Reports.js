import React from "react";
import NavBar from "./NavBar";
import SearchBar from './SearchBar';
import './App.css';
import Contact from "./Contact";

export default function Reports () {
    return (
        <div className="container" style={{display: 'flex'}}>
            <NavBar />
            <div className="con">
                <SearchBar />
                <div style={{ height: '410px', marginBottom: '20px'}}>
                    <Contact />
                </div>
            </div>
            <span className="log">.Firewall Qi co</span>
            <span className='log1'>جميع الحقوق محفوظة لوزارة الصحة قسم القطاع الطبي الخاص</span>
        </div>
    )
}