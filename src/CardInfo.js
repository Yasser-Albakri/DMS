import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./App.css";

export default function CardInfo() {
  const params = useParams();
  const id = params.id;
  const userToken = localStorage.getItem('userToken');
  const fixedUrl = "http://127.0.0.1:4000";

  const [card, setCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(`${fixedUrl}/cards/${id}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`
            }
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setCard(result.data.card);
        console.log(result);
        console.log(result.data.card);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCard();
  }, [id]);

  return (
    <div className="cardInfo">
      <div className="infor" style={{ position: "relative" }}>
        <h3 style={{ display: "inline-flex", alignItems: "center" }}>
          <img
            alt=""
            src="/aa.png"
            style={{
              width: "150px",
              height: "150px",
              position: "absolute",
              left: "44%",
              zIndex: "-1",
            }}
          />
          <p>وزارة الصحة</p>
        </h3>
        <h3 className="inlinBlock left">قسم القطاع</h3>
        <h3 className="inlinBlock leftB">الصحي الخاص</h3>
        <h3 className="center">استمارة اصدار/تجديد اجازة</h3>
      </div>
      <hr />
      <div className="personalInformation">
        <h3>معلومات مقدم الطلب</h3>
        <p>
          <strong>التسلسل :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.id}</span>
          ))}
        </p>
        <p>
          <strong>الاسم الكامل :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.fullname}</span>
          ))}
        </p>
        <p>
          <strong>اسم الام :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.mother_name}</span>
          ))}
        </p>
        <p>
          <strong>رقم الهاتف :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.phone}</span>
          ))}
        </p>
        <p>
          <strong>الجنسية :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.nationality}</span>
          ))}
        </p>
        <p>
          <strong>الموقف الوظيفي :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.job_position}</span>
          ))}
        </p>
        <p>
          <strong>المحافظة :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.governorate}</span>
          ))}
        </p>
        <p>
          <strong>العنوان :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.address}</span>
          ))}
        </p>
        {/* <p><strong>المستمسكات :</strong>{card.id_card_front}</p> */}
      </div>
      <hr />
      <div className="organizInfo">
        <h3>معلومات المؤسسة</h3>
        <p>
          <strong>نوع المؤسسة :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.type}</span>
          ))}
        </p>
        <p>
          <strong>اسم المؤسسة :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.company_name}</span>
          ))}
        </p>
        <p>
          <strong>اسم المدير الفني :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.technical_manager}</span>
          ))}
        </p>
        <p>
          <strong>اسم المدير الاداري :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.administrative_manager}</span>
          ))}
        </p>
        <p>
          <strong>مساحة المؤسسة :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.area}</span>
          ))}
        </p>
        <p>
          <strong>عدد السعة السريرية :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.bed_capacity}</span>
          ))}
        </p>
        <p>
          <strong>عدد الاقسام و الوحدات فيها :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.number_departments}</span>
          ))}
        </p>
        <p>
          <strong>التصنيف :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.branch}</span>
          ))}
        </p>
        <p>
          <strong>التصنيف الفرعي :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.sub_branch}</span>
          ))}
        </p>
      </div>
      <hr />
      <div className="doctorInfo">
        <h3>معلومات الطبيب المشرف</h3>
        <p>
          <strong>اسم الطبيب المشرف :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.name_doctor}</span>
          ))}
        </p>
        <p>
          <strong>اختصاص الطبيب :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.doctor_specialty}</span>
          ))}
        </p>
        <p>
          <strong>محل اشتغاله :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.place_work}</span>
          ))}
        </p>
        <p>
          <strong>يوجد لديه عيادة :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.clinic}</span>
          ))}
        </p>
        <p>
          <strong>هوية النقابة :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.union_path}</span>
          ))}
        </p>
      </div>
      <hr />
      <div className="vacation">
        <h3>الاجازة</h3>
        <p>
          <strong>رقم كتاب منح الاجازة :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.book_number}</span>
          ))}
        </p>
        <p>
          <strong>تاريخ كتاب منح الاجازة :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.book_date}</span>
          ))}
        </p>
        <p>
          <strong>اخر تجديد :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.latest_renewal}</span>
          ))}
        </p>
        <p>
          <strong>التجديد :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.renewal}</span>
          ))}
        </p>
        <p>
          <strong>رقم الاجازة الاستثمارية :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.ipn}</span>
          ))}
        </p>
        <p>
          <strong>ملاحظة :</strong>
          {card.map((item) => (
            <span key={item.accunt_id}>{item.note}</span>
          ))}
        </p>
      </div>
      <span className="log">.Firewall Qi co</span>
      <span className="log1">
        جميع الحقوق محفوظة لوزارة الصحة قسم القطاع الطبي الخاص
      </span>
    </div>
  );
}
