import React from "react";
import { useLocation } from "react-router-dom";
import './App.css';

export default function SearchBar () {
    const loca = useLocation();
    if(loca.pathname==="/Reports") {
        return (
            <div className="searchbar">
                 <div style={{display:'flex'}}>
                    <img alt="" src="/aa.png" style={{alignSelf:'start', width:'100px', height:'100px'}} />
                    <p style={{display: 'inline-block', alignSelf:'start', marginTop:'28px'}}><b>قسم القطاع الصحي الخاص</b></p>
                </div>
                <form action="" method="post">
                    <p>من :    <input type="date" name="from" /></p>
                    <p>الى :   <input type="date" name="to" /></p>
                    <p>جهة الكتاب : <input type="text" /></p>
                    <p>موضوع الكتاب : <input type="text" /></p>
                    <p>رقم الوارد : <input type="text" /></p>
                    <p>تاريخ الوارد : <input type="text" /></p>
                    <input type="submit" value={'بحث'} />
                </form>
            </div>
        )
    }else {
    return (
        <div className="searchbar">
            <div style={{display:'flex'}}>
                <img alt="" src="/aa.png" />
                <p style={{display: 'inline-block', alignSelf:'center'}}><b> وزارة الصحة - قسم القطاع الصحي الخاص</b></p>
            </div>
            <form action="" method="post">
                <input type="submit" value={'بحث'} />
                <input type="text" />
            </form>
        </div>
    ) }
}