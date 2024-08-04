import React, { useState, useEffect } from "react";
import "./App.css";
import "./Forms.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddSubBranch = () => {
  const userToken = localStorage.getItem("userToken");

  const [branch, setBranch] = useState([]);
  const history = useNavigate();

  const [currentStep] = useState(0);
  const [formData, setFormData] = useState({
    section: 0,
    branch: 0,
    name: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const navigate = useNavigate();
  const PrevPage = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:4000/branch`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }
        const result = await response.json();
        setBranch(result.data.branches);
        // console.log(result.data.branches);
        // console.log(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }, [userToken]);

  const renderBranch = () => {
    if (!Array.isArray(branch)) return null;

    const renderBran = branch.filter(
      (branch) => branch.sction === Number(formData.section)
    );

    return renderBran.map((Branch) => (
      <option key={Branch.id} value={Branch.id}>
        {Branch.name}
      </option>
    ));
  };

  //   useEffect(() => {
  //     const fetchBook = async () => {
  //       try {
  //         const response = await fetch(`http://127.0.0.1:4000/subBranch`, {
  //           headers: { Authorization: `Bearer ${userToken}` },
  //         });
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch book");
  //         }
  //         const result = await response.json();
  //         console.log(result.data);
  //         console.log(result);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     fetchBook();
  //   }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const url = id ? `http://127.0.0.1:4000/attached/${id}` : 'http://127.0.0.1:4000/attached';
    // const method = id ? 'PATCH' : 'POST';

    const data = new FormData();
    for (const key in formData) {
      if (key === "file" && formData[key] instanceof File) {
        data.append(key, formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:4000/subBranch`,
        {
          branch: formData.branch,
          name: formData.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response);
      console.log(formData);
      alert("تمت اضافة التصنيف الفرعي");
      history(`/Home`);
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const steps = [
    <div className="step" key="step1">
      <div className="form-group">
        <label htmlFor="section">الشعبة:</label>
        <select
          className="form-control"
          id="section"
          name="section"
          value={formData.section}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value={1}>الاجازات</option>
          <option value={2}>النفقة الخاصة</option>
          <option value={3}>الاستثمار الصحي الخاص</option>
          <option value={4}>الهندسية</option>
          <option value={5}>الاوراق</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="branch">التصنيف:</label>
        <select
          className="form-control"
          id="branch"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
        >
          <option value={0}></option>
          {renderBranch()}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="name"> التصنيف الفرعي :</label>
        <input
          type="text"
          className="form-control"
          id="name"
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
        <h2 className="text-center">اضافة تصنيف فرعي</h2>
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
            التصنيف الفرعي
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

export default AddSubBranch;
