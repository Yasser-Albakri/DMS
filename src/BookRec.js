// BookDisplay.js
import React from "react";
import "./Forms.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BookRec = ({ book }) => {
  const params = useParams();
  const Id = params.id;

  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:4000/income/${Id}`);
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

  const docType = bookData.map((item) => item.type);
  var typeBook = "";

  if (docType[0] === 1) {
    typeBook = "كتاب";
  } else if (docType[0] === 2) {
    typeBook = "مذكرة";
  } else if (docType[0] === 3) {
    typeBook = "طلب";
  }

  const file = bookData.map((item) => item.file_path);

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
          {bookData.map((item) => (
            <span key={item.id}>{typeBook}</span>
          ))}
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
          {file ? (
            file.type === "application/pdf" ? (
              <iframe
                src={file}
                title="PDF Preview"
                width="100%"
                height="600px"
              ></iframe>
            ) : (
              <img src={file} alt="Book Preview" />
            )
          ) : (
            <p>No preview available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookRec;
