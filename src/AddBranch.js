import React, { useState } from "react";
import "./App.css";
import "./Forms.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBranch = () => {
  const history = useNavigate();
  const userToken = localStorage.getItem("userToken");

  const [currentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    sction: null,
  });

  const handleChange = (e) => {
    const { id, value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const PrevPage = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const data = new FormData();
    // for (const key in formData) {
    //   data.append(key, formData[key]);
    // }

    // for (let [key, value] of data.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    try {
      const response = await axios.post(
        `http://127.0.0.1:4000/branch`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log(response);
      console.log(formData);

      alert("تمت اضافة التصنيف");
      history("/Home");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add card. Please try again.");
      console.log(formData);
    }
  };

  const steps = [
    <div className="step" key="step1">
      <div className="form-group">
        <label htmlFor="sction">الشعبة:</label>
        <select
          className="form-control"
          id="sction"
          name="sction"
          value={formData.sction}
          onChange={handleChange}
        >
          <option value={0}></option>
          <option value={1}>الاجازات</option>
          <option value={2}>النفقة الخاصة</option>
          <option value={3}>الاستثمار الصحي الخاص</option>
          <option value={4}>الهندسية</option>
          <option value={5}>الاوراق</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="name">اسم التصنيف:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <button type="button" className="btn btn-secondary" onClick={PrevPage}>
        رجوع
      </button>
      <button type="submit" className="btn btn-success" onClick={handleSubmit}>
        حفظ
      </button>
    </div>,
  ];

  return (
    <div className="container">
      <form>
        <h2 className="text-center">اضافة تصنيف</h2>
        <div style={{ direction: "ltr", textAlign: "center" }}>
          {steps.map((_, index) => (
            <div className="NumSt" key={index}>
              <div
                className={`Num`}
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
              currentStep === 0
                ? { fontWeight: "bold", marginRight: "40px" }
                : {}
            }
          >
            التصنيف
          </span>
        </div>
        {steps[currentStep]}
      </form>
      {/* <div className="disBook">
        {filePreview &&
          (formData.file.type === "application/pdf" ? (
            <iframe
              src={filePreview}
              title="PDF Preview"
              width="100%"
              height="600px"
            ></iframe>
          ) : (
            <img src={filePreview} alt="document Preview" />
          ))}
      </div> */}
    </div>
  );
};

export default AddBranch;
