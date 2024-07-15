import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Forms.css";

export default function Registration() {
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (fullName === "" || username === "" || password === "") {
            alert("Please fill all the fields");
        } else {
            try {
                const response = await fetch('http://127.0.0.1:4000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ fullName, username, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Registration successful");
                    history('/');
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="login">
            <div className="loginDev">
                <h1>التسجيل</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='fullName'>الاسم الكامل</label>
                    <input type="text" id="fullName" placeholder="الاسم الكامل" />
                    <label htmlFor='username'>اسم المستخدم</label>
                    <input type="text" id="username" placeholder="اسم المستخدم" />
                    <label htmlFor='password'>كلمة المرور</label>
                    <input type="password" id="password" placeholder="كلمة المرور" />
                    <input type="submit" value="Register" />
                </form>
                <Link to="/">هل لديك حساب بالفعل؟</Link>
            </div>
        </div>
    );
}
