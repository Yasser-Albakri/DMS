import React, { useState, useEffect } from 'react';
import './App.css';
import './Forms.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddExtension = () => {
    const history = useNavigate();
    const params = useParams();
    const id = params.id;
    const [currentStep] = useState(0);
    const [attached, setAttached] = useState();
    const [formData, setFormData] = useState({
        topic: '',
        inc_id: id,
        date: '',
        number: '',
    });

    const [file, setFile] = useState();

    useEffect (() => {
        const fetchAttach = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:4000/attached`);
                if (!response.ok) {
                    throw new Error('Failed to fetch book');
                }
                const result = await response.json();
                setAttached(result);
                console.log(result);
                console.log(result.data);
            } catch (error) {
                console.error(error);
            }
        }; fetchAttach();
    }, []);

    const [filePreview, setFilePreview] = useState(null);
    const [uplo, setUplo] = useState("");

    const handleChange = (e) => {
        const { id, value } = e.target;
            setFormData({
                ...formData,
                [id]: value
            });
    };

    const navigate = useNavigate();
    const PrevPage = () => {
        navigate(-1);
    };


    const handleFileChange = (e) => {
        setUplo(e.target.value);
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        const fileURL = URL.createObjectURL(selectedFile);
        setFilePreview(fileURL);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:4000/attached', {
                file_path: uplo,
                topic: formData.topic,
                inc_id: formData.inc_id,
                date: formData.date,
                number: formData.number,
            })
            console.log(response);
            console.log(formData);
            alert("Extension added successfully");
            history(`/BookRec/${id}`);
        }
        catch (error) {
            console.error("Error:", error);
            alert(`Error: ${error.message}`);
        }

        
    };


    const steps = [
        <div className="step" key="step1">
            <div className="form-group">
                <label htmlFor="file">الملحق:</label>
                <input type="file" className="form-control" id="file" onChange={handleFileChange} />
            </div>
            <div className="form-group">
                <label htmlFor="topic">موضوع الملحق:</label>
                <input type="text" className="form-control" id="topic" value={formData.topic} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="number">رقم الملحق:</label>
                <input type="inc_id" className="form-control" id="number" value={formData.number} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="date">تاريخ الملحق:</label>
                <input type="date" className="form-control" id="date" value={formData.date} onChange={handleChange} />
            </div>
            <button type="button" className="btn btn-secondary" onClick={PrevPage}>رجوع</button>
            <button type="submit" className="btn btn-success" onClick={handleSubmit}>حفظ</button>
        </div>
    ];


    return (
        <div className="container">
            <form>
                <h2 className='text-center'>اضافة ملحق</h2>
                <div style={{ direction: 'ltr', textAlign: 'center' }}>
                    {steps.map((_, index) => (
                        <div className='NumSt' key={index}>
                            <div className={`Num`} style={index === currentStep ? { backgroundColor: '#1072E4', fontWeight: 'bold' } : {}}>
                                {index + 1}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='inf' style={{ textAlign: 'center' }}>
                    <span style={currentStep === 0 ? { fontWeight: 'bold', marginRight: '60px' } : {}}>معلومات الملحق</span>
                </div>
                {steps[currentStep]}
            </form>
            <div className='disBook'>
                {filePreview && (
                    file.type === 'application/pdf' ? (
                        <iframe src={filePreview} title="PDF Preview" width="100%" height="600px"></iframe>
                    ) : (
                        <img src={filePreview} alt="document Preview" />
                    )
                )}
            </div>
        </div>
    );
}

export default AddExtension;