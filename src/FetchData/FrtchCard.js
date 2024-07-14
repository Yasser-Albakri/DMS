import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function FetchCard () {

    const params = useParams();
    const id = params.id;
    
    const [documents, setDocuments] = useState([]);
    const [card, setCard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [Income, setIncome] = useState([]);
    const [outgoing, setOutgoing] = useState([]);


    useEffect(() => {
        const fetchIncom = async () => {
            try {
                const response = await fetch('http://127.0.0.1:4000/income');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
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
    }, []);


    useEffect(() => {
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
        }, [id]);

    const renderCard = () => {
        if (!Array.isArray(Income)) return null;
        return Income.map((Incom) =>
            Incom.account_id === card.account_id ? (
                <tr key={Incom.account_id}>
                    <Link to={`/BookRec/${Incom.account_id}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <td>{Incom.book_number}</td>
                        <td className="td2">{Incom.topic}</td>
                    </Link>
                </tr>
            ) : null
        );
    };

    return (
        <table>
            <tbody>
                {renderCard()}
            </tbody>
        </table>
    )
}