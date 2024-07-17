import './App.css';
import NavBar from './NavBar';
import React from 'react';
import SearchBar from './SearchBar';
import Contact from './Contact';
import Statistics from './Statistics';
import { useState } from 'react'

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="container" style={{display: 'flex'}}>
            <NavBar />
            <div className="con">
                <SearchBar setSearchTerm={setSearchTerm} />
                <div style={{height: '350px' , marginBottom: '20px'}}>
                  <Contact searchTerm={searchTerm} />
                </div>
                <div style={{height: '200px'}}>
                  <Statistics />
                </div>
            </div>
            <span className="log">.Firewall Qi co</span>
            <span className='log1'>جميع الحقوق محفوظة لوزارة الصحة قسم القطاع الطبي الخاص</span>
        </div>   
  );
}

export default App;
