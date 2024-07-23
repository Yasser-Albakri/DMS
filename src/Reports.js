import React from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import "./App.css";
import Contact from "./Contact";

export default function Reports() {
  return (
    <div className="container" style={{ display: "flex" }}>
      <NavBar />
      <div className="con">
        <SearchBar />
        <div style={{ height: "410px", marginBottom: "20px" }}>
          <Contact />
        </div>
      </div>
      <span className="log">
        شركة الجدار الناري لخدمات الأمن السيبراني للدعم والمساعدة:
        +9647838200050 +9647713366777
      </span>
      <span className="log1">
        جميع الحقوق محفوظة لوزارة الصحة قسم القطاع الطبي الخاص
      </span>
    </div>
  );
}
