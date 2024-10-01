import React, { useState } from 'react';
import classNames from 'classnames';

import {
    CButton,
    CCard,
    CCardBody,
    CCardImage,
    CCardTitle,
    CCol,
    CContainer,
    CForm,
    CFormCheck,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CRow,
} from '@coreui/react';
import { Container, Select } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import moment from 'moment/moment';
import * as Yup from "yup";
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


// // Import the validation function
// import {validateForm} from './formValidation';  // Adjust the path based on your file structure

const CreateCustomer = () => {
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        nationality: '',
        gender: '',
        maritalStatus: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        occupation: '',
        annualIncome: '',
        isAgreed: false
    });

    let history = useNavigate();
    const [isAgreed, setIsAgreed] = useState(false);

    const initialValues = {
        firstName: state.firstName,
        lastName: state.lastName,
        birthDate: state.birthDate,
        nationality: state.nationality,
        gender: state.gender,
        maritalStatus: state.maritalStatus,
        phone: state.phone,
        email: state.email,
        address: state.address,
        city: state.city,
        state: state.state,
        country: state.country,
        pincode: state.pincode,
        occupation: state.occupation,
        annualIncome: state.annualIncome,
        isAgreed: state.isAgreed
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        //if (name === "phoneNumber") {
        //   const val = value.replace(/[^0-9]/g, "");
        //   const formattedPhoneNumber = val.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        //   setState((prevState) => ({
        //     ...prevState,
        //     [name]: formattedPhoneNumber
        //   }))
        // } else {
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    //}

    const dateHandleChange = (name, value) => {
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const selectFieldHandleChange = (name, value) => {
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    // Handle form submit
    const SubmitData = (values) => {
        setState((prevState) => ({ ...prevState }))
        let payload = {
            "customerId": "",
            "firstName": values.firstName,
            "lastName": values.lastName,
            "dob": moment(values.birthDate).format("MM-DD-YYYY"),
            "gender": values.gender,
            "maritalstatus": values.maritalStatus,
            "nationality": values.nationality,
            "phone": values.phone,
            "email": values.email,
            "address": values.address,
            "city": values.city,
            "state": values.state,
            "country": values.country,
            "pincode": values.pincode,
            "occupation": values.occupation,
            "annualIncome": values.annualIncome,
        }
        console.log("Payload that will be submitted is :", payload);
        // Swal.fire(
        //              //err.response.data.message,
        //              'Customer created successfully '
        //         )


         axios.post(`http://localhost:8080/create`, payload).then((res) => {
         console.log("response from background " + res);
         Swal.fire(
                     err.response.data.message,
                     'Customer created successfully '
                )
                setState((prevState)=>({...prevState}));

        }).catch(err => {
            console.error("Error sending data:", err.response ? err.response.data : err.message);
        setState((prevState) => ({ ...prevState }));

            Swal.fire(
                err.response.data.message,
                'Please try again '
            )
        })

    };



    const ValidationSchema = () => {
        return Yup.object().shape({
            firstName: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed").required("First Name is required"),
            lastName: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed").required("Last Name is required"),
            birthDate: Yup.string().required("Birth date is required").test(
                "DOB",
                "Age must be at least 18 years",
                (date) => moment().diff(moment(date), "years") >= 18
            ),
            nationality: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed").required("Nationality is required"),
            gender: Yup.string().required("Gender is required"),
            maritalStatus: Yup.string().required("Marital Status is required"),
            phone: Yup.string().min(12, 'Minimum 10 digits!').max(14, 'Maximum 14 digits!').required("Phone Number is required"),
            email: Yup.string().required("Email is required").email("Invalid mail address"),
            address: Yup.string().required("Address is required"),
            city: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed").required("City is required"),
            state: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed").required("State is required"),
            country: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed").required("Country is required"),
            pincode: Yup.string().min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits').required("Pincode is required"),
            occupation: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed").required("Occupation is required"),
            //annualIncome  : Yup.string().required("Annual Income is required"), 
            //isAgreed: Yup.boolean().oneOf([true], "You must agree to the terms and conditions."),
            //.required("You must agree to the terms and conditions."),

        })
    }


    return (
        <>
            <ToastContainer />
            <Container className="d-flex justify-content-center align-items-center">
                <CRow>
                    <CCol>
                        <CCard className="mb-3 d-flex justify-content-center align-items-center" style={{ maxWidth: '980px' }}>
                            <CRow className="g-0">
                                <CCol md={6}>
                                    <CCardImage src='src/assets/images/registor.jpg' style={{ height: '100%' }} />
                                </CCol>
                                <CCol md={6}>
                                    <CCol>
                                        <CCardBody>
                                            <CCardTitle><strong>Customer Registration Form</strong></CCardTitle>
                                            <Formik
                                                enableReinitialize="true"
                                                initialValues={initialValues}
                                                validationSchema={ValidationSchema}
                                                validateOnBlur={true}  // Validates when input loses focus
                                                validateOnChange={true}  // Validation only on form submission
                                                onSubmit={SubmitData}
                                            >
                                                {({ values, setFieldValue, handleChange, handleSubmit, resetForm, handleBlur, errors, touched }) => (
                                                    <Form id="myForm" onSubmit={handleSubmit} >
                                                        <CRow>
                                                            <CCol className="text-start" >
                                                                {/* <CCardSubtitle>Customer Details</CCardSubtitle> */}
                                                                <div >Personal Details:</div>
                                                            </CCol>
                                                        </CRow>
                                                        <CRow xs={{ gutter: 2 }}>
                                                            <CCol>
                                                                <CFormInput id="floatingInput"
                                                                    type="text"
                                                                    name="firstName"
                                                                    floatingClassName="mb-2"
                                                                    floatingLabel="First Name"
                                                                    placeholder="First Name"
                                                                    value={values.target}
                                                                    onChange={handleInputChange}
                                                                    onChangeCapture={handleChange}
                                                                    onBlur={handleBlur}
                                                                    invalid={touched.firstName && !!errors.firstName} />
                                                                    
                                                                <ErrorMessage name="firstName" component="div" className='errmsg text-danger'></ErrorMessage>
                                                            </CCol>
                                                            <CCol>
                                                                <CFormInput id="floatingInput"
                                                                    type="text"
                                                                    name="lastName"
                                                                    floatingClassName="mb-2"
                                                                    floatingLabel="Last Name"
                                                                    placeholder="Last Name"
                                                                    value={values.target}
                                                                    onChange={handleInputChange}
                                                                    onChangeCapture={handleChange}
                                                                    onBlur={handleBlur}
                                                                    invalid={touched.lastName && !!errors.lastName}
                                                                />
                                                                <ErrorMessage name="lastName" component="div" className='errmsg text-danger'></ErrorMessage>
                                                            </CCol>
                                                        </CRow>


                                                        <CRow xs={{ gutter: 2 }}>
                                                            <CCol >
                                                                <CFormInput type="date"
                                                                    id="floatingInput"
                                                                    name="birthDate"
                                                                    floatingClassName="mb-2"
                                                                    floatingLabel="DOB"
                                                                    placeholderText="mm/dd/yyyy"
                                                                    selected={values.birthDate ? new Date(values.birthDate) : null}
                                                                    onChange={(e) => { dateHandleChange("birthDate", e) }}
                                                                    onChangeCapture={handleChange}
                                                                    onBlur={handleBlur}
                                                                    invalid={touched.birthDate && !!errors.birthDate}
                                                                />
                                                                <ErrorMessage name="birthDate" component="div" className='errmsg text-danger'></ErrorMessage>
                                                            </CCol>
                                                            <CCol >
                                                                <CFormInput type="text"
                                                                    //id="floatingInput"
                                                                    name="nationality"
                                                                    floatingClassName="mb-2"
                                                                    floatingLabel="Nationality"
                                                                    placeholder="Nationality"
                                                                    value={values.target}
                                                                    onChange={handleInputChange}
                                                                    onChangeCapture={handleChange}
                                                                    onBlur={handleBlur}
                                                                    invalid={touched.nationality && !!errors.nationality}
                                                                />
                                                                <ErrorMessage name="nationality" component="div" className='errmsg text-danger'></ErrorMessage>
                                                            </CCol>
                                                        </CRow>
                                                        <CRow xs={{ gutter: 2 }}>
                                                            <CCol className='text-start'>
                                                                {/* <CFormLabel> Gender </CFormLabel> */}
                                                                <CFormSelect
                                                                    size="md" name="gender" className="mb-2" style={{ color: 'gray' }}
                                                                    floatingClassName="mb-2"
                                                                    floatingLabel="Gender"
                                                                    placeholder="Gender"
                                                                    defaultValue={state.gender}
                                                                    onChange={(e) => {
                                                                        //setFieldValue("gender", e), 
                                                                        selectFieldHandleChange("gender", e.target.value)
                                                                    }}
                                                                    options={[
                                                                        { value: 'select', label: 'Select' },
                                                                        { value: 'Male', label: 'Male' },
                                                                        { value: 'Female', label: 'Female' },
                                                                        { value: 'Other', label: 'Other' },
                                                                    ]}
                                                                    invalid={touched.gender && !!errors.gender}
                                                                />
                                                                <ErrorMessage name="gender" component="div" className='errmsg text-danger'></ErrorMessage>
                                                            </CCol>
                                                            <CCol className='text-start'>
                                                                {/* <CFormLabel> Marital Status </CFormLabel> */}
                                                                <CFormSelect
                                                                    size="md" name="maritalStatus" className="mb-2" style={{ color: 'gray' }}
                                                                    //floatingClassName="mb-2"
                                                                    floatingLabel="Marital Status"
                                                                    placeholder="Marital Status"
                                                                    defaultValue={state.maritalStatus}
                                                                    onBlur={handleBlur}
                                                                    options={[
                                                                        { value: 'select', label: 'Select' },
                                                                        { label: 'Married', value: 'married' },
                                                                        { label: 'Unmarried', value: 'unmarried' },
                                                                    ]}
                                                                    onChange={(e) => {
                                                                        //setFieldValue("maritalStatus", e.target.value),
                                                                        selectFieldHandleChange("maritalStatus", e.target.value)
                                                                    }}
                                                                    onChangeCapture={handleChange}
                                                                    invalid={touched.maritalStatus && !!errors.maritalStatus}
                                                                />
                                                                <ErrorMessage name="maritalStatus" component="div" className='errmsg text-danger'></ErrorMessage>
                                                            </CCol>
                                                        </CRow>
                                                        <CRow>
                                                            <CCol className="text-start" >
                                                                <div >Contact Details:</div>
                                                            </CCol>
                                                        </CRow>
                                                        <CRow >
                                                            <CCol >
                                                                <CFormInput type="text"
                                                                    id="floatingInput"
                                                                    name="phone"
                                                                    value={values.target}
                                                                    floatingClassName="mb-2"
                                                                    floatingLabel="Phone number"
                                                                    placeholder="Phone Number"
                                                                    onChange={handleInputChange}
                                                                    onChangeCapture={handleChange}
                                                                    onBlur={handleBlur}
                                                                    invalid={touched.phone && !!errors.phone}
                                                                />
                                                                <ErrorMessage name="phone" component="div" className='errmsg text-danger'></ErrorMessage>
                                                            </CCol>
                                                            <CCol >
                                                                <CFormInput type="text"
                                                                    id="floatingInput"
                                                                    name="email"
                                                                    value={values.target}
                                                                    floatingClassName="mb-2"
                                                                    floatingLabel="Email address"
                                                                    placeholder="name@example.com"
                                                                    onChange={handleInputChange}
                                                                    onChangeCapture={handleChange}
                                                                    onBlur={handleBlur}
                                                                    invalid={touched.email && !!errors.email}
                                                                />
                                                                <ErrorMessage name="email" component="div" className='errmsg text-danger'></ErrorMessage>
                                                            </CCol>
                                                        </CRow>
                                                        <CRow>
                                                            <CCol className="text-start" >
                                                                <div >Address:</div>
                                                            </CCol>
                                                        </CRow>
                                                        <CRow>
                                                            <CCol>
                                                                <CFormInput type="text"
                                                                    id="floatingInput"
                                                                    name="address"
                                                                    value={values.target}
                                                                    floatingClassName="mb-2"
                                                                    floatingLabel="Street address"
                                                                    placeholder="Street address"
                                                                    onChange={handleInputChange}
                                                                    onChangeCapture={handleChange}
                                                                    onBlur={handleBlur}
                                                                    invalid={touched.address && !!errors.address}
                                                                />
                                                                <ErrorMessage name="address" component="div" className='errmsg text-danger'></ErrorMessage>
                                                            </CCol>
                                                        </CRow>
                                                        <CRow xs={{ gutter: 3 }}>
                                                            <CCol><CFormInput type="text"
                                                                id="floatingInput"
                                                                name="city"
                                                                value={values.target}
                                                                floatingClassName="mb-2"
                                                                floatingLabel="City"
                                                                placeholder="City"
                                                                onChange={handleInputChange}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.city && !!errors.city}
                                                            />
                                                                <ErrorMessage name="city" component="div" className='errmsg text-danger'></ErrorMessage>
                                                            </CCol>
                                                            <CCol><CFormInput type="text"
                                                                id="floatingInput"
                                                                name="state"
                                                                value={values.target}
                                                                floatingClassName="mb-2"
                                                                floatingLabel="State"
                                                                placeholder="State"
                                                                onChange={handleInputChange}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.state && !!errors.state}
                                                            />
                                                                <ErrorMessage name="state" component="div" className='errmsg text-danger'></ErrorMessage>
                                                            </CCol>
                                                            <CCol><CFormInput type="text"
                                                                id="floatingInput"
                                                                name="country"
                                                                value={values.target}
                                                                floatingClassName="mb-2"
                                                                floatingLabel="Country"
                                                                placeholder="Country"
                                                                onChange={handleInputChange}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.country && !!errors.country}
                                                            />
                                                                <ErrorMessage name="country" component="div" className='errmsg text-danger'></ErrorMessage>
                                                            </CCol>
                                                        </CRow>
                                                        <CRow>
                                                            <CCol ><CFormInput type="text"
                                                                id="floatingInput"
                                                                name="pincode"
                                                                value={values.target}
                                                                floatingClassName="mb-2"
                                                                floatingLabel="Pincode"
                                                                placeholder="Pincode"
                                                                onChange={handleInputChange}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.pincode && !!errors.pincode}
                                                            />
                                                                <ErrorMessage name="pincode" component="div" className='errmsg text-danger'></ErrorMessage>
                                                            </CCol>
                                                        </CRow>
                                                        <CRow>
                                                            <CCol className="text-start" >
                                                                <div >Employment Information:</div>
                                                            </CCol>
                                                        </CRow>
                                                        <CRow xs={{ gutter: 2 }}>
                                                            <CCol>
                                                                <CFormInput type="text"
                                                                    id="floatingInput"
                                                                    name="occupation"
                                                                    value={values.target}
                                                                    floatingClassName="mb-2"
                                                                    floatingLabel="Occupation"
                                                                    placeholder="Occupation"
                                                                    onChange={handleInputChange}
                                                                    onChangeCapture={handleChange}
                                                                    onBlur={handleBlur}
                                                                    invalid={touched.occupation && !!errors.occupation}
                                                                />
                                                                <ErrorMessage name="occupation" component="div" className='errmsg text-danger'></ErrorMessage>
                                                            </CCol>
                                                            <CCol>
                                                                <CFormInput type="text"
                                                                    id="floatingInput"
                                                                    name="annualIncome"
                                                                    value={values.target}
                                                                    floatingClassName="mb-2"
                                                                    floatingLabel="Annual Income"
                                                                    placeholder="Annual Income"
                                                                    onChange={handleInputChange}
                                                                    onChangeCapture={handleChange}
                                                                    onBlur={handleBlur}
                                                                    invalid={touched.annualIncome && !!errors.annualIncome}
                                                                />
                                                                <ErrorMessage name="annualIncome" component="div" className='errmsg text-danger'></ErrorMessage>
                                                            </CCol>
                                                        </CRow>
                                                        <CRow>
                                                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                                <CButton id="cancel" as="input" type="reset" value="Cancel" //onClick={() => {
                                                                // Example logic to reset form fields could be placed here
                                                                // document.getElementById("myForm").reset(); }}
                                                                />
                                                                <CButton id="bttn" as="input" type="submit" value="Submit" />
                                                            </div>
                                                        </CRow>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </CCardBody>
                                    </CCol>
                                </CCol>
                            </CRow>
                        </CCard>
                    </CCol>
                </CRow>
            </Container>
        </>
    );
};

export default CreateCustomer;
