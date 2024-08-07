import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import axios from "axios";

export default function AddMural() {
  const params = useParams();
  const Id = params.id;
  const userToken = localStorage.getItem("userToken");
  const [lastSubmitTime, setLastSubmitTime] = useState(null);

  const [bookData, setBookData] = useState([]);
  const [card, setCard] = useState([]);
  const [qr, setQr] = useState(null);
  const [date, setDate] = useState("");
  const [number, setNumber] = useState("");
  const [user_id, setUser_id] = useState([]);
  const [sign1, setSign1] = useState(`الصيدلاني
    عباس بدر الفرطوسي
    مدير قسم القطاع الصحي الخاص`);
  const [sign2, setSign2] = useState(`الدكتور
    هاني موسى العقابي
    الوكيل الفني لوزارة الصحة وكالة`);
  const [body, setBody] = useState(
    card.section_id === 1
      ? `تحية طيبة…..
حصلت الموافقة النهائية على منح اجازة ل() بموجب كتاب وزارة الصحة /  الكائن في محافظة  
استناد الى احكام قانون `
      : card.section_id === 2
      ? `استناداً الى الصلاحية المخولة لنا بموجب احكام قانون تأسيس المؤسسات الصحية الخاصة الاتحادي المرقم (25) لسنة 2015 تقرر :-
منح رخصة عمل مؤقتة للدكتور () / / الجنسية للعمل في ( / ) و خلال فتره الاقامة التي تمنح له `
      : `تحية طيبة…..
حصلت الموافقة النهائية على منح اجازة ل() بموجب كتاب وزارة الصحة /  الكائن في محافظة  
استناد الى احكام قانون `
  );

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
      if (bookData && bookData.map((i) => i.account_id)) {
        try {
          const response = await fetch(
            `http://127.0.0.1:4000/cards/${bookData.map((i) => i.account_id)}`,
            {
              headers: { Authorization: `Bearer ${userToken}` },
            }
          );
          if (!response.ok) {
            throw new Error(
              `Network response was not ok: ${response.statusText}`
            );
          }

          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            const text = await response.text();
            throw new Error(
              `Expected JSON, got ${contentType}. Response: ${text}`
            );
          }

          const result = await response.json();
          if (result.data && result.data.card) {
            setCard(result.data.card[0]);
          } else {
            throw new Error("Invalid response structure");
          }

          // console.log(result);
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
    };
    fetchBook();
  }, [Id, userToken, bookData]);

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

  const submit = () => {
    const currentTime = new Date().getTime();

    if (lastSubmitTime && currentTime - lastSubmitTime < 60000) {
      alert("Please wait a minute before submitting again.");
      return;
    }

    const formData = new FormData();
    formData.append("topic", "منح جدارية");
    formData.append("number", Number(number));
    formData.append("permit_id", Number(Id));
    formData.append("user_id", Number(user_id.id));
    formData.append("date", date);
    formData.append("body", body);
    console.log(user_id.id);

    axios
      .post(
        "http://127.0.0.1:4000/renewal",
        {
          topic: "منح جدارية",
          number: Number(number),
          permit_id: Number(Id),
          user_id: Number(user_id.id),
          date: date,
          body: body,
          sign1: sign1,
          sign2: sign2,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        alert("تمت اضافة الجدارية بنجاح");
        console.log(response);
        setLastSubmitTime(currentTime); // Update the last submit time
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("حصل خطأ في الارسال الرجاء المحاولة مجددا");
      });
  };

  return (
    <div className="Mural step" id="content">
      <div className="MurInf">
        <h4 className="center">جمهورية العراق</h4>
        <h4 className="center"> وزارة الصحة</h4>
        <h4 className="center">قسم القطاع الصحي الخاص</h4>
        <form>
          العدد :
          <input
            type="text"
            name="number"
            id="number"
            onChange={(e) => setNumber(e.target.value)}
            style={{ backgroundColor: "#869dce" }}
          />
          <label htmlFor="date">التاريخ</label>
          <input
            type="date"
            name="date"
            id="date"
            onChange={(e) => setDate(e.target.value)}
            style={{ backgroundColor: "#869dce" }}
          />
        </form>
      </div>
      <div className="MurInf1">
        <h4>كوماري عيراق</h4>
        <h4>وه زارتي ته ندروسى</h4>
        <h4>نووسيكه ى وةزير</h4>
        <h4>بة شي كة رتي ندورسى نايبة ت</h4>
      </div>
      <img className="Qr" alt="Qr Code" src={qr}></img>
      <h3
        className="center"
        style={
          card.section_id === 1 ? { display: "block" } : { display: "none" }
        }
      >
        شهادة جدارية
      </h3>
      <h3
        className="center"
        style={
          card.section_id === 1 ? { display: "block" } : { display: "none" }
        }
      >
        الاسم/
        <input
          type="text"
          style={{
            display: "inline",
            width: "300px",
            backgroundColor: "#869dce",
          }}
        />
      </h3>
      <h3 className="center">
        <span>م/</span>منح اجازة
      </h3>
      <h3
        className="center"
        style={
          card.section_id === 1 || card.section_id === 3
            ? { display: "none" }
            : { display: "block" }
        }
      >
        رخصة عمل مؤقتة
      </h3>
      <h4 className="center">
        <textarea
          name="body"
          id="body"
          onChange={(e) => setBody(e.target.value)}
          value={body}
        ></textarea>
      </h4>
      <div className="MurInf2">
        <textarea
          name="sign1"
          id="sign1"
          onChange={(e) => setSign1(e.target.value)}
          value={sign1}
        ></textarea>
      </div>
      <div className="MurInf1">
        <textarea
          name="sign2"
          id="sign2"
          onChange={(e) => setSign2(e.target.value)}
          value={sign2}
        ></textarea>
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
