import React from "react";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import Contact from "./Contact";
import './App.css'

export default function Card() {
    return (
        <div className="container" style={{display: 'flex'}}>
            <NavBar />
            <div className="con">
                <SearchBar />
                <div style={{ height: '550px', marginBottom: '20px'}}>
                    <Contact />
                </div>
            </div>
            <span className="log">شركة الجدار الناري لخدمات الامن السيبراني</span>
        </div>
    )
}