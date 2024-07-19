import React from "react";
import "./Forms.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Worker} from '@react-pdf-viewer/core';
import {Viewer} from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const BookRec = () => {

  const pdfjsVersion = "3.11.174";
  const params = useParams();
  const Id = params.id;
  const userToken = localStorage.getItem("userToken");

  const [bookData, setBookData] = useState([]);

  useEffect(() => {
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
        setBookData(result.data.incoming);
        console.log(result);
        console.log(result.data.incoming);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }, [Id]);

  const getFileType = (filePath) => {
    filePath = filePath.replace(/\\/g, "/"); // Convert backslashes to forward slashes
    return filePath.split(".").pop().toLowerCase(); // Extract and return the file extension
  };

  return (
    <div className="book-container">
      <span className="step"></span>
      <div className="book-details" style={{ borderRadius: "40px" }}>
        <h2>
          {bookData.map((item) => (
            <span key={item.id}>{item.topic}</span>
          ))}
        </h2>
        <p>
          <strong>رقم البطاقة:</strong>{" "}
          {bookData.map((item) => (
            <span key={item.id}>{item.account_id}</span>
          ))}
        </p>
        <p>
          <strong>نوع الكتاب:</strong>{" "}
          {bookData.map((item) => {
            const typeBook =
              item.type === 1
                ? "كتاب"
                : item.type === 2
                ? "مذكرة"
                : item.type === 3
                ? "طلب"
                : "غير معروف";
            return <span key={item.id}>{typeBook}</span>;
          })}
        </p>
        <p>
          <strong>رقم الكتاب:</strong>{" "}
          {bookData.map((item) => (
            <span key={item.id}>{item.book_number}</span>
          ))}
        </p>
        <p>
          <strong>تاريخ الكتاب:</strong>{" "}
          {bookData.map((item) => (
            <span key={item.id}>{item.book_date}</span>
          ))}
        </p>
        <p>
          <strong>جهة الكتاب:</strong>{" "}
          {bookData.map((item) => (
            <span key={item.id}>{item.issuing_authority}</span>
          ))}
        </p>
        <p>
          <strong>رقم الوارد:</strong>{" "}
          {bookData.map((item) => (
            <span key={item.id}>{item.incoming_number}</span>
          ))}
        </p>
        <p>
          <strong>تاريخ الوارد:</strong>{" "}
          {bookData.map((item) => (
            <span key={item.id}>{item.incoming_date}</span>
          ))}
        </p>
        <p>
          <strong>ملاحظة:</strong>{" "}
          {bookData.map((item) => (
            <span key={item.id}>{item.note}</span>
          ))}
        </p>
        <form method="POST">
          <label>اضافة ملاحظة :</label>
          <input type="text" name="note" />
          <input type="submit" value="Submit" />
        </form>
        <div className="buttons">
          <button className="btn btn-primary">
            <Link
              to={`/AddExtension/${Id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              اضافة ملحق
            </Link>
          </button>
          <button className="btn btn-secondary">
            <Link
              to={`/AddBook/${Id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              تعديل
            </Link>
          </button>
        </div>
      </div>
      <div className="book-preview" style={{ borderRadius: "40px" }}>
        {/* Book preview area, e.g., image or PDF */}
        <div className="book-preview-content">
          {bookData.map((item) => { const filePath = item.file_path === null
            ? 'لا يوجد فايل'
            : `http://127.0.0.1:4000/${item.file_path.replace(/\\/g, "/")}`;
            const fileType = getFileType(filePath);

            return fileType === "pdf" ? (
              <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`}>
                <Viewer fileUrl={filePath} />
              </Worker>
            ) : (
              <img
                crossOrigin="anonymous"
                key={item.id}
                src={filePath}
                alt="Book Preview"
                width="100%"
                height="100%"
                borderRadius="40px"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookRec;
