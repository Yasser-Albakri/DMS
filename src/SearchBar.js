import React from "react";
import { useLocation } from "react-router-dom";
import "./App.css";

export default function SearchBar({
  setSearchTerm,
  setFrom,
  setTo,
  setTopicBook,
  setNumberBook,
  setDateBook,
  setSourceBook,
}) {
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
        <form className="search-form" action="" method="post">
          <p>
            من : <input type="date" onChange={(e) => setFrom(e.target.value)} />
          </p>
          <p>
            الى : <input type="date" onChange={(e) => setTo(e.target.value)} />
          </p>
          <p>
            جهة الكتاب :{" "}
            <input
              type="text"
              onChange={(e) => setSourceBook(e.target.value)}
            />
          </p>
          <p>
            موضوع الكتاب :{" "}
            <input type="text" onChange={(e) => setTopicBook(e.target.value)} />
          </p>
          <p>
            رقم الكتاب :{" "}
            <input
              type="text"
              onChange={(e) => setNumberBook(e.target.value)}
            />
          </p>
          <p>
            تاريخ الكتاب :{" "}
            <input type="date" onChange={(e) => setDateBook(e.target.value)} />
          </p>
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
