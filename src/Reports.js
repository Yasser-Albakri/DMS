import React, { useState } from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import "./App.css";
import Contact from "./Contact";

export default function Reports() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [topicBook, setTopicBook] = useState("");
  const [numberBook, setNumberBook] = useState("");
  const [dateBook, setDateBook] = useState("");
  const [sourceBook, setSourceBook] = useState("");
  return (
    <div className="container" style={{ display: "flex" }}>
      <NavBar />
      <div className="con">
        <SearchBar
          setFrom={setFrom}
          setTo={setTo}
          setTopicBook={setTopicBook}
          setNumberBook={setNumberBook}
          setDateBook={setDateBook}
          setSourceBook={setSourceBook}
        />
        <div style={{ height: "410px", marginBottom: "20px" }}>
          <Contact
            from={from}
            to={to}
            topicBook={topicBook}
            numberBook={numberBook}
            dateBook={dateBook}
            sourceBook={sourceBook}
          />
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
