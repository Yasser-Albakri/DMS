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
        setBookData(result.data.doc);
        console.log(result);
        console.log(result.data.doc);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }, [Id]);

  return (
    <div className="book-container">
      <span className="step"></span>
      <div className="book-details" style={{ borderRadius: "40px" }}>
        <h2>{bookData.topic}</h2>
        <p>
          <strong>رقم البطاقة:</strong> {bookData.account_id}
        </p>
        <p>
          <strong>نوع الكتاب:</strong> {bookData.document_type}
        </p>
        <p>
          <strong>رقم الكتاب:</strong> {bookData.book_number}
        </p>
        <p>
          <strong>تاريخ الكتاب:</strong> {bookData.book_date}
        </p>
        <p>
          <strong>جهة الكتاب:</strong> {bookData.issuing_authority}
        </p>
        <p>
          <strong>رقم الوارد:</strong> {bookData.incoming_number}
        </p>
        <p>
          <strong>تاريخ الوارد:</strong> {bookData.incoming_date}
        </p>
        <p>
          <strong>ملاحظة:</strong> {bookData.note}
        </p>
        <form method="POST">
          <label>اضافة ملاحظة :</label>
          <input type="text" name="note" />
        </form>
        <div className="buttons">
          <button className="btn btn-primary">
            <Link
              to="/AddExtension"
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
        {/* <div className="book-preview-content">
                    {bookData.preview ? (
                    bookData.preview.type === 'application/pdf' ? (
                        <iframe src={bookData.preview.url} title="PDF Preview" width="100%" height="600px"></iframe>
                    ) : (
                        <img src={bookData.preview.url} alt="Book Preview" />
                    )
                    ) : (
                    <p>No preview available</p>
                    )}
                </div> */}
      </div>
    </div>
  );
};

export default BookRec;
