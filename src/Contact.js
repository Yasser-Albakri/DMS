import React from "react";
import "./App.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import FetchCard from "./FetchData/FrtchCard";

export default function Contact({
  searchTerm,
  title,
  from,
  to,
  topicBook,
  numberBook,
  dateBook,
  sourceBook,
}) {
  const params = useParams();
  const id = params.id;
  const isFetching = useRef(false);

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
  const [user, setUser] = useState([]);
  const [userCard, setUserCard] = useState([]);
  const [userOutgoing, setUserOutgoing] = useState([]);
  const [userIncome, setUserIncome] = useState([]);

  const loc = useLocation();
  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:4000/users/me`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }
        const result = await response.json();
        setUser(result.data.user);
        // console.log(result);
        // console.log(result.data.outgoing);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [userToken]);

  useEffect(() => {
    if (
      (loc.pathname === "/BookReceived" && user.section_id === null) ||
      (loc.pathname === "/Reports" && user.section_id === null)
    ) {
      const fetchIncom = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:4000/income`, {
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
          // console.log(result.data.incomes);
          // console.log(result.data.docs);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchIncom();
    }
  }, [loc.pathname, userToken, user]);

  useEffect(() => {
    if (
      (loc.pathname === "/PublishedBook" && user.section_id === null) ||
      (loc.pathname === "/Vacations" && user.section_id === null) ||
      (loc.pathname === "/Reports" && user.section_id === null)
    ) {
      const fetchOutgoing = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:4000/outgoing`, {
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
          // console.log(result);
          // console.log(result.data.outgoing);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchOutgoing();
    }
  }, [loc.pathname, userToken, user]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        isFetching.current = true;

        const response = await fetch(`http://127.0.0.1:4000/cards`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(
            `Expected JSON, got ${contentType}. Response: ${text}`
          );
        }

        const result = await response.json();
        if (result.data && result.data.cards) {
          setCards(result.data.cards);
          setLengthCard(result.length); // Assuming this is the correct length
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error);
      } finally {
        isFetching.current = false;
        setLoading(false);
      }
    };

    if (
      (loc.pathname === "/Cards" || loc.pathname === "/Home") &&
      user.section_id === null &&
      !isFetching.current
    ) {
      fetchCards();
    }
  }, [loc.pathname, userToken, user]);

  // useEffect(() => {
  //   const fetchSection = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://127.0.0.1:4000/reports?name=صادر&num=11&topic=تذكير&date=2024-07-31&start=2023-07-30&end=2024-07-31"
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const result = await response.json();
  //       // setSection(result.data.sections);
  //       // setSectionLength(result.length);
  //       console.log(result);
  //       console.log(result.data);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchSection();
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
  }, [id, loc.pathname, userToken]);

  useEffect(() => {
    if (loc.pathname !== "/Vacations") {
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
          setRequest(result.data.cards[6].result);
          setNoteIn(result.data.cards[5].result);
          setNoteOut(result.data.cards[4].result);
          setVac(result.data.cards[7].result);
          // console.log(result);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchgeneral();
    }
  }, [userToken, loc]);

  useEffect(() => {
    if (
      (loc.pathname === "/Cards" && user.section_id !== null) ||
      (loc.pathname === "/Home" && user.section_id !== null)
    ) {
      const fetchUserCards = async () => {
        if (user && user.section_id) {
          try {
            const response = await fetch(
              `http://127.0.0.1:4000/cards/section/${user.section_id}`,
              {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                },
              }
            );

            if (!response.ok) {
              throw new Error(
                `Network response was not ok: ${response.statusText}`
              );
            }

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
              const text = await response.text();
              throw new Error(
                `Expected JSON, got ${contentType}. Response: ${text}`
              );
            }

            const result = await response.json();
            if (result.data && result.data.cards) {
              setUserCard(result.data.cards);
              // setLengthCard(result.length);
            } else {
              throw new Error("Invalid response structure");
            }

            // console.log(result);
          } catch (error) {
            console.error("Fetch error:", error);
            setError(error);
          } finally {
            setLoading(false);
          }
        }
      };

      fetchUserCards();
    }
  }, [loc.pathname, userToken, user]);

  useEffect(() => {
    const fetchUserOutgoing = async () => {
      if (
        (loc.pathname === "/PublishedBook" && user.section_id !== null) ||
        (loc.pathname === "/Vacations" && user.section_id !== null) ||
        (loc.pathname === "/Reports" && user.section_id !== null)
      ) {
        if (user && user.section_id) {
          try {
            const response = await fetch(
              `http://127.0.0.1:4000/outgoing/section/${user.section_id}`,
              {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                },
              }
            );
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setUserOutgoing(result.data.outgoing);
            // setLenBoUt(result.length);
            // console.log(result);
            // console.log(result.data.outgoing);
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        }
      }
    };
    fetchUserOutgoing();
  }, [loc.pathname, userToken, user]);

  useEffect(() => {
    if (
      (loc.pathname === "/BookReceived" && user.section_id !== null) ||
      (loc.pathname === "/Reports" && user.section_id !== null)
    ) {
      const fetchUserIncom = async () => {
        if (user && user.section_id) {
          try {
            const response = await fetch(
              `http://127.0.0.1:4000/income/section/${user.section_id}`,
              {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                },
              }
            );
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setUserIncome(result.data.incomes);
            // setLenBoIn(result.length);
            // console.log(result.data.incomes);
            // console.log(result.data);
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        }
      };
      fetchUserIncom();
    }
  }, [loc.pathname, userToken, user]);

  // useEffect(() => {
  //   const fetchgeneralAll = async () => {
  //     try {
  //       const response = await fetch("http://127.0.0.1:4000/get/me", {
  //         headers: {
  //           Authorization: `Bearer ${userToken}`,
  //         },
  //       });
  //       const result = await response.json();
  //       setUser(result.data.cards);
  //       console.log(result.data);
  //       console.log(result);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchgeneralAll();
  // }, []);

  const renderIncom = () => {
    if (!Array.isArray(Income)) return null;
    return Income.map((Incom) => (
      <tr key={Incom.id}>
        <Link
          to={`/BookRec/${Incom.id}`}
          style={{
            textDecoration: "none",
            margin: "5px",
            padding: "10px",
          }}
        >
          <td>{Incom.book_number}</td>
          <td>{Incom.topic}</td>
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
          <td>{allDoc.subject}</td>
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
            margin: "5px",
            padding: "10px",
          }}
        >
          <td>{outgoing.document_number}</td>
          <td>{outgoing.subject}</td>
        </Link>
      </tr>
    ));
  };

  const renderCards = () => {
    if (!Array.isArray(cards) || cards.length === 0)
      return <p>No cards available.</p>;
    return cards.map((card) => (
      <tr className="card" key={card.id}>
        <Link
          to={`/Card/${card.id}`}
          style={{
            textDecoration: "none",
            margin: "5px",
            padding: "10px",
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
    const filterCard = cards.filter((card) => card.section === "الاجازات");
    const filteredOutgoing = outgoing.filter((outgoingItem) =>
      filterCard.some((card) => outgoingItem.account_id === card.id)
    );

    const filteredOutVaca = outgoing.filter(
      (outgoing) => Number(outgoing.type) === 3
    );

    return filteredOutVaca.map((outgoing) => (
      <tr className="rendVac" key={outgoing.id}>
        <Link
          to={`/BookPublish/${outgoing.id}`}
          style={{
            textDecoration: "none",
            margin: "5px",
            padding: "10px",
          }}
        >
          <td>{outgoing.document_number}</td>
          <td>{outgoing.subject}</td>
          <td>{outgoing.leave_status}</td>
        </Link>
      </tr>
    ));
  };

  //render user permissions
  const renderUserCards = () => {
    if (!Array.isArray(userCard) || userCard.length === 0)
      return <p>No cards available.</p>;
    return userCard.map((card) => (
      <tr className="card" key={card.id}>
        <Link
          to={`/Card/${card.id}`}
          style={{
            textDecoration: "none",
            margin: "5px",
            padding: "10px",
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

  const renderUserOutgoing = () => {
    if (!Array.isArray(userOutgoing)) return null;
    return userOutgoing.map((outgoing) => (
      <tr key={outgoing.id}>
        <Link
          to={`/BookPublish/${outgoing.id}`}
          style={{
            textDecoration: "none",
            margin: "5px",
            padding: "10px",
          }}
        >
          <td>{outgoing.document_number}</td>
          <td>{outgoing.subject}</td>
        </Link>
      </tr>
    ));
  };

  const renderUserIncom = () => {
    if (!Array.isArray(userIncome)) return null;
    return userIncome.map((Incom) => (
      <tr key={Incom.id}>
        <Link
          to={`/BookRec/${Incom.id}`}
          style={{
            textDecoration: "none",
            margin: "5px",
            padding: "10px",
          }}
        >
          <td>{Incom.book_number}</td>
          <td>{Incom.topic}</td>
        </Link>
      </tr>
    ));
  };

  const renderUserVaca = () => {
    const filteredOutVaca = userOutgoing.filter(
      (outgoing) => outgoing.type === 3
    );
    // console.log(filteredOutVaca);

    return filteredOutVaca.map((outgoing) => (
      <tr className="rendVac" key={outgoing.id}>
        <Link
          to={`/BookPublish/${outgoing.id}`}
          style={{
            textDecoration: "none",
            margin: "5px",
            padding: "10px",
          }}
        >
          <td>{outgoing.document_number}</td>
          <td>{outgoing.subject}</td>
          <td>{outgoing.leave_status}</td>
        </Link>
      </tr>
    ));
  };

  // render search
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
        <tr className="card" key={card.id}>
          <Link
            to={`/Card/${card.id}`}
            style={{
              textDecoration: "none",
              margin: "5px",
              padding: "10px",
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

  const renderUserSearch = () => {
    if (searchTerm === "") {
      return renderCards();
    } else {
      const filteredCards = userCard.filter(
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
        <tr className="card" key={card.id}>
          <Link
            to={`/Card/${card.id}`}
            style={{
              textDecoration: "none",
              margin: "5px",
              padding: "10px",
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
            to={`/BookRec/${Income.id}`}
            style={{
              textDecoration: "none",
              margin: "5px",
              padding: "10px",
            }}
          >
            <td>{Income.book_number}</td>
            <td>{Income.topic}</td>
          </Link>
        </tr>
      ));
    }
  };

  const renderUserSearchIncom = () => {
    if (searchTerm === "") {
      return renderUserIncom();
    } else {
      const filteredIncom = userIncome.filter(
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
            to={`/BookRec/${Income.id}`}
            style={{
              textDecoration: "none",
              margin: "5px",
              padding: "10px",
            }}
          >
            <td>{Income.book_number}</td>
            <td>{Income.topic}</td>
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
            to={`/BookPublish/${outgoing.id}`}
            style={{
              textDecoration: "none",
              margin: "5px",
              padding: "10px",
            }}
          >
            <td>{outgoing.document_number}</td>
            <td>{outgoing.subject}</td>
          </Link>
        </tr>
      ));
    }
  };

  const renderUserSearchOutgoing = () => {
    if (searchTerm === "") {
      return renderOutgoing();
    } else {
      const filteredOutgoing = userOutgoing.filter(
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
            to={`/BookPublish/${outgoing.id}`}
            style={{
              textDecoration: "none",
              margin: "5px",
              padding: "10px",
            }}
          >
            <td>{outgoing.document_number}</td>
            <td>{outgoing.subject}</td>
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
        <tr className="rendVac" key={outgoing.id}>
          <Link
            to={`/BookPublish/${outgoing.id}`}
            style={{
              textDecoration: "none",
              margin: "5px",
              padding: "10px",
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

  const renderUserSearchVac = () => {
    if (searchTerm === "") {
      return renderVaca();
    } else {
      const filteredOutgoing = userOutgoing.filter(
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
        <tr className="rendVac" key={outgoing.id}>
          <Link
            to={`/BookPublish/${outgoing.id}`}
            style={{
              textDecoration: "none",
              margin: "5px",
              padding: "10px",
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

  const renderSearchIncomReports = () => {
    if (
      from === "" &&
      to === "" &&
      topicBook === "" &&
      numberBook === "" &&
      dateBook === "" &&
      sourceBook === ""
    ) {
      return <h3>{"الرجاء البحث اولا"}</h3>;
    } else {
      let filteredIncom = Income;

      if (topicBook !== "") {
        filteredIncom = filteredIncom.filter(
          (income) =>
            income.topic &&
            income.topic.toLowerCase().includes(topicBook.toLowerCase())
        );
      }

      if (dateBook !== "") {
        filteredIncom = filteredIncom.filter((income) => {
          // console.log("Comparing dates:", income.book_date, dateBook);
          return (
            income.book_date &&
            income.book_date
              .toLowerCase()
              .replace(/-/g, "/")
              .includes(dateBook.toLowerCase().replace(/-/g, "/"))
          );
        });
      }

      if (sourceBook !== "") {
        filteredIncom = filteredIncom.filter(
          (income) =>
            income.issuing_authority &&
            income.issuing_authority
              .toLowerCase()
              .includes(sourceBook.toLowerCase())
        );
      }

      if (numberBook !== "") {
        filteredIncom = filteredIncom.filter((income) => {
          // console.log("Comparing numbers:", income.book_number, numberBook);
          return (
            income.book_number &&
            income.book_number.toString().includes(numberBook)
          );
        });
      }
      if (from !== "" && to !== "") {
        filteredIncom = filteredIncom.filter((income) => {
          const incomeDate = new Date(income.create_at);
          const fromData = new Date(from);
          const toData = new Date(to);
          // console.log("Checking date range:", incomeDate, fromData, toData);
          return incomeDate >= fromData && incomeDate <= toData;
        });
      }

      // console.log("Filtered Income: ", filteredIncom);

      return filteredIncom.map((income) => (
        <tr key={income.id}>
          <Link
            to={`/BookRec/${income.id}`}
            style={{
              textDecoration: "none",
              margin: "5px",
              padding: "10px",
            }}
          >
            <td>{income.book_number}</td>
            <td>{income.topic}</td>
          </Link>
        </tr>
      ));
    }
  };

  const renderSearchOutgoingReports = () => {
    if (
      from === "" &&
      to === "" &&
      topicBook === "" &&
      numberBook === "" &&
      dateBook === "" &&
      sourceBook === ""
    ) {
      return;
    } else {
      let filteredOutgoing = outgoing;

      if (topicBook !== "") {
        filteredOutgoing = filteredOutgoing.filter(
          (outgoing) =>
            outgoing.subject &&
            outgoing.subject.toLowerCase().includes(topicBook.toLowerCase())
        );
      }

      if (dateBook !== "") {
        filteredOutgoing = filteredOutgoing.filter((outgoing) => {
          // console.log("Comparing dates:", outgoing.document_date, dateBook);
          return (
            outgoing.document_date &&
            outgoing.document_date
              .toLowerCase()
              .replace(/-/g, "/")
              .includes(dateBook.toLowerCase().replace(/-/g, "/"))
          );
        });
      }

      if (sourceBook !== "") {
        filteredOutgoing = filteredOutgoing.filter(
          (outgoing) =>
            outgoing.addressed_entity &&
            outgoing.addressed_entity
              .toLowerCase()
              .includes(sourceBook.toLowerCase())
        );
      }

      if (numberBook !== "") {
        filteredOutgoing = filteredOutgoing.filter((outgoing) => {
          // console.log(
          //   "Comparing numbers:",
          //   outgoing.document_number,
          //   numberBook
          // );
          return (
            outgoing.document_number &&
            outgoing.document_number.toString().includes(numberBook)
          );
        });
      }
      if (from !== "" && to !== "") {
        filteredOutgoing = filteredOutgoing.filter((outgoing) => {
          const outgoingDate = new Date(outgoing.create_at);
          const fromData = new Date(from);
          const toData = new Date(to);
          // console.log("Checking date range:", outgoingDate, fromData, toData);
          return outgoingDate >= fromData && outgoingDate <= toData;
        });
      }

      // console.log("Filtered outgoing: ", filteredOutgoing);

      return filteredOutgoing.map((outgoing) => (
        <tr key={outgoing.id}>
          <Link
            to={`/BookRec/${outgoing.id}`}
            style={{
              textDecoration: "none",
              margin: "5px",
              padding: "10px",
            }}
          >
            <td>{outgoing.document_number}</td>
            <td>{outgoing.subject}</td>
          </Link>
        </tr>
      ));
    }
  };

  const renderUserSearchIncomReports = () => {
    if (
      from === "" &&
      to === "" &&
      topicBook === "" &&
      numberBook === "" &&
      dateBook === "" &&
      sourceBook === ""
    ) {
      return <h3>{"الرجاء البحث اولا"}</h3>;
    } else {
      let filteredIncom = userIncome;

      if (topicBook !== "") {
        filteredIncom = filteredIncom.filter(
          (income) =>
            income.topic &&
            income.topic.toLowerCase().includes(topicBook.toLowerCase())
        );
      }

      if (dateBook !== "") {
        filteredIncom = filteredIncom.filter((income) => {
          // console.log("Comparing dates:", income.book_date, dateBook);
          return (
            income.book_date &&
            income.book_date
              .toLowerCase()
              .replace(/-/g, "/")
              .includes(dateBook.toLowerCase().replace(/-/g, "/"))
          );
        });
      }

      if (sourceBook !== "") {
        filteredIncom = filteredIncom.filter(
          (income) =>
            income.issuing_authority &&
            income.issuing_authority
              .toLowerCase()
              .includes(sourceBook.toLowerCase())
        );
      }

      if (numberBook !== "") {
        filteredIncom = filteredIncom.filter((income) => {
          // console.log("Comparing numbers:", income.book_number, numberBook);
          return (
            income.book_number &&
            income.book_number.toString().includes(numberBook)
          );
        });
      }
      if (from !== "" && to !== "") {
        filteredIncom = filteredIncom.filter((income) => {
          const incomeDate = new Date(income.create_at);
          const fromData = new Date(from);
          const toData = new Date(to);
          // console.log("Checking date range:", incomeDate, fromData, toData);
          return incomeDate >= fromData && incomeDate <= toData;
        });
      }

      // console.log("Filtered Income: ", filteredIncom);

      return filteredIncom.map((income) => (
        <tr key={income.id}>
          <Link
            to={`/BookRec/${income.id}`}
            style={{
              textDecoration: "none",
              margin: "5px",
              padding: "10px",
            }}
          >
            <td>{income.book_number}</td>
            <td>{income.topic}</td>
          </Link>
        </tr>
      ));
    }
  };

  const renderUserSearchOutgoingReports = () => {
    if (
      from === "" &&
      to === "" &&
      topicBook === "" &&
      numberBook === "" &&
      dateBook === "" &&
      sourceBook === ""
    ) {
      return;
    } else {
      let filteredOutgoing = userOutgoing;

      if (topicBook !== "") {
        filteredOutgoing = filteredOutgoing.filter(
          (outgoing) =>
            outgoing.subject &&
            outgoing.subject.toLowerCase().includes(topicBook.toLowerCase())
        );
      }

      if (dateBook !== "") {
        filteredOutgoing = filteredOutgoing.filter((outgoing) => {
          // console.log("Comparing dates:", outgoing.document_date, dateBook);
          return (
            outgoing.document_date &&
            outgoing.document_date
              .toLowerCase()
              .replace(/-/g, "/")
              .includes(dateBook.toLowerCase().replace(/-/g, "/"))
          );
        });
      }

      if (sourceBook !== "") {
        filteredOutgoing = filteredOutgoing.filter(
          (outgoing) =>
            outgoing.addressed_entity &&
            outgoing.addressed_entity
              .toLowerCase()
              .includes(sourceBook.toLowerCase())
        );
      }

      if (numberBook !== "") {
        filteredOutgoing = filteredOutgoing.filter((outgoing) => {
          // console.log(
          //   "Comparing numbers:",
          //   outgoing.document_number,
          //   numberBook
          // );
          return (
            outgoing.document_number &&
            outgoing.document_number.toString().includes(numberBook)
          );
        });
      }
      if (from !== "" && to !== "") {
        filteredOutgoing = filteredOutgoing.filter((outgoing) => {
          const outgoingDate = new Date(outgoing.create_at);
          const fromData = new Date(from);
          const toData = new Date(to);
          // console.log("Checking date range:", outgoingDate, fromData, toData);
          return outgoingDate >= fromData && outgoingDate <= toData;
        });
      }

      // console.log("Filtered outgoing: ", filteredOutgoing);

      return filteredOutgoing.map((outgoing) => (
        <tr key={outgoing.id}>
          <Link
            to={`/BookRec/${outgoing.id}`}
            style={{
              textDecoration: "none",
              margin: "5px",
              padding: "10px",
            }}
          >
            <td>{outgoing.document_number}</td>
            <td>{outgoing.subject}</td>
          </Link>
        </tr>
      ));
    }
  };

  //select permisions
  const selectRenderCards = () => {
    if (user.section_id !== null) {
      if (searchTerm === "") {
        return renderUserCards();
      } else {
        return renderUserSearch();
      }
    } /*(user.role === "0" || user.role === "1")*/ else {
      if (searchTerm === "") {
        return renderCards();
      } else {
        return renderSearch();
      }
    }
  };

  const selectRenderOutgoing = () => {
    if (user.section_id !== null) {
      if (searchTerm === "") {
        return renderUserOutgoing();
      } else {
        return renderUserSearchOutgoing();
      }
    } /*(user.role === "0" || user.role === "1")*/ else {
      if (searchTerm === "") {
        return renderOutgoing();
      } else {
        return renderSearchOutgoing();
      }
    }
  };

  const selectRenderIncome = () => {
    if (user.section_id !== null) {
      if (searchTerm === "") {
        return renderUserIncom();
      } else {
        return renderUserSearchIncom();
      }
    } /*(user.role === "0" || user.role === "1")*/ else {
      if (searchTerm === "") {
        return renderIncom();
      } else {
        return renderSearchIncom();
      }
    }
  };

  const selectRenderVac = () => {
    if (user.section_id !== null) {
      if (searchTerm === "") {
        return renderUserVaca();
      } else {
        return renderUserSearchVac();
      }
    } /*(user.role === "0" || user.role === "1")*/ else {
      if (searchTerm === "") {
        return renderVaca();
      } else {
        return renderSearchVac();
      }
    }
  };

  const selectRenderReports = () => {
    if (user.section_id !== null) {
      return (
        <>
          {renderUserSearchIncomReports()}
          {renderUserSearchOutgoingReports()}
        </>
      );
    } else {
      return (
        <>
          {renderSearchIncomReports()}
          {renderSearchOutgoingReports()}
        </>
      );
    }
  };

  const renderContent = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    switch (loca.pathname) {
      case "/Home":
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
                className="cardma"
                style={{
                  textDecoration: "none",
                  color: "black",
                  borderRadius: "20px",
                }}
              >
                <td className="td1">الرقم</td>
                <td>اسم المستثمر</td>
                <td>اسم المؤسسة</td>
                <td>التجديد</td>
              </tr>
            </table>
            <hr />
            <table>
              <tbody>{selectRenderCards()}</tbody>
            </table>
          </div>
        );
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
                }}
              >
                <td className="td1">الرقم</td>
                <td>الموضوع</td>
              </tr>
            </table>
            <hr />
            <table>
              <tbody>{selectRenderReports()}</tbody>
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
                className="cardma"
                style={{
                  textDecoration: "none",
                  color: "black",
                  borderRadius: "20px",
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
              <tbody>{selectRenderCards()}</tbody>
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
              <tr className="vacat">
                <td>الرقم</td>
                <td>الموضوع</td>
                <td>الحالة</td>
              </tr>
            </table>
            <hr />
            <table>
              <tbody>{selectRenderVac()}</tbody>
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
              <tbody>{selectRenderIncome()}</tbody>
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
              <tbody>{selectRenderOutgoing()}</tbody>
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
                <h3>{title}</h3>
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
