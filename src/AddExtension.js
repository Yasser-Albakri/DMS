import React, { useState, useEffect } from "react";
import "./App.css";
import "./Forms.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddExtension = () => {
  const history = useNavigate();
  const params = useParams();
  const id = params.id;
  const userToken = localStorage.getItem("userToken");
  const [user_id, setUser_id] = useState([]);
  const [errors, setErrors] = useState({});

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
        console.log(result);
        // console.log(result.data.outgoing);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }, [userToken]);

  const [currentStep] = useState(0);
  const [formData, setFormData] = useState({
    file: "",
    topic: "",
    inc_id: id,
    date: "",
    number: "",
    user_id: null,
  });

  // useEffect (() => {
  //     const fetchAttach = async () => {
  //         try {
  //             const response = await fetch(`http://127.0.0.1:4000/attached/${id}`,
  //                 {
  //                     headers: {
  //                         "Authorization": `Bearer ${userToken}`
  //                     }
  //                 }
  //             );
  //             if (!response.ok) {
  //                 throw new Error('Failed to fetch book');
  //             }
  //             const result = await response.json();
  //             setFormData(result.data.attachedDocuments[0]);
  //             console.log(result);
  //             console.log(result.data);
  //         } catch (error) {
  //             console.error(error);
  //         }
  //     }; fetchAttach();
  // }, []);

  const [filePreview, setFilePreview] = useState(null);

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

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      user_id: user_id.id || null,
    }));
  }, [user_id]);

  const navigate = useNavigate();
  const PrevPage = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const url = id ? `http://127.0.0.1:4000/attached/${id}` : 'http://127.0.0.1:4000/attached';
    // const method = id ? 'PATCH' : 'POST';

    const newErrors = {};

    if (!formData.file) {
      newErrors.file = "الملف مطلوب";
    }

    setErrors(newErrors);

    const data = new FormData();
    for (const key in formData) {
      if (key === "file" && formData[key] instanceof File) {
        data.append(key, formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    }
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          `http://127.0.0.1:4000/attached`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log(response);
        console.log(formData);
        alert("Extension added successfully");
        history(`/BookRec/${id}`);
      } catch (error) {
        console.error("Error:", error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const steps = [
    <div className="step" key="step1">
      <div className="form-group">
        <label htmlFor="file">الملحق:</label>
        <input
          type="file"
          className="form-control"
          id="file"
          onChange={handleChange}
        />
        {errors.file && (
          <p style={{ color: "red", fontSize: "10px", margin: "0px" }}>
            {errors.file}
          </p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="topic">موضوع الملحق:</label>
        <input
          type="text"
          className="form-control"
          id="topic"
          value={formData.topic}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="number">رقم الملحق:</label>
        <input
          type="inc_id"
          className="form-control"
          id="number"
          value={formData.number}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">تاريخ الملحق:</label>
        <input
          type="date"
          className="form-control"
          id="date"
          value={formData.date}
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
        <h2 className="text-center">اضافة ملحق</h2>
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
                ? { fontWeight: "bold", marginRight: "60px" }
                : {}
            }
          >
            معلومات الملحق
          </span>
        </div>
        {steps[currentStep]}
      </form>
      <div className="disBook">
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
      </div>
    </div>
  );
};

export default AddExtension;
