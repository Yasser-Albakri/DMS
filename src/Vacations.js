import React from "react";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import Contact from "./Contact";
import './App.css'


export default function Vacations () {
    return (
        <div className="container" style={{display: 'flex'}}>
            <NavBar />
            <div className="con">
                <SearchBar />
                <div style={{height: '550px' , marginBottom: '20px'}}>
                  <Contact />
                </div>
            </div>
            <span className="log">.Firewall Qi co</span>
            <span className='log1'>جميع الحقوق محفوظة لوزارة الصحة قسم القطاع الطبي الخاص</span>
        </div>
    )
}