import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./App.css";

export default function Mural() {
  const params = useParams();
  const Id = params.id;
  const userToken = localStorage.getItem("userToken");

  const [bookData, setBookData] = useState([]);
  const [card, setCard] = useState([]);
  const [qr, setQr] = useState(null);
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
        // console.log("Renewal Data:", result.data.renewal); // Log renewal data
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
        // console.log("Book Data:", result.data.outgoing); // Log book data
      } catch (error) {
        console.error(error);
      }
    };
    if (renewal.length > 0) {
      fetchBook();
    }
  }, [Id, userToken, renewal]);

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
          // console.log("Card Data:", result.data.card); // Log card data
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
        const permit_id = renewal.map((i) => i.permit_id);
        if (!permit_id) {
          throw new Error("No book ID provided");
        }
        const response = await fetch(
          `http://127.0.0.1:4000/generateQR/${permit_id}`,
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
        console.log(response);
        // console.log(response.url);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }, [userToken, renewal]);

  return (
    <div className="Mural step" id="content">
      <div className="MurInf">
        <h4 className="center">جمهورية العراق</h4>
        <h4 className="center"> وزارة الصحة</h4>
        <h4 className="center">قسم القطاع الصحي الخاص</h4>
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
      <img className="Qr" alt="Qr Code" src={qr} style={{ top: "30%" }}></img>
      <h3
        className="center"
        style={
          card.map((item) => item.section_id).toString() === "1"
            ? { display: "block" }
            : { display: "none" }
        }
      >
        (شهادة جدارية)
      </h3>
      <h3
        className="center"
        style={
          card.map((i) => i.section_id).toString() === "1"
            ? { display: "block" }
            : { display: "none" }
        }
      >
        الاسم/
        <h3
          style={{
            width: "300px",
            display: "inline-block",
            textAlign: "start",
          }}
        >
          {card.map((i) => i.fullname)}
        </h3>
      </h3>
      <h3 className="center">
        {renewal.map((i) => i.topic).toString() === "تجديد جدارية"
          ? "تجديد اجازة"
          : "منح اجازة"}
      </h3>
      <h3
        className="center"
        style={
          card.map((i) => i.section_id).toString() === "1" ||
          card.map((i) => i.section_id).toString() === "3"
            ? { display: "none" }
            : { display: "block" }
        }
      >
        رخصة عمل مؤقتة
      </h3>
      <h4
        className="center"
        style={{ maxWidth: "800px", margin: "auto" }}
        dangerouslySetInnerHTML={{
          __html: renewal
            .map((i) => i.body)
            .join("")
            .replace(/\n/g, "<br>"),
        }}
      >
        {/* {renewal.map((i) => i.body)} */}
      </h4>
      <div className="MurInf2" style={{ maxWidth: "250px" }}>
        <h4
          dangerouslySetInnerHTML={{
            __html: renewal
              .map((i) => i.sign1)
              .join("")
              .replace(/\n/g, "<br>"),
          }}
        >
          {/* {renewal.map((i) => i.sign1)} */}
        </h4>
      </div>
      <div className="MurInf1" style={{ maxWidth: "250px", marginTop: "80px" }}>
        <h4
          dangerouslySetInnerHTML={{
            __html: renewal
              .map((i) => i.sign2)
              .join("")
              .replace(/\n/g, "<br>"),
          }}
        >
          {/*{renewal.map((i) => i.sign2)}*/}
        </h4>
      </div>
    </div>
  );
}
