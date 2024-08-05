import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./App.css";

export default function Mural() {
  const params = useParams();
  const Id = params.id;
  const userToken = localStorage.getItem("userToken");

  const [bookData, setBookData] = useState([]);
  const [card, setCard] = useState([]);
  const [qr, setQr] = useState([]);
  //   const [user_id, setUser_id] = useState([]);
  const [renewal, setRenewal] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:4000/renewal/${Id}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }
        const result = await response.json();
        setRenewal(result.data.renewal);
        // console.log(result);
        // console.log(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }, [Id, userToken]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:4000/outgoing/${renewal.map((i) => i.permit_id)}`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
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
  }, [Id, userToken, renewal]);

  //   useEffect(() => {
  //     const fetchBook = async () => {
  //       try {
  //         const response = await fetch(`http://127.0.0.1:4000/users/me`, {
  //           headers: { Authorization: `Bearer ${userToken}` },
  //         });
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch book");
  //         }
  //         const result = await response.json();
  //         setUser_id(result.data.user);
  //         // console.log(result);
  //         // console.log(result.data.outgoing);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     fetchBook();
  //   }, [userToken]);

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
        if (Array.isArray(result.data.card)) {
          setCard(result.data.card);
        } else {
          console.error("Expected an array for card data");
        }
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
        const response = await fetch(
          `http://127.0.0.1:4000/generateQR/${renewal.map((i) => i.permit_id)}`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
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
  }, [renewal, userToken]);

  return (
    <div className="Mural step" id="content">
      <div className="MurInf">
        <h4>جمهورية العراق</h4>
        <h4> وزارة الصحة</h4>
        <h4>قسم القطاع الصحي الخاص</h4>
        <h4>
          العدد :<span>{renewal.map((i) => i.number)}</span>
        </h4>
        <h4>
          التاريخ :<span>{renewal.map((i) => i.date)}</span>
        </h4>
      </div>
      <div className="MurInf1">
        <h4>كوماري عيراق</h4>
        <h4>وه زارتي ته ندروسى</h4>
        <h4>نووسيكه ى وةزير</h4>
        <h4>بة شي كة رتي ندورسى نايبة ت</h4>
      </div>
      <img className="Qr" alt="Qr Code" src={qr}></img>
      <h3 className="center">
        {renewal.map((i) => i.topic).toString() === "تجديد جدارية"
          ? "تجديد اجازة"
          : "منح اجازة"}
      </h3>
      {/* {console.log(renewal.map((i) => i.topic))} */}
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
        <span>واشارة الى موافقة اللجان الاستشارية المركزية تقرر:-</span>
      </h4>
      <h4
        className="center"
        style={{ maxWidth: "800px", textWrap: "wrap", margin: "auto" }}
      >
        <span>
          {renewal.map((i) => i.topic).toString() === "تجديد جدارية"
            ? "تجديد"
            : "منح"}
        </span>{" "}
        رخصة مؤقتة للدكتور (
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
    </div>
  );
}
