import React, { useState } from 'react';
import './App.css';
import './Forms.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AddBookPublished = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        account_id: '',
        type: null,
        document_number: '',
        document_date: '',
        subject: '',
        executing_uthority: '',
        addressed_entity: '',
        note:"",
        user_id: "0"
    });
    const history = useNavigate();

    const [uplo, setUplo] = useState("");
    const [file, setFile] = useState(null);

    const [filePreview, setFilePreview] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
            setFormData({
                ...formData,
                [id]: value
            });
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const navigate = useNavigate();
    const { state } = useLocation();
    const PrevPage = () => {
        navigate(-1);
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
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
            const response = await axios.post("http://127.0.0.1:4000/outgoing/", {
                file_path: uplo,
                account_id: formData.account_id,
                type: formData.type,
                document_number: formData.document_number,
                document_date: formData.document_date,
                subject: formData.subject,
                executing_uthority: formData.executing_uthority,
                addressed_entity: formData.addressed_entity,
                note: formData.note,
                user_id: formData.user_id,
            }
        );
        console.log(response.data);
        console.log(response);
        console.log(formData)
        alert("Book added successfully");
        
        history('/PublishedBook');
    }
    catch (error) {
        console.error("Error:", error);
        alert(`Error: ${error.message}`);
    }
        // alert('Form submitted!');
        // console.log(formData);
    };

    const steps = [
        <div className="step" key="step1">
            <div className="form-group">
                <label htmlFor="uplo">الكتاب:</label>
                <input type="file" className="form-control" id="uplo" onChange={handleFileChange}  />
                {console.log(uplo)}
            </div>
            <div className="form-group">
                <label htmlFor="account_id">تسلسل بطاقة:</label>
                <input type="text" className="form-control" id="account_id" value={formData.account_id} onChange={handleChange}  />
            </div>
            <div className="form-group">
                <label htmlFor="type">نوع الكتاب:</label>
                <select className="form-control" id="type" value={formData.type} onChange={handleChange} >
                    <option value=""></option>
                    <option value={1}>كتاب</option>
                    <option value={2}>مذكرة</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="document_number">رقم الكتاب:</label>
                <input type="number" className="form-control" id="document_number" value={formData.document_number} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="document_date">تاريخ الكتاب:</label>
                <input type="date" className="form-control" id="document_date" value={formData.document_date} onChange={handleChange} />
            </div>
            <button type="button" className="btn btn-secondary" onClick={PrevPage}>رجوع</button>
            <button type="button" className="btn btn-primary" onClick={nextStep}>التالي</button>
        </div>,
        <div className="step" key="step2">
            <div className="form-group">
                <label htmlFor="subject">موضوع الكتاب:</label>
                <input type="text" className="form-control" id="subject" value={formData.subject} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="executing_uthority">الجهة المنفذة:</label>
                <input type="text" className="form-control" id="executing_uthority" value={formData.executing_uthority} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="addressed_entity">الجهة الموجه لها:</label>
                <input type="text" className="form-control" id="addressed_entity" value={formData.addressed_entity} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="note">ملاحظة:</label>
                <input type="text" className="form-control" id="note" value={formData.note} onChange={handleChange} />
            </div>
            <button type="button" className="btn btn-secondary" onClick={prevStep}>رجوع</button>
            <button type="submit" className="btn btn-success">حفظ</button>
        </div>
    ];

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2 className='text-center'>اضافة كتاب صادر جديد</h2>
                <div style={{ direction: 'ltr', textAlign: 'center' }}>
                    {steps.map((_, index) => (
                        <div className='NumSt' key={index}>
                            <div className={`Num ${index <= 0 ? 'aft' : ''}`} style={index === currentStep ? { backgroundColor: '#1072E4', fontWeight: 'bold' } : {}}>
                                {index + 1}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='inf' style={{ textAlign: 'center' }}>
                    <span style={currentStep === 1 ? { fontWeight: 'bold', marginLeft: '50px' } : {}}>معلومات اخرى</span>
                    <span style={currentStep === 0 ? { fontWeight: 'bold', marginRight: '60px' } : {}}>معلومات الكتاب</span>
                </div>
                {steps[currentStep]}
            </form>
            <div className='disBook'>
                {filePreview && (
                    file.type === 'application/pdf' ? (
                        <iframe src={filePreview} title="PDF Preview" width="100%" height="600px"></iframe>
                    ) : (
                        <img src={filePreview} alt="File Preview" />
                    )
                )}
            </div>
        </div>
    );
}

export default AddBookPublished;
