// BookDisplay.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "./Forms.css";

const AttachedBook = () => {

  const fixedUrl = "http://127.0.0.1:4000";

  const pdfjsVersion = "3.11.174";
  const { id: Id } = useParams();
  const userToken = localStorage.getItem("userToken");

  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`${fixedUrl}/attached/${Id}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }
        const result = await response.json();
        setBookData(result.data.attachedDocument || []); // Ensure it's an array
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }, [Id, userToken]);

  const getFileType = (filePath) => {
    filePath = filePath.replace(/\\/g, "/");
    return filePath.split(".").pop().toLowerCase();
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
          <strong>رقم الملحق:</strong>{" "}
          {bookData.map((item) => (
            <span key={item.id}>{item.number}</span>
          ))}
        </p>
        <p>
          <strong>تاريخ الملحق:</strong>{" "}
          {bookData.map((item) => (
            <span key={item.id}>{item.date}</span>
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
      </div>
      <div className="book-preview" style={{ borderRadius: "40px" }}>
        <div className="book-preview-content">
          {bookData.map((item) => {
            const filePath =
              item.file_path === null
                ? "لا يوجد فايل"
                : `${fixedUrl}/${item.file_path.replace(/\\/g, "/")}`;
            const fileType = getFileType(filePath);

            return fileType === "pdf" ? (
              <Worker
                key={item.id}
                workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`}
              >
                <Viewer fileUrl={filePath} />
              </Worker>
            ) : (
              <img
                key={item.id}
                crossOrigin="anonymous"
                src={filePath}
                alt="Book Preview"
                width="100%"
                height="100%"
                style={{ borderRadius: "40px" }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AttachedBook;
