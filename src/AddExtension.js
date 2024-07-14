import React, { useState } from 'react';
import './App.css';
import './Forms.css';
import { useNavigate } from 'react-router-dom';

const AddExtension = () => {
    const [currentStep] = useState(0);
    const [formData, setFormData] = useState({
        document: '',
        title: '',
        number: '',
        bookDate: '',
    });

    const [documentPreview, setdocumentPreview] = useState(null);

    const handleChange = (e) => {
        const { id, value, documents } = e.target;
        if (documents) {
            const document = documents[0];
            setFormData({
                ...formData,
                [id]: document
        });

        const documentURL = URL.createObjectURL(document);
        if (document.type === 'application/pdf' || document.type.startsWith('image/')) {
                setdocumentPreview(documentURL);
            } else {
                setdocumentPreview(null);
            }
        } else {
            setFormData({
                ...formData,
                [id]: value
            });
        }
    };

    const navigate = useNavigate();
    const PrevPage = () => {
        navigate(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form submitted!');
        console.log(formData);
    };


    const steps = [
        <div className="step" key="step1">
            <div className="form-group">
                <label htmlFor="document">الملحق:</label>
                <input type="document" className="form-control" id="document" onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="title">موضوع الملحق:</label>
                <input type="text" className="form-control" id="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="number">رقم الملحق:</label>
                <input type="number" className="form-control" id="number" value={formData.number} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="bookDate">تاريخ الملحق:</label>
                <input type="date" className="form-control" id="bookDate" value={formData.bookDate} onChange={handleChange} required />
            </div>
            <button type="button" className="btn btn-secondary" onClick={PrevPage}>رجوع</button>
            <button type="submit" className="btn btn-success">حفظ</button>
        </div>
    ];


    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
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
                {documentPreview && (
                    formData.document.type === 'application/pdf' ? (
                        <iframe src={documentPreview} title="PDF Preview" width="100%" height="600px"></iframe>
                    ) : (
                        <img src={documentPreview} alt="document Preview" />
                    )
                )}
            </div>
        </div>
    );
}

export default AddExtension;