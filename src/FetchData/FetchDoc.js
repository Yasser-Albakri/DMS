import React from "react";
import './App.css'
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";


export default function FetchDoc () {
    const loca = useLocation();
    const [documents, setDocuments] = useState([0]);
    useEffect(() => {
        const fetchdocuments = async () => {
            try {
                const response = await fetch("http://127.0.0.1:4000/documents");
                const json = await response.json();
                setDocuments(json);
            } catch (error) {
                console.error(error);
            }
        };

        fetchdocuments();
    }, []);
    

    return (
        <table>
            <tbody>
                {documents.map((document) => (
                    <tr key={document.id}>
                        <td>{document.document_number}</td>
                        <td>{document.document_title}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}