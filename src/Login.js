import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Forms.css";

export default function Login() {
  const history = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (username === "" || password === "") {
      alert("Please fill all the fields");
    } else {
      try {
        console.log(username, password);
        const response = await axios.post(`http://127.0.0.1:4000/users/login`, {
          username: username,
          password: password,
        });
        if (response) {
          alert("Login successful");
          console.log(response.data);
          // console.log(response.data.user);
          // console.log(response.data.user.id);
          // console.log(response.data.user.role);
          console.log(localStorage);
          localStorage.setItem("userId", JSON.stringify(response.data.user.id));
          localStorage.setItem(
            "userRole",
            JSON.stringify(response.data.user.role)
          );
          localStorage.setItem("userToken", response.data.token);
          history("/Home");
        } else {
          alert("Login failed: " + response.message);
        }
      } catch (error) {
        console.error("There was an error logging in!", error);
        alert("Login failed: " + error.message);
      }
    }
  };

  return (
    <div className="login">
      <div
        className="loginDev"
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          padding: "20px",
          height: "600px",
          position: "relative",
        }}
      >
        <div style={{ padding: "20px" }}>
          <h1 style={{ margin: "5px", fontFamily: "cursive" }}>وزارة الصحة</h1>
          <h2
            style={{
              textAlign: "center",
              fontFamily: "cursive",
              margin: "2px",
            }}
          >
            قسم القطاع الصحي الخاص
          </h2>
          <h2
            style={{
              textAlign: "center",
              fontFamily: "cursive",
              margin: "2px",
              marginTop: "80px",
            }}
          >
            تسجيل الدخول
          </h2>
          <form style={{ margin: "20px" }}>
            <label htmlFor="username">اسم المستخدم</label>
            <input
              style={{ outline: "0.5px solid #0000003d" }}
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="اسم المستخدم"
            ></input>
            <label htmlFor="password">كلمة المرور</label>
            <input
              style={{ outline: "0.5px solid #0000003d" }}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
            ></input>
            <input
              type="submit"
              onClick={handleSubmit}
              value="تسجيل الدخول"
              style={{ position: "absolute", bottom: "120px" }}
            />
          </form>
        </div>
        <div>
          <img alt="" src="/aa.png" width="100%" height="100%"></img>
        </div>
      </div>
      <span className="log">
        شركة الجدار الناري لخدمات الأمن السيبراني للدعم والمساعدة:
        +9647838200050 +9647713366777
      </span>
      <span className="log1">
        جميع الحقوق محفوظة لوزارة الصحة قسم القطاع الطبي الخاص
      </span>
    </div>
  );
}
