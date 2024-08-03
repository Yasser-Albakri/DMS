import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";

export default function NavBar() {
  const loca = useLocation();

  return (
    <nav>
      <ul className="ul">
        {" "}
        <h3>البريد المركزي</h3>
        <hr />
        <li
          className="flex"
          style={
            loca.pathname === "/Home"
              ? { backgroundColor: "black", borderRadius: "40px" }
              : {}
          }
        >
          <img
            alt=""
            src="/dashboard.png"
            style={
              loca.pathname === "/Home" ? { backgroundColor: "white" } : {}
            }
          />
          <Link
            to="/Home"
            style={loca.pathname === "/Home" ? { color: "white" } : {}}
          >
            الرئيسة
          </Link>
        </li>
        <li
          className="flex"
          style={
            loca.pathname === "/Cards"
              ? { backgroundColor: "black", borderRadius: "40px" }
              : {}
          }
        >
          <img
            alt=""
            src="/card.png"
            style={
              loca.pathname === "/Cards" ? { backgroundColor: "white" } : {}
            }
          />
          <Link
            to="/Cards"
            style={loca.pathname === "/Cards" ? { color: "white" } : {}}
          >
            البطاقات
          </Link>
        </li>
        <li>
          <p
            style={
              loca.pathname === "/BookReceived"
                ? {
                    backgroundColor: "black",
                    borderRadius: "40px",
                    padding: "10px",
                  }
                : {}
            }
          >
            <img
              alt=""
              src="/boolRec.png"
              style={
                loca.pathname === "/BookReceived"
                  ? { backgroundColor: "white" }
                  : {}
              }
            />
            <Link
              to="/BookReceived"
              style={
                loca.pathname === "/BookReceived" ? { color: "white" } : {}
              }
            >
              الكتب الواردة
            </Link>
          </p>
          <ul
            id="ul1"
            style={
              loca.pathname === "/BookReceived"
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <li>
              <img src="./book.png" alt="" />
              <Link to="/AddBook">اضافة كتاب</Link>
            </li>
            <li>
              <img src="./note.png" alt="" />
              <Link to="/AddBook">اضافة مذكرة</Link>
            </li>
            <li>
              <img src="./req.png" alt="" />
              <Link to="/AddBook">اضافة طلب</Link>
            </li>
          </ul>
        </li>
        <li>
          <p
            style={
              loca.pathname === "/PublishedBook"
                ? {
                    backgroundColor: "black",
                    borderRadius: "40px",
                    padding: "10px",
                  }
                : {}
            }
          >
            <img
              alt=""
              src="/publishBook.png"
              style={
                loca.pathname === "/PublishedBook"
                  ? { backgroundColor: "white" }
                  : {}
              }
            />
            <Link
              to="/PublishedBook"
              style={
                loca.pathname === "/PublishedBook" ? { color: "white" } : {}
              }
            >
              الكتب الصادرة
            </Link>
          </p>
          <ul
            id="ul2"
            style={
              loca.pathname === "/PublishedBook"
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <li>
              <img src="./book.png" alt="" />
              <Link to="/AddBookPublished">اضافة كتاب</Link>
            </li>
            <li>
              <img src="./note.png" alt="" />
              <Link to="/AddBookPublished">اضافة مذكرة</Link>
            </li>
          </ul>
        </li>
        <li
          style={
            loca.pathname === "/Reports"
              ? { backgroundColor: "black", borderRadius: "40px" }
              : {}
          }
        >
          <img
            alt=""
            src="/report.png"
            style={
              loca.pathname === "/Reports" ? { backgroundColor: "white" } : {}
            }
          />
          <Link
            to="/Reports"
            style={loca.pathname === "/Reports" ? { color: "white" } : {}}
          >
            التقارير
          </Link>
        </li>
        <li>
          <p
            style={
              loca.pathname === "/Vacations"
                ? {
                    backgroundColor: "black",
                    borderRadius: "40px",
                    padding: "10px",
                  }
                : {}
            }
          >
            <img
              src="/vaca.png"
              alt=""
              style={
                loca.pathname === "/Vacations"
                  ? { backgroundColor: "white" }
                  : {}
              }
            />
            <Link
              to="/Vacations"
              style={loca.pathname === "/Vacations" ? { color: "white" } : {}}
            >
              اجازات شعبة الاجازات
            </Link>
          </p>
          <ul
            style={
              loca.pathname === "/Vacations"
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <li>
              <img src="./vaca.png" alt="" />
              <Link to="/AddVacation">اضافة اجازة</Link>
            </li>
            {/* <li><Link to="/AddMural">اضافة جدارية</Link></li> */}
          </ul>
        </li>
        <li
          className="flex"
          style={
            loca.pathname === "/Divisions"
              ? { backgroundColor: "black", borderRadius: "40px" }
              : {}
          }
        >
          <img
            alt=""
            src="/dashboard.png"
            style={
              loca.pathname === "/Divisions" ? { backgroundColor: "white" } : {}
            }
          />
          <Link
            to="/Divisions"
            style={loca.pathname === "/Divisions" ? { color: "white" } : {}}
          >
            اجازات النفقة الخاصة
          </Link>
        </li>
        <li className="flex">
          <img alt="" src="/branch.png" />
          <Link to="/AddBranch">اضافة تصنيف</Link>
        </li>
        <li className="flex">
          <img alt="" src="/subBranch.png" />
          <Link to="/AddSubBranch">اضافة تصنيف فرعي</Link>
        </li>
      </ul>
    </nav>
  );
}
