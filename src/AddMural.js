import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function AddMural() {
  const params = useParams();
  const Id = params.id;
  const userToken = localStorage.getItem("userToken");

  const [bookData, setBookData] = useState([]);
  const [card, setCard] = useState([]);
  const [qr, setQr] = useState([]);
  const [date, setDate] = useState("");
  const [number, setNumber] = useState("");
  const [user_id, setUser_id] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:4000/outgoing/${Id}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }
        const result = await response.json();
        setBookData(result.data.outgoing);
        // console.log(result);
        // console.log(result.data.outgoing);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }, [Id, userToken]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:4000/users/me`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }
        const result = await response.json();
        setUser_id(result.data.user);
        // console.log(result);
        // console.log(result.data.outgoing);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }, [userToken]);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:4000/cards/${bookData.map(
            (item) => item.account_id
          )}`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setCard(result.data.card);
      } catch (error) {
        console.error(error);
      }
    };
    if (bookData.length > 0) {
      fetchCard();
    }
  }, [bookData, userToken]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:4000/generateQR/${Id}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setQr(url);
        // console.log(response);
        // console.log(response.url);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }, [Id, userToken]);
  // console.log(Number(Id));
  // console.log(+userId);
  // console.log(user_id.id);

  const submit = () => {
    const content = document.getElementById("content");

    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      const pdfBlob = pdf.output("blob");

      // Send the PDF to the server
      const formData = new FormData();
      formData.append("topic", "منح جدارية");
      formData.append("number", Number(number));
      formData.append("permit_id", Number(Id));
      formData.append("user_id", Number(user_id.id));
      formData.append("date", date);

      axios
        .post("http://127.0.0.1:4000/renewal", formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => {
          alert("PDF sent to the server successfully!");
          // console.log(number);
          // console.log(formData);
          console.log(response);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while sending the PDF to the server.");
        });
    });
  };

  return (
    <div className="Mural step" id="content">
      <div className="MurInf">
        <h4>جمهورية العراق</h4>
        <h4> وزارة الصحة</h4>
        <h4>قسم القطاع الصحي الخاص</h4>
        <form>
          <h4>
            العدد :
            <span>
              <input
                type="text"
                name="number"
                id="number"
                onChange={(e) => setNumber(e.target.value)}
                style={{ display: "inline-block", backgroundColor: "#869dce" }}
              />
            </span>
          </h4>
          <h4>
            التاريخ :
            <span>
              <input
                type="date"
                name="date"
                id="date"
                onChange={(e) => setDate(e.target.value)}
                style={{ display: "inline-block", backgroundColor: "#869dce" }}
              />
            </span>
          </h4>
        </form>
      </div>
      <div className="MurInf1">
        <h4>كوماري عيراق</h4>
        <h4>وه زارتي ته ندروسى</h4>
        <h4>نووسيكه ى وةزير</h4>
        <h4>بة شي كة رتي ندورسى نايبة ت</h4>
      </div>
      <img className="Qr" alt="Qr Code" src={qr}></img>
      <h3 className="center">منح اجازة</h3>
      <h3 className="center">رخصة عمل مؤقتة</h3>
      <h4 className="center">
        استنادا الى الصلاحية المخولة لنا بموجب احكام قانون تأسيس المؤسسات الصحية
        الخاصة الاتحادي المرقم (25) لسنة 2015 تقرر :
      </h4>
      <h4
        className="center"
        style={
          card.map((item) => item.section).toString() === "الاجازات"
            ? { display: "block" }
            : { display: "none" }
        }
      >
        {console.log(card.map((item) => item.section))}
        {console.log("الاجازات")}
        <span>واشارة الى موافقة اللجان الاستشارية المركزية تقرر:-</span>
      </h4>
      <h4
        className="center"
        style={{ maxWidth: "800px", textWrap: "wrap", margin: "auto" }}
      >
        منح رخصة مؤقتة للدكتور (
        {card.map((item) => (
          <span key={item.id}>{item.fullname}</span>
        ))}
        ) اخصائي{" "}
        {card.map((item) => (
          <span key={item.id}>{item.job_position}</span>
        ))}{" "}
        /{" "}
        {card.map((item) => (
          <span key={item.id}>{item.nationality}</span>
        ))}{" "}
        الجنسية للعمل في (
        {card.map((item) => (
          <span key={item.id}>{item.company_name}</span>
        ))}
        /
        {card.map((item) => (
          <span key={item.id}>{item.governorate}</span>
        ))}
        ) وخلال فترة الاقامة التي تمنح له
      </h4>
      <div className="MurInf2">
        <h4>الصيدلاني</h4>
        <h4>عباس بدر الفرطوسي</h4>
        <h4>مدير قسم القطاع الصحي الخاص</h4>
        <h4>
          <span></span>
        </h4>
      </div>
      <div className="MurInf1">
        <h4>الدكتور</h4>
        <h4>هاني موسى العقابي</h4>
        <h4>الوكيل الفني لوزارة الصحة وكالة</h4>
        <h4>
          <span></span>
        </h4>
      </div>
      <button
        onClick={submit}
        className="generatePDF"
        style={{ bottom: "-100px", right: "100px" }}
      >
        حفظ الجدارية
      </button>
    </div>
  );
}
