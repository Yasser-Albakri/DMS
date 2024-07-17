import React from "react";
import './App.css'
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import FetchCard from "./FetchData/FrtchCard";

export default function Contact({ searchTerm }) {

    const params = useParams();
    const id = params.id;

    console.log(searchTerm);

    const loca = useLocation();
    const [data, setData] = useState(null);
    const [Income, setIncome] = useState([]);
    const [lengthDoc, setLengthDoc] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [outgoing, setOutgoing] = useState([]);
    const [cards, setCards] = useState([]);
    const [section, setSection] = useState([]);
    const [lengthCard, setLengthCard] = useState();
    const [sectionLength, setSectionLength] = useState();

    const loc = useLocation();
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    const userToken = localStorage.getItem('userToken');
    console.log(userId);
    console.log(userRole);
    

    useEffect(() => {
        if(loc.pathname==="/BookReceived") {
        const fetchIncom = async () => {
            try {
                const response = await fetch('http://127.0.0.1:4000/income');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setIncome(result.data.incomes);
                setLengthDoc(result.length)
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

    const DocLen = lengthDoc;



    useEffect(() => {
        if (loc.pathname === "/PublishedBook" || loc.pathname === '/Vacations') {
        const fetchOutgoing = async () => {
            try {
                const response = await fetch('http://127.0.0.1:4000/outgoing');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setOutgoing(result.data.outgoing);
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
        if(loc.pathname === "/Cards" || loc.pathname==="/Home") {
        const fetchCards = async () => {
            try {
                const response = await fetch('http://127.0.0.1:4000/cards');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
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
                const response = await fetch(`http://127.0.0.1:4000/cards/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // const result = await response.json();
                // setCard(result);
                // console.log(result);
                console.log(response);
                console.log(id)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCard();
    }
    }, [id]);







console.log(localStorage.userToken);












    useEffect(() => {
        switch (loca.pathname) {
            case "/Home":
            case "/Reports":
                setData({
                    title: "اخر الكتب",
                    categories: [
                        { number: 1, subject: "مذكرة" },
                        { number: 2, subject: "طلب" },
                        { number: 3, subject: "كتاب" },
                        { number: 4, subject: "اجازة" }
                    ]
                });
                break;
                case `/Card/${id}`:
                setData({
                    title: "البطاقة",
                });
                break;
            case "/Cards":
                setData({
                    title: "اخر البطاقات",
                });
                break;
            case "/BookReceived":
                setData({
                    title: "اخر الكتب",
                    totalReceived: 15,
                    receivedBooks: [
                        { id: 1, title: "كتاب" },
                        { id: 2, title: "مذكرة" },
                        { id: 2, title: "طلب" }
                    ]
                });
                break;
            case "/PublishedBook":
                setData({
                    title: "اخر الكتب",
                    totalPublished: 8,
                    publishedBooks: [
                        { id: 1, title: "كتاب" },
                        { id: 2, title: "مذكرة" },
                        { id: 3, title: "اجازة" }
                    ]
                });
                break;
            case "/Vacations":
                setData({
                    title: "اخر الاجازات",
                    publishedBooks: [
                        { id: 3, title: "اجازة" }
                    ]
                });
                break;
            case "/Divisions":
                setData({
                    title: "الشعب",
                    publishedBooks: [
                        { id: 2, title: "اجازة" }
                    ]
                });
                break;
            default:
                setData(null); // Handle unknown paths
        }
    }, [loca.pathname]);









    const renderIncom = () => {
        if (!Array.isArray(Income)) return null;
        return Income.map((Incom) => (
            <tr key={Incom.id}>
                <Link to={`/BookRec/${Incom.id}`} style={{textDecoration:'none', color:'black', margin:'5px', backgroundColor: 'rgb(238 238 238)', padding:'10px', borderRadius:'20px'}}>
                <td>{Incom.book_number}</td>
                <td className="td2">{Incom.topic}</td>
                <td>{JSON.stringify(Incom.file_path)}</td>
                </Link>
            </tr>
        ));
    };

    // const renderDocumentsRes = () => {
    //     if (!Array.isArray(documents)) return null;
    //     else if (documents.document_type==='')
    //     return documents.map((document) => (
    //         <tr key={document.id}>
    //             <td>{document.document_number}</td>
    //             <td className="td2">{document.document_title}</td>
    //         </tr>
    //     ));
    // };

    const renderOutgoing = () => {
        if (!Array.isArray(outgoing)) return null;
        return outgoing.map((outgoing) => (
            
            <tr key={outgoing.id}>
                <Link to={`/BookPublish/${outgoing.id}`} style={{textDecoration:'none', color:'black', margin:'5px', backgroundColor: 'rgb(238 238 238)', padding:'10px', borderRadius:'20px'}}>
                    <td>{outgoing.document_number}</td>
                    <td>{outgoing.subject}</td>
                </Link>
            </tr>
        ));
    };


    const renderCards = () => {
        if (!Array.isArray(cards)) return null;
        return cards.map((card) => (
            <tr key={card.account_id} >
                <Link to={`/Card/${card.id}`} style={{textDecoration:'none', color:'black', margin:'5px', backgroundColor: 'rgb(238 238 238)', padding:'10px', borderRadius:'20px', display:"flex", justifyContent:"space-around", alignItems:"center" }}>
                    <td>{card.id}</td>
                    <td>{card.fullname}</td>
                    <td>{card.company_name}</td>
                    <td>{card.renewal}</td>
                </Link>
            </tr>
        ));
    };


    const renderSection = () => {
        if (!Array.isArray(section)) return null;
        return section.map((section) => (
            <tr key={section.id}>
                <td>{section.name}</td>
                <td>{section.id}</td>
            </tr>
        ));
    };

    const renderVaca = () => {
        return outgoing
            .filter(outgoing => outgoing.type === 3) // Adjust this condition based on your actual requirement
            .map((outgoing) => (
                <tr key={outgoing.id}>
                    <td>
                        <Link to={`/BookPublish/${outgoing.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            {outgoing.document_number}
                        </Link>
                    </td>
                    <td>
                        <Link to={`/BookPublish/${outgoing.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            {outgoing.subject}
                        </Link>
                    </td>
                    <td>
                        <Link to={`/BookPublish/${outgoing.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            {outgoing.leave_status}
                        </Link>
                    </td>
                </tr>
            ));
    };

    const renderSearch = () => {
      if (searchTerm === "") {
          return renderCards();
      } else {
          const filteredCards = cards.filter(card => 
              card.fullname.toLowerCase().includes(searchTerm.toLowerCase())
          );
  
          return filteredCards.map(card => (
              <tr key={card.account_id}>
                  <Link to={`/Card/${card.id}`} style={{textDecoration: 'none', color: 'black', margin: '5px', backgroundColor: 'rgb(238 238 238)', padding: '10px', borderRadius: '20px', display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                      <td>{card.id}</td>
                      <td>{card.fullname}</td>
                      <td>{card.company_name}</td>
                      <td>{card.renewal}</td>
                  </Link>
              </tr>
          ));
      }
  };











    const renderContent = () => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;

        if (!data) {
            return <div>No data available for this route.</div>;
        }

        switch (loca.pathname) {
            case "/Home":
            case "/Reports":
                return (
                    <div>
                        <div className="info">
                            <div className="tex">
                                <h3>{data.title}</h3>
                                {/* <p>عدد الكتب الكلي : <span>{DocLen}</span></p> */}
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
                                <td>اسم المؤسسة</td>
                                <td>التجديد</td>
                            </tr>
                        </table>
                        <hr />
                        <table>
                            <tbody>
                                {searchTerm=== "" ? renderCards() : renderSearch()}
                            </tbody>
                        </table>
                    </div>
                );
            case "/Cards":
                return (
                    <div>
                        <div className="info">
                            <div className="tex">
                                <h3>{data.title}</h3>
                                <p>عدد البطاقات الكلي : <span>{lengthCard}</span></p>
                            </div>
                        </div>
                        <hr />
                        <table>
                            <tr style={{textDecoration:'none', color:'black', borderRadius:'20px', display:"flex", justifyContent:"space-around", alignItems:"center" }}>
                                <td className="td1">التسلسل</td>
                                <td>اسم المستثمر</td>
                                <td>اسم المؤسسة</td>
                                <td>التجديد</td>
                            </tr>
                        </table>
                        <hr />
                        <table>
                            <tbody>
                                {renderCards()}
                            </tbody>
                        </table>
                    </div>
                );
                case "/Vacations":
                return (
                    <div>
                        <div className="info">
                            <div className="tex">
                                <h3>{data.title}</h3>
                                <p>عدد الاجازات الكلي : <span>{lengthCard}</span></p>
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
                            {renderVaca()}
                            </tbody>
                        </table>
                    </div>
                );
            case "/BookReceived":
                return (
                    <div>
                        <div className="info">
                            <div className="tex">
                                <h3>{data.title}</h3>
                                <p>عدد الكتب الكلي : <span>{DocLen}</span></p>
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
                                    <p>1</p>
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
                                {renderIncom()}
                            </tbody>
                        </table>
                    </div>
                );
            case "/PublishedBook":
                return (
                    <div>
                        <div className="info">
                            <div className="tex">
                                <h3>{data.title}</h3>
                                <p>عدد الكتب الكلي : <span>{data.totalPublished}</span></p>
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
                            {renderOutgoing()}
                            </tbody>
                        </table>
                    </div>
                );
            case "/Divisions":
                return (
                    <div>
                        <div className="info">
                            <div className="tex">
                                <h3>{data.title}</h3>
                                <p>عدد الشعب الكلي : <span>{sectionLength}</span></p>
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
                            <tbody>
                            {renderSection()}
                            </tbody>
                        </table>
                    </div>
                );
                case `/Card/${id}`:
                return (
                    <div>
                        <div className="info">
                            <div className="tex">
                                <Link to={`/CardInfo/${id}`} style={{color:'black'}}><h3>{data.title}</h3></Link>
                                <p>عدد الكتب الكلي : <span></span></p>
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

    return (
        <div className="contact">
            {renderContent()}
        </div>
    );
}
