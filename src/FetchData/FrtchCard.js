import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function FetchCard() {
  const params = useParams();
  const id = params.id;
  const userToken = localStorage.getItem("userToken");

  const [card, setCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Income, setIncome] = useState([]);
  const [outgoing, setOutgoing] = useState([]);

  useEffect(() => {
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
        console.log(result.data.incomes);
        // console.log(result.data.docs);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchIncom();
  }, []);

  useEffect(() => {
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
        console.log(result);
        console.log(result.data.outgoing);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOutgoing();
  }, []);

  useEffect(() => {
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
  }, [id]);

  const renderOug = () => {
    const filteredOutgoing = outgoing.filter(
      (outgoing) => outgoing.account_id === id
    ); // Adjust this condition based on your actual requirement
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
  };

  const renderInc = () => {
    const filteredIncome = Income.filter((Income) => Income.account_id === id); // Adjust this condition based on your actual requirement
    return filteredIncome.map((Income) => (
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
  };

  return (
    <table>
      <tbody>
        {renderOug()}
        {renderInc()}
      </tbody>
    </table>
  );
}
