// BookDisplay.js
import React from 'react';
import './Forms.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const BookPublish = ({ book }) => {
    const params = useParams();
    const Id = params.id;
    const userToken = localStorage.getItem('userToken');


    const [bookData, setBookData] = useState([]);



    useEffect (() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:4000/outgoing/${Id}` , 
                    { headers: { Authorization: `Bearer ${userToken}` } }
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch book');
                }
                const result = await response.json();
                setBookData(result.data.outgoing);
                console.log(result);
                console.log(result.data.outgoing);
            } catch (error) {
                console.error(error);
            }
        }; fetchBook();
    }, [Id]);


    const docType = bookData.map((item) => item.type);
  var typeBook = "";

  if (docType[0] === 1) {
    typeBook = "كتاب";
  } else if (docType[0] === 2) {
    typeBook = "مذكرة";
  } else if (docType[0] === 3) {
    typeBook = "اجازة";
  }
    



    return (
        <div className="book-container">
        <span className='step'></span>
            <div className="book-details" style={{ borderRadius: '40px' }}>
            <h2>{bookData.map((item) => (<span key={item.id}>{item.subject}</span>))}</h2>
                <p><strong>رقم البطاقة:</strong> {bookData.map((item) => (<span key={item.id}>{item.account_id}</span>))}</p>
                <p><strong>نوع الكتاب:</strong> {typeBook}</p>
                <p><strong>رقم الكتاب:</strong> {bookData.map((item) => (<span key={item.id}>{item.document_number}</span>))}</p>
                <p><strong>تاريخ الكتاب:</strong> {bookData.map((item) => (<span key={item.id}>{item.document_date}</span>))}</p>
                <p><strong>جهة المنفذة:</strong> {bookData.map((item) => (<span key={item.id}>{item.executing_uthority}</span>))}</p>
                <p><strong>الجهة الموجه لها:</strong> {bookData.map((item) => (<span key={item.id}>{item.addressed_entity}</span>))}</p>
                <p><strong>اخر تجديد:</strong> {bookData.map((item) => (<span key={item.id}>{item.last_renewal}</span>))}</p>
                <p><strong>حالة التجديد:</strong> {bookData.map((item) => (<span key={item.id}>{item.leave_status}</span>))}</p>
                <p><strong>ملاحظة:</strong> {bookData.map((item) => (<span key={item.id}>{item.note}</span>))}</p>
                <form method="POST">
                    <label>اضافة ملاحظة :</label>
                    <input type="text" name="note" />
                    <input type='submit' value='Submit' className='btn btn-success' />
                </form>
                <div className="buttons">
                    <button className="btn btn-primary"><Link to={`/AddMural/${Id}`} style={{textDecoration:"none", color:"white"}}>اضافة جدارية</Link></button>
                    <button className="btn btn-secondary"><Link to={`//${Id}`} style={{textDecoration:"none", color:"white"}}>تعديل</Link></button>
                </div>
            </div>
            <div className="book-preview" style={{ borderRadius: '40px' }}>
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

export default BookPublish;
