import React from "react";
import "./App.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import FetchCard from "./FetchData/FrtchCard";

export default function Contact({ searchTerm, title }) {
  const params = useParams();
  const id = params.id;

  const loca = useLocation();
  const [Income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [outgoing, setOutgoing] = useState([]);
  const [cards, setCards] = useState([]);
  const [lengthCard, setLengthCard] = useState();
  const [allBook, setAllBook] = useState([]);
  const [bookIn, setBookIn] = useState([]);
  const [bookOut, setBookOut] = useState([]);
  const [allNote, setAllNote] = useState([]);
  const [noteIn, setNoteIn] = useState([]);
  const [noteOut, setNoteOut] = useState([]);
  const [request, setRequest] = useState([]);
  const [vac, setVac] = useState([]);
  const [lenBoIn, setLenBoIn] = useState([]);
  const [lenBoUt, setLenBoUt] = useState([]);
  const [allDoc, setAllDoc] = useState([]);

  const loc = useLocation();
  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");
  const userToken = localStorage.getItem("userToken");
  // console.log(userId);
  // console.log(userRole);

  useEffect(() => {
    if (loc.pathname === "/BookReceived") {
      const fetchIncom = async () => {
        try {
          const response = await fetch("http://127.0.0.1:4000/income", {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          setIncome(result.data.incomes);
          setLenBoIn(result.length);
          console.log(result.data.incomes);
          // console.log(result.data.docs);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchIncom();
    }
  }, []);

  useEffect(() => {
    if (loc.pathname === "/PublishedBook" || loc.pathname === "/Vacations") {
      const fetchOutgoing = async () => {
        try {
          const response = await fetch("http://127.0.0.1:4000/outgoing", {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          setOutgoing(result.data.outgoing);
          setLenBoUt(result.length);
          console.log(result);
          console.log(result.data.outgoing);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchOutgoing();
    }
  }, []);

  useEffect(() => {
    if (loc.pathname === "/Cards" || loc.pathname === "/Home") {
      const fetchCards = async () => {
        try {
          const response = await fetch("http://127.0.0.1:4000/cards", {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          setCards(result.data.cards);
          setLengthCard(result.length);
          console.log(result);
          //console.log(result.data.cards);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchCards();
    }
  }, []);

  // useEffect(() => {
  //     const fetchSection = async () => {
  //         try {
  //             const response = await fetch('http://127.0.0.1:4000/sections');
  //             if (!response.ok) {
  //                 throw new Error('Network response was not ok');
  //             }
  //             const result = await response.json();
  //             setSection(result.data.sections);
  //             setSectionLength(result.length);
  //             // console.log(result);
  //             // console.log(result.data.sections);
  //         } catch (error) {
  //             setError(error);
  //         } finally {
  //             setLoading(false);
  //         }
  //     };
  //     fetchSection();
  // }, []);

  useEffect(() => {
    if (loc.pathname === `/Card/${id}`) {
      const fetchCard = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:4000/cards/${id}`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          // const result = await response.json();
          // setCard(result);
          // console.log(result);
          console.log(response);
          console.log(id);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchCard();
    }
  }, [id]);

  useEffect(() => {
    const fetchgeneral = async () => {
      try {
        const response = await fetch("http://127.0.0.1:4000/general", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        const result = await response.json();
        setAllBook(result.data.cards[0].result);
        setAllNote(result.data.cards[3].result);
        setBookIn(result.data.cards[2].result);
        setBookOut(result.data.cards[1].result);
        setRequest(result.data.cards[7].result);
        setNoteIn(result.data.cards[5].result);
        setNoteOut(result.data.cards[4].result);
        setVac(result.data.cards[6].result);
        //console.log(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchgeneral();
  }, []);

  //     useEffect (() => {
  //       const fetchgeneralAll = async () => {
  //           try {
  //               const response = await fetch('http://127.0.0.1:4000/general',
  //                   {method: 'POST',
  //                       headers: {
  //                           'Authorization': `Bearer ${userToken}`
  //                       }
  //                   }
  //               );
  //               const result = await response.json();
  //               setAllDoc(result.data.cards);
  //               console.log(result.data.cards);
  //               console.log(result);
  //           } catch (error) {
  //               setError(error);
  //           } finally {
  //               setLoading(false);
  //           }

  //   };fetchgeneralAll();
  // }, [])

  const renderIncom = () => {
    if (!Array.isArray(Income)) return null;
    return Income.map((Incom) => (
      <tr key={Incom.id}>
        <Link
          to={`/BookRec/${Incom.id}`}
          style={{
            textDecoration: "none",
            color: "black",
            margin: "5px",
            backgroundColor: "rgb(238 238 238)",
            padding: "10px",
            borderRadius: "20px",
          }}
        >
          <td>{Incom.book_number}</td>
          <td className="td2">{Incom.topic}</td>
        </Link>
      </tr>
    ));
  };

  const renderAllDoc = () => {
    if (!Array.isArray(allDoc)) return null;
    return allDoc.map((allDoc) => (
      <tr key={allDoc.id}>
        <Link
          to={`/BookRec/${allDoc.id}`}
          style={{
            textDecoration: "none",
            color: "black",
            margin: "5px",
            backgroundColor: "rgb(238 238 238)",
            padding: "10px",
            borderRadius: "20px",
          }}
        >
          <td>{allDoc.id}</td>
          <td className="td2">{allDoc.subject}</td>
        </Link>
      </tr>
    ));
  };

  const renderOutgoing = () => {
    if (!Array.isArray(outgoing)) return null;
    return outgoing.map((outgoing) => (
      <tr key={outgoing.id}>
        <Link
          to={`/BookPublish/${outgoing.id}`}
          style={{
            textDecoration: "none",
            color: "black",
            margin: "5px",
            backgroundColor: "rgb(238 238 238)",
            padding: "10px",
            borderRadius: "20px",
          }}
        >
          <td>{outgoing.document_number}</td>
          <td className="td2">{outgoing.subject}</td>
        </Link>
      </tr>
    ));
  };

  const renderCards = () => {
    if (!Array.isArray(cards)) return null;
    return cards.map((card) => (
      <tr key={card.account_id}>
        <Link
          to={`/Card/${card.id}`}
          style={{
            textDecoration: "none",
            color: "black",
            margin: "5px",
            backgroundColor: "rgb(238 238 238)",
            padding: "10px",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <td>{card.id}</td>
          <td>{card.fullname}</td>
          <td>{card.company_name}</td>
          <td>{card.renewal}</td>
        </Link>
      </tr>
    ));
  };

  // const renderSection = () => {
  //     if (!Array.isArray(section)) return null;
  //     return section.map((section) => (
  //         <tr key={section.id}>
  //             <td>{section.name}</td>
  //             <td>{section.id}</td>
  //         </tr>
  //     ));
  // };

  const renderVaca = () => {
    const filteredOutVaca = outgoing.filter((outgoing) => outgoing.type === 3);

    return filteredOutVaca.map((outgoing) => (
      <tr key={outgoing.id}>
        <Link
          to={`/BookPublish/${outgoing.id}`}
          style={{
            textDecoration: "none",
            color: "black",
            margin: "5px",
            backgroundColor: "rgb(238 238 238)",
            padding: "10px",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <td>{outgoing.document_number}</td>
          <td>{outgoing.subject}</td>
          <td>{outgoing.executing_uthority}</td>
        </Link>
      </tr>
    ));
  };

  const renderSearch = () => {
    if (searchTerm === "") {
      return renderCards();
    } else {
      const filteredCards = cards.filter(
        (card) =>
          (card.fullname &&
            card.fullname.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (card.company_name &&
            card.company_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (card.id && card.id.toString().includes(searchTerm))
      );

      return filteredCards.map((card) => (
        <tr key={card.id}>
          <Link
            to={`/Card/${card.id}`}
            style={{
              textDecoration: "none",
              color: "black",
              margin: "5px",
              backgroundColor: "rgb(238 238 238)",
              padding: "10px",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <td>{card.id}</td>
            <td>{card.fullname}</td>
            <td>{card.company_name}</td>
            <td>{card.renewal}</td>
          </Link>
        </tr>
      ));
    }
  };

  const renderSearchIncom = () => {
    if (searchTerm === "") {
      return renderIncom();
    } else {
      const filteredIncom = Income.filter(
        (Income) =>
          (Income.topic &&
            Income.topic.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (Income.section &&
            Income.section.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (Income.issuing_authority &&
            Income.issuing_authority
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (Income.book_number &&
            Income.book_number.toString().includes(searchTerm))
      );

      return filteredIncom.map((Income) => (
        <tr key={Income.id}>
          <Link
            to={`/Card/${Income.id}`}
            style={{
              textDecoration: "none",
              color: "black",
              margin: "5px",
              backgroundColor: "rgb(238 238 238)",
              padding: "10px",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <td>{Income.book_number}</td>
            <td>{Income.topic}</td>
            <td>{Income.issuing_authority}</td>
          </Link>
        </tr>
      ));
    }
  };

  const renderSearchOutgoing = () => {
    if (searchTerm === "") {
      return renderOutgoing();
    } else {
      const filteredOutgoing = outgoing.filter(
        (outgoing) =>
          (outgoing.addressed_entity &&
            outgoing.addressed_entity
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (outgoing.subject &&
            outgoing.subject
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (outgoing.executing_uthority &&
            outgoing.executing_uthority
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (outgoing.document_number &&
            outgoing.document_number.toString().includes(searchTerm))
      );

      return filteredOutgoing.map((outgoing) => (
        <tr key={outgoing.id}>
          <Link
            to={`/Card/${outgoing.id}`}
            style={{
              textDecoration: "none",
              color: "black",
              margin: "5px",
              backgroundColor: "rgb(238 238 238)",
              padding: "10px",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <td>{outgoing.document_number}</td>
            <td>{outgoing.subject}</td>
            <td>{outgoing.executing_uthority}</td>
          </Link>
        </tr>
      ));
    }
  };

  const renderSearchVac = () => {
    if (searchTerm === "") {
      return renderVaca();
    } else {
      const filteredOutgoing = outgoing.filter(
        (outgoing) =>
          (outgoing.addressed_entity &&
            outgoing.addressed_entity
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (outgoing.subject &&
            outgoing.subject
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (outgoing.executing_uthority &&
            outgoing.executing_uthority
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (outgoing.document_number &&
            outgoing.document_number.toString().includes(searchTerm))
      );

      const filteredOutVaca = filteredOutgoing.filter(
        (outgoing) => outgoing.type === 3
      );

      return filteredOutVaca.map((outgoing) => (
        <tr key={outgoing.id}>
          <Link
            to={`/Card/${outgoing.id}`}
            style={{
              textDecoration: "none",
              color: "black",
              margin: "5px",
              backgroundColor: "rgb(238 238 238)",
              padding: "10px",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <td>{outgoing.document_number}</td>
            <td>{outgoing.subject}</td>
            <td>{outgoing.executing_uthority}</td>
          </Link>
        </tr>
      ));
    }
  };

  const renderContent = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    switch (loca.pathname) {
      case "/Home":
      case "/Reports":
        return (
          <div>
            <div className="info">
              <div className="tex">
                <h3>{title}</h3>
                {/* <p>عدد الكتب الكلي : <span>{DocLen}</span></p> */}
              </div>
              <div className="divs">
                <div>
                  <p>{allNote}</p>
                  <hr />
                  <p>مذكرة</p>
                </div>
                <div>
                  <p>{request}</p>
                  <hr />
                  <p>طلب</p>
                </div>
                <div>
                  <p>{allBook}</p>
                  <hr />
                  <p>كتاب</p>
                </div>
                <div>
                  <p>{vac}</p>
                  <hr />
                  <p>اجازة</p>
                </div>
              </div>
            </div>
            <hr />
            <table>
              <tr
                style={{
                  textDecoration: "none",
                  color: "black",
                  borderRadius: "20px",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <td className="td1">الرقم</td>
                <td>الموضوع</td>
                <td>اسم المؤسسة</td>
                <td>التجديد</td>
              </tr>
            </table>
            <hr />
            <table>
              <tbody>
                {searchTerm === "" ? renderCards() : renderSearch()}
              </tbody>
            </table>
          </div>
        );
      case "/Cards":
        return (
          <div>
            <div className="info">
              <div className="tex">
                <h3>{title}</h3>
                <p>
                  عدد البطاقات الكلي : <span>{lengthCard}</span>
                </p>
              </div>
            </div>
            <hr />
            <table>
              <tr
                style={{
                  textDecoration: "none",
                  color: "black",
                  borderRadius: "20px",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <td className="td1">التسلسل</td>
                <td>اسم المستثمر</td>
                <td>اسم المؤسسة</td>
                <td>التجديد</td>
              </tr>
            </table>
            <hr />
            <table>
              <tbody>
                {searchTerm === "" ? renderCards() : renderSearch()}
              </tbody>
            </table>
          </div>
        );
      case "/Vacations":
        return (
          <div>
            <div className="info">
              <div className="tex">
                <h3>{title}</h3>
                <p>
                  عدد الاجازات الكلي : <span>{vac}</span>
                </p>
              </div>
            </div>
            <hr />
            <table>
              <tr>
                <td className="td1">الرقم</td>
                <td>الموضوع</td>
                <td>الحالة</td>
              </tr>
            </table>
            <hr />
            <table>
              <tbody>
                {searchTerm === "" ? renderVaca() : renderSearchVac()}
              </tbody>
            </table>
          </div>
        );
      case "/BookReceived":
        return (
          <div>
            <div className="info">
              <div className="tex">
                <h3>{title}</h3>
                <p>
                  عدد الكتب الكلي : <span>{lenBoIn}</span>
                </p>
              </div>
              <div className="divs">
                <div>
                  <p>{noteIn}</p>
                  <hr />
                  <p>مذكرة</p>
                </div>
                <div>
                  <p>{request}</p>
                  <hr />
                  <p>طلب</p>
                </div>
                <div>
                  <p>{bookIn}</p>
                  <hr />
                  <p>كتاب</p>
                </div>
              </div>
            </div>
            <hr />
            <table>
              <tr>
                <td className="td1">الرقم</td>
                <td>الموضوع</td>
              </tr>
            </table>
            <hr />
            <table>
              <tbody>
                {searchTerm === "" ? renderIncom() : renderSearchIncom()}
              </tbody>
            </table>
          </div>
        );
      case "/PublishedBook":
        return (
          <div>
            <div className="info">
              <div className="tex">
                <h3>{title}</h3>
                <p>
                  عدد الكتب الكلي : <span>{lenBoUt}</span>
                </p>
              </div>
              <div className="divs">
                <div>
                  <p>{noteOut}</p>
                  <hr />
                  <p>مذكرة</p>
                </div>
                <div>
                  <p>{bookOut}</p>
                  <hr />
                  <p>كتاب</p>
                </div>
                <div>
                  <p>{vac}</p>
                  <hr />
                  <p>اجازة</p>
                </div>
              </div>
            </div>
            <hr />
            <table>
              <tr>
                <td className="td1">الرقم</td>
                <td>الموضوع</td>
              </tr>
            </table>
            <hr />
            <table>
              <tbody>
                {searchTerm === "" ? renderOutgoing() : renderSearchOutgoing()}
              </tbody>
            </table>
          </div>
        );
      case "/Divisions":
        return (
          <div>
            <div className="info">
              <div className="tex">
                <h3>{title}</h3>
                <p>
                  عدد الشعب الكلي : <span></span>
                </p>
              </div>
            </div>
            <hr />
            <table>
              <tr>
                <td className="td1">الشعبة</td>
                <td>عدد الاعضاء</td>
              </tr>
            </table>
            <hr />
            <table>
              <tbody>{/* {renderSection()} */}</tbody>
            </table>
          </div>
        );
      case `/Card/${id}`:
        return (
          <div>
            <div className="info">
              <div className="tex">
                <Link to={`/CardInfo/${id}`} style={{ color: "black" }}>
                  <h3>{title}</h3>
                </Link>
                <p>
                  عدد الكتب الكلي : <span></span>
                </p>
              </div>
              <div className="divs">
                <div>
                  <p>0</p>
                  <hr />
                  <p>مذكرة</p>
                </div>
                <div>
                  <p>0</p>
                  <hr />
                  <p>طلب</p>
                </div>
                <div>
                  <p>0</p>
                  <hr />
                  <p>كتاب</p>
                </div>
                <div>
                  <p>1</p>
                  <hr />
                  <p>اجازة</p>
                </div>
              </div>
            </div>
            <hr />
            <table>
              <tr>
                <td className="td1">الرقم</td>
                <td>الموضوع</td>
              </tr>
            </table>
            <hr />
            <table>
              <tbody>
                <FetchCard />
              </tbody>
            </table>
          </div>
        );
      default:
        return null; // Handle unknown paths
    }
  };

  return <div className="contact">{renderContent()}</div>;
}
