import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import './Forms.css';



const AddBook = () => {
    const { Id } = useParams();
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        account_id: null,
        type: 1,
        book_number: "",
        book_date: "",
        issuing_authority: '',
        topic: "",
        incoming_number: "",
        referral:"",
        section:"",
        user_id: 0,
        note:"",
        incoming_date:"",
    });

    const [uplo, setUplo] = useState();
    const [file, setFile] = useState(null);

    // useEffect(() => {
    //     if (uplo) {
    //       const objectUrl = URL.createObjectURL(uplo); // create here
    //       setPreview(objectUrl);
    //     }
    //     return () => URL.revokeObjectURL(uplo);      // And revoke on unmount
    //   }, [uplo]);

    const [filePreview, setFilePreview] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (Id) {
            const fetchBook = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:4000/documents/${Id}`);
                    setFormData(response.data.doc);
                    console.log(response.data);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchBook();
        }
    }, [Id]);

    const handleChange = (e) => {
        const { id, value } = e.target;
            setFormData({
                ...formData,
                [id]: value
            });
        };

    const handleRemoveFile = () => {
        setFormData({
            ...formData,
            file: null
        });
        setFilePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };


    const handleFileChange = (e) => {
        setUplo(e.target.files[0]);
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        const fileURL = URL.createObjectURL(selectedFile);
        setFilePreview(fileURL);

        console.log('File selected:', selectedFile);
        console.log('File name:', selectedFile.name);
        console.log('File type:', selectedFile.type);
        console.log('File size:', selectedFile.size);
        
    }
    

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const formDataToSend = new FormData();
    formDataToSend.append('document', file);

    for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      const lop = uplo;
      console.log(formDataToSend.get("document".value));

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const url = Id ? `http://127.0.0.1:4000/income${Id}` : 'http://127.0.0.1:4000/income';
        // const method = Id ? 'PUT' : 'POST';
        
      console.log(file.name);
        

        try {
            const response = await axios.post(
                "http://127.0.0.1:4000/income", 
                {
                account_id: formData.account_id,
                type: formData.type,
                book_number: formData.book_number,
                book_date: formData.book_date,
                topic: formData.topic,
                user_id: formData.user_id,
                note: formData.note,
                incoming_number: formData.incoming_number,
                file_path: file.name,
                incoming_date: formData.incoming_date,
                issuing_authority: formData.issuing_authority,
                section: formData.section,
                referral: formData.referral,
                }
        );
            console.log(response.data);
            console.log(response);
            console.log(formData)
            alert("Book added successfully!");
            navigate('/BookReceived'); // Adjust the path to where you want to navigate after success
        } catch (error) {
            console.error("Error:", error);
            alert(`Error: ${error.message}`);
        }
    };

    const steps = [
        <div className="step" key="step1">
            <div className="form-group one">
                <label htmlFor="file">الكتاب:</label>
                <input type="file" className="form-control" id="file" name='document' onChange={handleFileChange} />
                {/* {console.log(uplo)}
                {console.log(filePreview)} */}
            </div>
            <div className="form-group one">
                <label htmlFor="account_id">تسلسل بطاقة:</label>
                <input type="text" className="form-control" id="account_id" value={formData.account_id} onChange={handleChange} />
            </div>
            <div className="form-group one">
                <label htmlFor="section">الشعبة:</label>
                <select className="form-control" id='section' name='section' value={formData.section} onChange={handleChange}>
                    <option value=""></option>
                    <option value="الاجازات">الاجازات</option>
                    <option value="النفقة الخاصة">النفقة الخاصة</option>
                    <option value="الاستثمار الصحي الخاص">الاستثمار الصحي الخاص</option>
                    <option value="الهندسية">الهندسية</option>
                    <option value="الاوراق">الاوراق</option>
                </select>
            </div>
            <div className="form-group one">
                <label htmlFor="type">نوع الكتاب:</label>
                <select className="form-control" id="type" value={formData.type} onChange={handleChange} >
                    <option value=""></option>
                    <option value={1}>كتاب</option>
                    <option value={2}>مذكرة</option>
                    <option value={3}>طلب</option>
                </select>
            </div>
            <div className="form-group one">
                <label htmlFor="book_number">رقم الكتاب:</label>
                <input type="text" className="form-control" id="book_number" value={formData.book_number} onChange={handleChange} />
            </div>
            <div className="form-group one">
                <label htmlFor="book_date">تاريخ الكتاب:</label>
                <input type="text" className="form-control" id="book_date" value={formData.book_date} onChange={handleChange} />
            </div>
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>رجوع</button>
            <button type="button" className="btn btn-primary" onClick={nextStep}>التالي</button>
        </div>,
        <div className="step" key="step2">
            <div className="form-group">
                <label htmlFor="issuing_authority">جهة الكتاب:</label>
                <input type="text" className="form-control" id="issuing_authority" value={formData.issuing_authority} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="topic">موضوع الكتاب:</label>
                <input type="text" className="form-control" id="topic" value={formData.topic} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="incoming_number">رقم الوارد:</label>
                <input type="number" className="form-control" id="incoming_number" value={formData.incoming_number} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="date_added">تاريخ الوارد:</label>
                <input type="text" className="form-control" id="date_added" value={formData.date_added} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>الاحالة:</label>
                <div>
                    <input type="radio" name='referral' id='referral' value='مدير القسم' checked={formData.referral === 'مدير القسم'} onChange={handleChange} />
                    <label>مدير القسم</label>
                    <input type="radio" name='referral' id='referral' value='معاون مدير القسم' checked={formData.referral === 'معاون مدير القسم'} onChange={handleChange} />
                    <label>معاون مدير القسم</label>
                </div>
            </div>
            <button type="button" className="btn btn-secondary" onClick={prevStep}>رجوع</button>
            <button type="submit" onClick={handleSubmit} className="btn btn-success">حفظ</button>
        </div>
    ];

    return (
        <div className="container">
            <form action='' method='post'>
                <h2 className='text-center'>{Id ? 'تعديل الكتاب' : 'اضافة كتاب وارد جديد'}</h2>
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

export default AddBook;
