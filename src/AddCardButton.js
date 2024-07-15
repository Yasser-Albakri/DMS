import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function AddCardButton () {
    return (
        <Link to="/AddCard">
            <button className="add-card-button">اضافة بطاقة</button>
        </Link>
    )
}