import React, { useState, useEffect } from "react";
import "./Forms.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const MultiStepForm = () => {
  const fixedUrl = "http://127.0.0.1:4000";
  const { id : Id } = useParams();

  const history = useNavigate();
  const userToken = localStorage.getItem('userToken')
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    id: "",
    fullname: "",
    branch: "",
    sub_branch: "",
    mother_name: "",
    nationality: "",
    phone: "",
    job_position: "",
    governorate: "",
    address: "",
    name_doctor: "",
    doctor_specialty: "",
    place_work: "",
    clinic: false, // Use boolean value here
    unionFile: "",
        idFile: "",
    type: "",
    technical_manager: "",
    area: "",
    bed_capacity: "",
    number_departments: "",
    book_number: "",
    book_date: "",
    latest_renewal: "",
    user_id: 0,
    administrative_manager: "",
    company_name: "",
    renewal: "",
    note: "",
    ipn: "",
  });


  useEffect(() => {
    if (Id) {
    const fetchBook = async () => {
      try {
        const response = await fetch(`${fixedUrl}/cards/${Id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }
        const result = await response.json();
        setFormData(result.data.incoming[0]);
        // console.log(result);
        console.log(result.data.incoming);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }
  }, [Id]);


  const handleChange = (e) => {
    const { id, value, files, name } = e.target;
    if (files && files[0]) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      if (name === "branch") {
        workShops(value);
      }
    }
  };

  const handleCustomSubBranchChange = (event) => {
    setFormData({
      ...formData,
      sub_branch: event.target.value
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const navigate = useNavigate();
  const PrevPage = () => {
    navigate(-1);
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = Id ? `${fixedUrl}/cards/${Id}` : `${fixedUrl}/cards`;
    const method = Id ? 'PATCH' : 'POST';

    const data = new FormData();
    for (const key in formData) {
      if (key === "file" && formData[key] instanceof File) {
        data.append(key, formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    }

    // Debug: Log formDataToSend to check if all fields are correctly appended
  

    try {
      const response = await axios({
        method: method,
        url: url,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userToken}`,
        },
      });

      console.log(response);
      console.log(data);

      alert("Card added successfully");
      history("/Cards");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add card. Please try again.");
      console.log(formData);
    }
  };

  const workShops = (value) => {
    const wSh = document.getElementById("workSh");
    const Shop = document.getElementById("Shops");
    const cen = document.getElementById("cen");
    const Hosp = document.getElementById("Hosp");
    const clin = document.getElementById("clin");
    const mas = document.getElementById("masn");

    // Hide all dropdowns initially
    wSh.style.display = "none";
    Shop.style.display = "none";
    cen.style.display = "none";
    Hosp.style.display = "none";
    clin.style.display = "none";
    mas.style.display = "none";

    // Show the relevant dropdown based on the selected value
    if (value === "ورش") {
      wSh.style.display = "block";
    } else if (value === "محل") {
      Shop.style.display = "block";
    } else if (value === "مراكز") {
      cen.style.display = "block";
    } else if (value === "مستشفيات") {
      Hosp.style.display = "block";
    } else if (value === "عيادة تخصصية") {
      clin.style.display = "block";
    } else if (value === "مصانع" || value === "مكاتب السياحة العلاجية") {
      mas.style.display = "block";
    }
  };

  const steps = [
    <div className="step">
      <div className="form-group four">
        <label htmlFor="id">التسلسل:</label>
        <input
          type="number"
          className="form-control"
          name="id"
          id="id"
          value={formData.id}
          onChange={handleChange}
        />
      </div>
      <div className="form-group four">
        <label htmlFor="branch">التصنيف:</label>
        <select name="branch" value={formData.branch} onChange={handleChange}>
          <option value=""></option>
          <option value="محل">محل</option>
          <option value="ورش">ورش</option>
          <option value="مراكز">مراكز</option>
          <option value="مستشفيات">مستشفيات</option>
          <option value="عيادة تخصصية">عيادة تخصصية</option>
          <option value="مكاتب السياحة العلاجية">مكاتب السياحة العلاجية</option>
          <option value="مصانع">مصانع</option>
        </select>
      </div>
      <div className="form-group four">
        <label htmlFor="sub_branch">التصنيف الفرعي:</label>
        <select
          id="Shops"
          name="sub_branch"
          value={formData.sub_branch}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="محل بيع الاجهزة والمستلزمات الطبية">
            محل بيع الاجهزة والمستلزمات الطبية
          </option>
          <option value="محل بيع الاجهزة والمستلزمات المختبرية">
            محل بيع الاجهزة والمستلزمات المختبرية
          </option>
          <option value="محل بيع الاجهزة ومستلزمات طب الاسنان">
            محل بيع الاجهزة ومستلزمات طب الاسنان
          </option>
          <option value="محل بيع واستيراد الاجهزة والمستلزمات الطبية والمختبرية وطب الاسنان">
            محل بيع واستيراد الاجهزة والمستلزمات الطبية والمختبرية وطب الاسنان
          </option>
        </select>
        <select
          name="sub_branch"
          id="workSh"
          style={{ display: "none" }}
          value={formData.sub_branch}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="محل بيع واستيراد الاجهزة والمستلزمات الطبية والمختبرية وطب الاسنان وادوات صيانتها">
            محل بيع واستيراد الاجهزة والمستلزمات الطبية والمختبرية وطب الاسنان
            وادوات صيانتها
          </option>
          <option value="اطراف صناعية">اطراف صناعية</option>
          <option value="عيون صناعية">عيون صناعية</option>
          <option value="اطراف ذكية">اطراف ذكية</option>
        </select>
        <select
          name="sub_branch"
          id="cen"
          style={{ display: "none" }}
          value={formData.sub_branch}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="مركز طب وجراحة الفم والاسنان">
            مركز طب وجراحة الفم والاسنان
          </option>
          <option value="مركز قسطرة وجراحة القلب">
            مركز قسطرة وجراحة القلب
          </option>
          <option value="مكز علاج العقم واطفال الانابيب">
            مكز علاج العقم واطفال الانابيب
          </option>
          <option value="مركز خيري">مركز خيري</option>
          <option value="مركز صحي اولي">مركز صحي اولي</option>
          <option value="مركز اشعة تشخيصية">مركز اشعة تشخيصية</option>
          <option value="مركز جراحة العظام والكسور">
            مركز جراحة العظام والكسور
          </option>
          <option value="مركز تنظير الجهاز الهعضمي">
            مركز تنظير الجهاز الهعضمي
          </option>
          <option value="مركز امراض السكري">مركز امراض السكري</option>
          <option value="مركز طب وجراحة العيون">مركز طب وجراحة العيون</option>
          <option value="مركز ليزك العيون">مركز ليزك العيون</option>
        </select>
        <select
          name="sub_branch"
          id="Hosp"
          style={{ display: "none"  }}
          value={formData.sub_branch}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="اهلي عام">اهلي عام</option>
          <option value="اهلي تخصصي">اهلي تخصصي</option>
          <option value="استثماري">استثماري</option>
          <option value="اهلي اخرى">اهلي اخرى</option>
        </select>
        {formData.sub_branch === "اهلي اخرى" && (
          <input
            type="text"
            name="sub_branch"
            value={formData.custom_sub_branch || ''}
            onChange={handleCustomSubBranchChange}
          />
        )}
        <select
          name="sub_branch"
          id="clin"
          style={{ display: "none" }}
          value={formData.sub_branch}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="عيادة تخصصية للمفراس الحلزوني">
            عيادة تخصصية للمفراس الحلزوني
          </option>
          <option value="عيادة تخصصية للرنين المغناطيسي">
            عيادة تخصصية للرنين المغناطيسي
          </option>
          <option value="عيادة تخصصية للاشعة والسونار">
            عيادة تخصصية للاشعة والسونار
          </option>
          <option value="عيادة جراحية يومية">عيادة جراحية يومية</option>
        </select>
        <input
          type="text"
          name="sub_branch"
          id="masn"
          style={{ display: "none" }}
          value={formData.sub_branch}
          onChange={handleChange}
        />
      </div>
      <div className="form-group four">
        <label htmlFor="fullname">الاسم الرباعي و اللقب:</label>
        <input
          type="text"
          className="form-control"
          name="fullname"
          id="fullname"
          value={formData.fullname}
          onChange={handleChange}
        />
      </div>
      <div className="form-group four">
        <label htmlFor="mother_name">اسم الام الثلاثي:</label>
        <input
          type="text"
          className="form-control"
          name="mother_name"
          id="mother_name"
          value={formData.mother_name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group four">
        <label htmlFor="nationality">الجنسية:</label>
        <input
          type="text"
          className="form-control"
          name="nationality"
          id="nationality"
          value={formData.nationality}
          onChange={handleChange}
        />
      </div>
      <div className="form-group four">
        <label htmlFor="phone">رقم الهاتف:</label>
        <input
          type="text"
          className="form-control"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <button type="button" className="btn btn-secondary" onClick={PrevPage}>
        رجوع
      </button>
      <button type="button" className="btn btn-primary" onClick={nextStep}>
        التالي
      </button>
    </div>,
    <div className="step">
      <div className="form-group">
        <label htmlFor="job_position">الموقف الوظيفي:</label>
        <input
          type="text"
          className="form-control"
          name="job_position"
          id="job_position"
          value={formData.job_position}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="governorate">المحافظة:</label>
        <input
          type="text"
          className="form-control"
          name="governorate"
          id="governorate"
          value={formData.governorate}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">العنوان:</label>
        <input
          type="text"
          className="form-control"
          name="address"
          id="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="idFile">المستمسكات:</label>
        <input
          type="file"
          className="form-control"
          name="idFile"
          id="idFile"
          onChange={handleChange}
        />
      </div>
      <button type="button" className="btn btn-secondary" onClick={prevStep}>
        رجوع
      </button>
      <button type="button" className="btn btn-primary" onClick={nextStep}>
        التالي
      </button>
    </div>,
    <div className="step">
      <div className="form-group">
        <label htmlFor="name_doctor">اسم الطبيب المشرف:</label>
        <input
          type="text"
          className="form-control"
          name="name_doctor"
          id="name_doctor"
          value={formData.name_doctor}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="doctor_specialty">اختصاص الطبيب:</label>
        <input
          type="text"
          className="form-control"
          name="doctor_specialty"
          id="doctor_specialty"
          value={formData.doctor_specialty}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="place_work">محل اشتغاله:</label>
        <input
          type="text"
          className="form-control"
          name="place_work"
          id="place_work"
          value={formData.place_work}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="clinic">يوجد لديه عيادة:</label>
        <select name="clinic" value={formData.clinic} onChange={handleChange}>
          <option value=""></option>
          <option className="form-control" value={false}>
            لا
          </option>
          <option className="form-control" value={true}>
            نعم
          </option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="unionFile">هوية نقابة مجددة:</label>
        <input
          type="file"
          className="form-control"
          name="unionFile"
          id="unionFile"
          onChange={handleChange}
        />
      </div>
      <button type="button" className="btn btn-secondary" onClick={prevStep}>
        رجوع
      </button>
      <button type="button" className="btn btn-primary" onClick={nextStep}>
        التالي
      </button>
    </div>,
    <div className="step">
      <div className="form-group four">
        <label htmlFor="company_name">اسم المؤسسة الصحية الخاصة:</label>
        <input
          type="text"
          className="form-control"
          name="company_name"
          id="company_name"
          value={formData.company_name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group four">
        <label htmlFor="type">نوع المؤسسة:</label>
        <input
          type="text"
          className="form-control"
          name="type"
          id="type"
          value={formData.type}
          onChange={handleChange}
        />
      </div>
      <div className="form-group four">
        <label htmlFor="technical_manager">اسم المدير الفني:</label>
        <input
          type="text"
          className="form-control"
          name="technical_manager"
          id="technical_manager"
          value={formData.technical_manager}
          onChange={handleChange}
        />
      </div>
      <div className="form-group four">
        <label htmlFor="administrative_manager">اسم المدير الاداري:</label>
        <input
          type="text"
          className="form-control"
          name="administrative_manager"
          id="administrative_manager"
          value={formData.administrative_manager}
          onChange={handleChange}
        />
      </div>
      <div className="form-group four">
        <label htmlFor="area">مساحة المؤسسة:</label>
        <input
          type="text"
          className="form-control"
          name="area"
          id="area"
          value={formData.area}
          onChange={handleChange}
        />
      </div>
      <div className="form-group four">
        <label htmlFor="bed_capacity">عدد السعة السريرية:</label>
        <input
          type="text"
          className="form-control"
          name="bed_capacity"
          id="bed_capacity"
          value={formData.bed_capacity}
          onChange={handleChange}
        />
      </div>
      <div className="form-group four">
        <label htmlFor="number_departments">
          عدد الاقسام والوحدات التي فيها:
        </label>
        <input
          type="number"
          className="form-control"
          name="number_departments"
          id="number_departments"
          onChange={handleChange}
        />
      </div>
      <button type="button" className="btn btn-secondary" onClick={prevStep}>
        رجوع
      </button>
      <button type="button" className="btn btn-primary" onClick={nextStep}>
        التالي
      </button>
    </div>,
    <div className="step">
      <div className="form-group one">
        <label htmlFor="book_number">رقم كتاب منح الإجازة:</label>
        <input
          type="text"
          className="form-control"
          name="book_number"
          id="book_number"
          value={formData.book_number}
          onChange={handleChange}
        />
      </div>
      <div className="form-group one">
        <label htmlFor="book_date">تاريخ كتاب منح الإجازة:</label>
        <input
          type="text"
          className="form-control"
          name="book_date"
          id="book_date"
          value={formData.book_date}
          onChange={handleChange}
        />
      </div>
      <div className="form-group one">
        <label htmlFor="latest_renewal">آخر تجديد:</label>
        <input
          type="text"
          className="form-control"
          name="latest_renewal"
          id="latest_renewal"
          value={formData.latest_renewal}
          onChange={handleChange}
        />
      </div>
      <div className="form-group one">
        <label htmlFor="renewal"> التجديد:</label>
        <select name="renewal" value={formData.renewal} onChange={handleChange}>
          <option value=""></option>
          <option value="فتح جديد">فتح جديد</option>
          <option value="غير مجدد">غير مجدد</option>
          <option value="مجدد لغاية">مجدد لغاية</option>
        </select>
      </div>
      <div className="form-group one">
        <label htmlFor="ipn">رقم الاجازة الاستثمارية:</label>
        <input
          type="text"
          className="form-control"
          name="ipn"
          id="ipn"
          value={formData.ipn}
          onChange={handleChange}
        />
      </div>
      <div className="form-group one">
        <label htmlFor="note">ملاحظة:</label>
        <input
          type="text"
          className="form-control"
          name="note"
          id="note"
          value={formData.note}
          onChange={handleChange}
        />
      </div>
      <button type="button" className="btn btn-secondary" onClick={prevStep}>
        رجوع
      </button>
      <button type="submit" onClick={handleSubmit} className="btn btn-success">
        حفظ
      </button>
    </div>,
  ];

  return (
    <div className="container">
      <h2 className="text-center">اضافة بطاقة جديدة</h2>
      <form>
        <div style={{ direction: "ltr", textAlign: "center" }}>
          {steps.map((_, index) => (
            <div className="NumSt" key={index}>
              <div
                className={`Num ${index <= 3 ? "aft" : ""}`}
                style={
                  index === currentStep
                    ? { backgroundColor: "#1072E4", fontWeight: "bold" }
                    : {}
                }
              >
                {index + 1}
              </div>
            </div>
          ))}
        </div>
        <div className="inf" style={{ textAlign: "center" }}>
          <span style={currentStep === 4 ? { fontWeight: "bold" } : {}}>
            معلومات كتاب الاجازة
          </span>
          <span style={currentStep === 3 ? { fontWeight: "bold" } : {}}>
            معلومات المؤسسة
          </span>
          <span style={currentStep === 2 ? { fontWeight: "bold" } : {}}>
            معلومات الطبيب
          </span>
          <span style={currentStep === 1 ? { fontWeight: "bold" } : {}}>
            معلومات شخصية2
          </span>
          <span style={currentStep === 0 ? { fontWeight: "bold" } : {}}>
            معلومات شخصية
          </span>
        </div>
        {steps[currentStep]}
      </form>
    </div>
  );
};

export default MultiStepForm;
