import React from "react";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import Contact from "./Contact";
import "./App.css";
import { useState } from "react";

export default function Vacations() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="container" style={{ display: "flex" }}>
      <NavBar />
      <div className="con">
        <SearchBar setSearchTerm={setSearchTerm} />
        <div style={{ height: "550px", marginBottom: "20px" }}>
          <Contact title="اخر الكتب" searchTerm={searchTerm} />
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
