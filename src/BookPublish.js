// BookDisplay.js
import React from "react";
import "./Forms.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Worker} from '@react-pdf-viewer/core';
import {Viewer} from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const BookPublish = ({ book }) => {
  const fixedUrl = "http://127.0.0.1:4000";
  
  const pdfjsVersion = "3.11.174";
  const params = useParams();
  const Id = params.id;
  const userToken = localStorage.getItem("userToken");

  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`${fixedUrl}/outgoing/${Id}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }
        const result = await response.json();
        setBookData(result.data.outgoing);
        console.log(result);
        console.log(result.data.outgoing);
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

  const docType = bookData.map((item) => item.type);
  var typeBook = "";

  if (docType[0] === 1) {
    typeBook = "كتاب";
  } else if (docType[0] === 2) {
    typeBook = "مذكرة";
  } else if (docType[0] === 3) {
    typeBook = "اجازة";
  }

  console.log(bookData);

  return (
    <div className="book-container">
      <span className="step"></span>
      <div className="book-details" style={{ borderRadius: "40px" }}>
        <h2>
          {bookData.map((item) => (
            <span key={item.id}>{item.subject}</span>
          ))}
        </h2>
        <p>
          <strong>رقم البطاقة:</strong>{" "}
          {bookData.map((item) => (
            <span key={item.id}>{item.account_id}</span>
          ))}
        </p>
        <p>
          <strong>نوع الكتاب:</strong> {typeBook}
        </p>
        <p>
          <strong>رقم الكتاب:</strong>{" "}
          {bookData.map((item) => (
            <span key={item.id}>{item.document_number}</span>
          ))}
        </p>
        <p>
          <strong>تاريخ الكتاب:</strong>{" "}
          {bookData.map((item) => (
            <span key={item.id}>{item.document_date}</span>
          ))}
        </p>
        <p>
          <strong>جهة المنفذة:</strong>{" "}
          {bookData.map((item) => (
            <span key={item.id}>{item.executing_uthority}</span>
          ))}
        </p>
        <p>
          <strong>الجهة الموجه لها:</strong>{" "}
          {bookData.map((item) => (
            <span key={item.id}>{item.addressed_entity}</span>
          ))}
        </p>
        <p>
          <strong>اخر تجديد:</strong>{" "}
          {bookData.map((item) => (
            <span key={item.id}>{item.last_renewal}</span>
          ))}
        </p>
        <p>
          <strong>حالة التجديد:</strong>{" "}
          {bookData.map((item) => (
            <span key={item.id}>{item.leave_status}</span>
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
          <input type="submit" value="Submit" className="btn btn-success" />
        </form>
        <div className="buttons">
          <button className="btn btn-primary">
            <Link
              to={`/AddMural/${Id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              اضافة جدارية
            </Link>
          </button>
          <button className="btn btn-secondary">
            <Link
              to={docType[0] === 3 ? `/AddVacation/${Id}` : `/AddBookPublished/${Id}`}
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
          {bookData.map((item) => {
            const filePath = item.file_path === null
            ? 'لا يوجد فايل'
            : `${fixedUrl}/${item.file_path.replace(/\\/g, "/")}`;
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
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookPublish;
