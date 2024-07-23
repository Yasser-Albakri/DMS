import React from "react";
import { useLocation } from "react-router-dom";
import "./App.css";

export default function SearchBar({ setSearchTerm }) {
  const loca = useLocation();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loca.pathname === "/Reports") {
    return (
      <div className="searchbar">
        <div style={{ display: "flex" }}>
          <img
            alt=""
            src="/aa.png"
            style={{ alignSelf: "start", width: "100px", height: "100px" }}
          />
          <p
            style={{
              display: "inline-block",
              alignSelf: "start",
              marginTop: "28px",
            }}
          >
            <b>قسم القطاع الصحي الخاص</b>
          </p>
        </div>
        <form action="" method="post">
          <p>
            من : <input type="date" name="from" />
          </p>
          <p>
            الى : <input type="date" name="to" />
          </p>
          <p>
            جهة الكتاب : <input type="text" />
          </p>
          <p>
            موضوع الكتاب : <input type="text" />
          </p>
          <p>
            رقم الوارد : <input type="text" />
          </p>
          <p>
            تاريخ الوارد : <input type="text" />
          </p>
          <img alt="" src="/search.png"></img>
        </form>
      </div>
    );
  } else {
    return (
      <div className="searchbar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img alt="" src="/aa.png" style={{ width: "60px", height: "60px" }} />
          <p style={{ display: "inline-block", alignSelf: "center" }}>
            <b> وزارة الصحة - قسم القطاع الصحي الخاص</b>
          </p>
        </div>
        <form action="" method="post">
          <img
            alt=""
            src="/search.png"
            style={{ width: "30px", height: "30px" }}
          ></img>
          <input
            type="text"
            placeholder="Search"
            style={{ width: "200px" }}
            onChange={handleSearchChange}
          />
        </form>
      </div>
    );
  }
}
