import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import "./Forms.css";

const AddBook = () => {


  const { id : Id } = useParams();
  const navigate = useNavigate();
  const userToken = localStorage.getItem('userToken');

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    file: null,
    account_id: null,
    type: 1,
    book_number: "",
    book_date: "",
    issuing_authority: "",
    topic: "",
    incoming_number: "",
    referral: "",
    section: "",
    user_id: 0,
    note: "",
    incoming_date: "",
  });

  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (Id) {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:4000/income/${Id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }
        const result = await response.json();
        setFormData(result.data.incoming[0]);
        // console.log(result);
        console.log(result.data.incoming);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }
  }, [Id]);

  const handleChange = (e) => {
    const { id, value, files, name } = e.target;
    if (files) {
      const file = files[0];
      setFormData({
        ...formData,
        file: file,
      });

      const fileURL = URL.createObjectURL(file);
      if (file.type === "application/pdf" || file.type.startsWith("image/")) {
        setFilePreview(fileURL);
      } else {
        setFilePreview(null);
      }
    } else if (name === "referral") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleRemoveFile = () => {
    setFormData({
      ...formData,
      file: null,
    });
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = Id ? `http://127.0.0.1:4000/income/${Id}` : `http://127.0.0.1:4000/income`;
    const method = Id ? 'PATCH' : 'POST';
  
    const data = new FormData();
    for (const key in formData) {
      if (key === "file" && formData[key] instanceof File) {
        data.append(key, formData[key]); // Ensure this line is appending 'file'
      } else {
        data.append(key, formData[key]);
      }
    }
  
    try {
      const response = await axios({
        method: method,
        url: url,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log(response.data);
      console.log(data);
  
      navigate("/BookReceived"); // Adjust the path to where you want to navigate after success
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      alert(`Error: ${error.message}`);
    }
  };
  

  const steps = [
    <div className="step" key="step1">
      <div className="form-group one">
        <label htmlFor="file">الكتاب:</label>
        <input
          type="file"
          className="form-control"
          ref={fileInputRef}
          id="file"
          name="file"
          onChange={handleChange}
        />
        {formData.file && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleRemoveFile}
          >
            Remove File
          </button>
        )}
      </div>
      <div className="form-group one">
        <label htmlFor="account_id">تسلسل بطاقة:</label>
        <input
          type="text"
          className="form-control"
          id="account_id"
          name="account_id"
          value={formData.account_id}
          onChange={handleChange}
        />
      </div>
      <div className="form-group one">
        <label htmlFor="section">الشعبة:</label>
        <select
          className="form-control"
          id="section"
          name="section"
          value={formData.section}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="الاجازات">الاجازات</option>
          <option value="النفقة الخاصة">النفقة الخاصة</option>
          <option value="الاستثمار الصحي الخاص">الاستثمار الصحي الخاص</option>
          <option value="الهندسية">الهندسية</option>
          <option value="الاوراق">الاوراق</option>
        </select>
      </div>
      <div className="form-group one">
        <label htmlFor="type">نوع الكتاب:</label>
        <select
          className="form-control"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value={1}>كتاب</option>
          <option value={2}>مذكرة</option>
          <option value={3}>طلب</option>
        </select>
      </div>
      <div className="form-group one">
        <label htmlFor="book_number">رقم الكتاب:</label>
        <input
          type="text"
          className="form-control"
          id="book_number"
          name="book_number"
          value={formData.book_number}
          onChange={handleChange}
        />
      </div>
      <div className="form-group one">
        <label htmlFor="book_date">تاريخ الكتاب:</label>
        <input
          type="text"
          className="form-control"
          id="book_date"
          name="book_date"
          value={formData.book_date}
          onChange={handleChange}
        />
      </div>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => navigate(-1)}
      >
        رجوع
      </button>
      <button type="button" className="btn btn-primary" onClick={nextStep}>
        التالي
      </button>
    </div>,
    <div className="step" key="step2">
      <div className="form-group">
        <label htmlFor="issuing_authority">جهة الكتاب:</label>
        <input
          type="text"
          className="form-control"
          id="issuing_authority"
          name="issuing_authority"
          value={formData.issuing_authority}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="topic">موضوع الكتاب:</label>
        <input
          type="text"
          className="form-control"
          id="topic"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="incoming_number">رقم الوارد:</label>
        <input
          type="number"
          className="form-control"
          id="incoming_number"
          name="incoming_number"
          value={formData.incoming_number}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="incoming_date">تاريخ الوارد:</label>
        <input
          type="text"
          className="form-control"
          id="incoming_date"
          name="incoming_date"
          value={formData.incoming_date}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>الاحالة:</label>
        <div>
          <input
            type="radio"
            name="referral"
            value="مدير القسم"
            checked={formData.referral === "مدير القسم"}
            onChange={handleChange}
          />
          <label>مدير القسم</label>
          <input
            type="radio"
            name="referral"
            value="معاون مدير القسم"
            checked={formData.referral === "معاون مدير القسم"}
            onChange={handleChange}
          />
          <label>معاون مدير القسم</label>
        </div>
      </div>
      <button type="button" className="btn btn-secondary" onClick={prevStep}>
        رجوع
      </button>
      <button type="submit" onClick={handleSubmit} className="btn btn-success">
        حفظ
      </button>
    </div>,
  ];

  return (
    <div className="container">
      <form action="" method="post">
        <h2 className="text-center">
          {Id ? "تعديل الكتاب" : "اضافة كتاب وارد جديد"}
        </h2>
        <div style={{ direction: "ltr", textAlign: "center" }}>
          {steps.map((_, index) => (
            <div className="NumSt" key={index}>
              <div
                className={`Num ${index <= 0 ? "aft" : ""}`}
                style={
                  index === currentStep
                    ? { backgroundColor: "#1072E4", fontWeight: "bold" }
                    : {}
                }
              >
                {index + 1}
              </div>
            </div>
          ))}
        </div>
        <div className="inf" style={{ textAlign: "center" }}>
          <span
            style={
              currentStep === 1
                ? { fontWeight: "bold", marginLeft: "50px" }
                : {}
            }
          >
            معلومات اخرى
          </span>
          <span
            style={
              currentStep === 0
                ? { fontWeight: "bold", marginRight: "60px" }
                : {}
            }
          >
            معلومات الكتاب
          </span>
        </div>
        {steps[currentStep]}
      </form>
      <div className="disBook">
        {filePreview &&
          formData.file && (formData.file.type === "application/pdf" ? (
            <iframe
              src={filePreview}
              title="PDF Preview"
              width="100%"
              height="600px"
            ></iframe>
          ) : (
            <img src={filePreview} alt="File Preview" />
          ))}
      </div>
    </div>
  );
};

export default AddBook;
