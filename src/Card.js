import React from "react";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import Contact from "./Contact";
import { Link } from "react-router-dom";
import "./App.css";
import { useParams } from "react-router-dom";

export default function Card() {
  const { id } = useParams();
  return (
    <div className="container" style={{ display: "flex" }}>
      <NavBar />
      <div className="con">
        <SearchBar />
        <div style={{ height: "500px", marginBottom: "20px" }}>
          <Contact title="البطاقة" />
        </div>
        <div>
          <Link to={`/CardInfo/${id}`}>
            <button className="add-card-button">عرض معلومات البطاقة</button>
          </Link>
          <Link to={`/AddCard/${id}`}>
            <button className="btn-primary">تعديل معلومات البطاقة</button>
          </Link>
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
