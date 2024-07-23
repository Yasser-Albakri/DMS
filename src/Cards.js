import React from "react";
import NavBar from "./NavBar"
import SearchBar from './SearchBar';
import './App.css';
import Contact from "./Contact"
import AddCardButton from "./AddCardButton";
import { useState } from "react";

export default function Cards() {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <div className="container" style={{display: 'flex'}}>
            <NavBar />
            <div className="con">
                <SearchBar setSearchTerm={setSearchTerm} />
                <div style={{ height: '500px', marginBottom: '20px'}}>
                    <Contact title="اخر البطاقات" searchTerm={searchTerm} />
                </div>
                <AddCardButton />
            </div>
            <span className="log">.Firewall Qi co</span>
            <span className='log1'>جميع الحقوق محفوظة لوزارة الصحة قسم القطاع الطبي الخاص</span>
        </div>
    )
}