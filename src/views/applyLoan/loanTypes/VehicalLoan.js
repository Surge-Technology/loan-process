import React, { useState, useEffect } from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup' // Import Yup for validation
import moment from 'moment'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardTitle,
    CFormInput,
    CRow,
    CCol,
    CFormSelect,
    CCardImage,
    CSpinner,
} from '@coreui/react'
import { Container } from '@mui/material'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import IconButton from '@mui/material/IconButton';


const VehicalLoan = () => {
    const [state, setState] = useState({
        vehicalLoanId: '',
        panNumber: '',
        aadharNumber: '',
        drivingLicenseNo: '',
        licenseValidDate: '',
        vehicalType: '',
        vehicalModel: '',
        vehicalNumber: '',
        vehicalCost: '',
        registrationDate: '',
        suretyFirstName: '',
        suretyLastName: '',
        relation: '',
        city: '',
        state: '',
        country: '',
        address: '',
        pincode: '',
    })

    const initialValues = { ...state }
    const params = useParams();
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Define Yup validation schema
    const validationSchema = Yup.object().shape({
        panNumber: Yup.string()
            .required('PAN number is required')
            .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number format"),
        aadharNumber: Yup.string()
            .required('Aadhaar number is required')
            .matches(/^\d{12}$/, "Aadhaar number can only contain numbers")
            .min(12, 'Must be exactly 12 digits').max(12, 'Must be exactly 12 digits'),
        drivingLicenseNo: Yup.string().required('Driving License number is required'),
        licenseValidDate: Yup.string().required(' Driving License Valid till Date is required'),
        registrationDate: Yup.string().required('Vehical Registration Date is required'),
        vehicalType: Yup.string().required('Mention vehical type'),
        vehicalModel: Yup.string().required('Mention vehical model'),
        vehicalNumber: Yup.string().required('Vehical Number is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        country: Yup.string().required('Country is required'),
        address: Yup.string().required('Address is required'),
        pincode: Yup.string()
            .matches(/^\d{6}$/, 'Pincode must be valid and exactly 6 digits')
            .required('Pincode is required'),
        //existingLoans: Yup.string().required('city is required'),
        suretyFirstName: Yup.string().required('First Name is required').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
        suretyLastName: Yup.string().required('Last Name is required').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
        relation: Yup.string().required('mention relation with applicant'),

    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const dateHandleChange = (name, value) => {
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    // const fileHandleChange=(e)=>{
    //     let file =URL.createObjectURL(e.target.files[0]);
    //     setDocumentImage(file);
    //     let formdata = new FormData();
    //     formdata.append('image', e.target.files[0]);
    //     axios.post(`${process.env.REACT_APP_BASE_URL}/panCard/image/upload`,formdata).then((res)=>{
    //        setState((prevState)=>({
    //         ...prevState,
    //         panCardImageNameForApi:res.data.imageName
    //       })) 
    //     }).catch(err=>{
    //       Swal.fire(err.response.data.message,'Please try again later');
    //     })  
    //   }

    const handlePrevious = (e) => {
        navigate(`/applyLoan/selectType/${params.id}`)
    }

    const SubmitData = (values) => {
        let payload = {
            ...values,
            loanType: "Vehical Loan",
            vehicalLoanId: Number(values.vehicalLoanId),
            licenseValidDate: String(String(moment(values.licenseValidDate).format('MM-DD-YYYY'))),
            registrationDate: String(String(moment(values.registrationDate).format('MM-DD-YYYY'))),
            permanentAddress: {
                city: state.city,
                state: state.state,
                country: state.country,
                address: state.address,
                pincode: state.pincode,
            },

        }
        console.log('Payload that will be submitted is :', payload)

        // if (isSubmitting) return;
        // setIsSubmitting(true);
        // axios
        //     .post(`http://localhost:8080/submitCustomerDetails`, payload)
        //     // .then((res) => {
        //     //     console.log('response from backend ', res);
        //     //     Swal.fire('Success', 'Customer created successfully', 'success');
        //     // })

        //     .then((res) => {
        //         console.log('response from backend ', res)

        //         // Show success alert
        //         Swal.fire({
        //             title: 'Success',
        //             text: 'Account created successfully',
        //             icon: 'success',
        //             confirmButtonText: 'OK',
        //         }).then(() => {
        //             navigate(`/applyloan/reviewPage/${params.id}`);
        //             // Clear form after the OK button is clicked
        //             //   document.getElementById('myForm').reset();
        //         })
        //     })

        //     .catch((err) => {
        //         console.error('Error sending data:', err.response ? err.response.data : err.message)
        //         Swal.fire('Error', 'Please try again', 'error')
        //     })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Container className="d-flex justify-content-center align-items-center mt-2 mb-2" style={{ width: '100%', maxWidth: '1200px' }}  >
                <CRow className="d-flex justify-content-center align-items-center " style={{ width: '90%', maxWidth: '1200px' }} >
                    <CCol>
                        <CCard
                            className="mb-3 d-flex justify-content-center align-items-center"
                            style={{
                                maxWidth: '980px',
                                backgroundImage: `url(src/assets/images/vehicalloan.png)`,
                                backgroundSize: 'cover',      // Ensures the image covers the entire card
                                backgroundPosition: 'start', // Centers the background image
                                height: '65rem',
                            }}
                        >
                            <CRow className="g-0">
                                {/* <CCol md={6}>
                                    <CCardImage src="src/assets/images/home.jpg" style={{ height: '40rem' , width: '60rem'}} />
                                </CCol> */}

                                <CCol md={12}>
                                    <CCardBody>
                                        <CCardTitle >
                                            {' '}
                                            <h3>
                                                <span class="material-icons-outlined" style={{ paddingRight: " 250px", paddingLeft: "2px" }}>
                                                    <IconButton style={{ color: '#314D1C', size: 'xl4' }}
                                                        onClick={() => navigate(`/applyLoan/selectType/${params.id}`)}>
                                                        <ArrowCircleLeftIcon /></IconButton>
                                                </span>
                                                <strong><em>Vehical Loan Form</em></strong>
                                            </h3>

                                        </CCardTitle>
                                        <Formik
                                            initialValues={initialValues}
                                            validationSchema={validationSchema} // Use the validation schema
                                            onSubmit={SubmitData}
                                        >
                                            {({ values, handleChange, handleSubmit, handleBlur, errors, touched }) => (
                                                <Form id="myForm" onSubmit={handleSubmit}>
                                                    <CRow>
                                                        <CCol className="text-start" >
                                                            <div >ID Proofs:<span style={{ color: 'red', fontSize: '20px' }}>*</span></div>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow xs={{ gutter: 2 }} >
                                                        <CCol className='dark-label'>
                                                            <CFormInput
                                                                type="text"
                                                                name="panNumber"
                                                                floatingLabel="PAN Number"
                                                                className="transparent-input"
                                                                value={values.panNumber}
                                                                onChange={handleInputChange}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.panNumber && !!errors.panNumber}
                                                            />
                                                            <ErrorMessage
                                                                name="panNumber"
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </CCol>
                                                        <CCol className='dark-label'>
                                                            <CFormInput
                                                                type="text"
                                                                name="aadharNumber"
                                                                floatingLabel="Aadhar Number"
                                                                className="transparent-input"
                                                                value={values.aadharNumber}
                                                                onChange={handleInputChange}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.aadharNumber && !!errors.aadharNumber}
                                                            />
                                                            <ErrorMessage
                                                                name="aadharNumber"
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </CCol>
                                                    </CRow >
                                                    <CRow xs={{ gutter: 2 }} className="mb-2 mt-2">
                                                        <CCol className='dark-label'>
                                                            <CFormInput
                                                                type="text"
                                                                name="drivingLicenseNo"
                                                                floatingLabel="Driving License No"
                                                                className="transparent-input"
                                                                value={values.drivingLicenseNo}
                                                                onChange={handleInputChange}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.drivingLicenseNo && !!errors.drivingLicenseNo}
                                                            />
                                                            <ErrorMessage
                                                                name="drivingLicenseNo"
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </CCol>
                                                        <CCol className='dark-label'>
                                                            <CFormInput
                                                                type="date"
                                                                name="licenseValidDate"
                                                                floatingLabel="Driving Licence Valid Upto"
                                                                className="transparent-input"
                                                                selected={values.licenseValidDate ? new Date(values.licenseValidDate) : null}
                                                                onChange={(e) => { dateHandleChange("licenseValidDate", e) }}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.licenseValidDate && !!errors.licenseValidDate}
                                                            />
                                                            <ErrorMessage
                                                                name="licenseValidDate"
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </CCol>
                                                    </CRow>

                                                    <CRow>
                                                        <CCol className="text-start" >
                                                            <div >Credit Information:<span style={{ color: 'red', fontSize: '20px' }}>*</span></div>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow xs={{ gutter: '2' }}>
                                                        <CCol md={4} className='dark-label'>
                                                            <CFormInput
                                                                type="text"
                                                                name="creditScore"
                                                                floatingLabel="What is your Credit Score (CIBIL)"
                                                                className="transparent-input"
                                                                value={values.creditScore}
                                                                onChange={handleInputChange}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.creditScore && !!errors.creditScore}
                                                            />
                                                            <ErrorMessage
                                                                name="creditScore"
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </CCol>
                                                        <CCol md={8} className='dark-label'>
                                                            <CFormInput
                                                                type="text"
                                                                name="existingLoans"
                                                                floatingLabel="Please mention any outstanding loans or credit card loans you currently have"
                                                                className="transparent-input"
                                                                value={values.existingLoans}
                                                                onChange={handleInputChange}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.existingLoans && !!errors.existingLoans}
                                                            />
                                                            <ErrorMessage
                                                                name="existingLoans"
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol className="text-start" >
                                                            <div >Vehical Information:<span style={{ color: 'red', fontSize: '20px' }}>*</span></div>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow xs={{ gutter: 3 }}>
                                                        <CCol className='dark-label'>
                                                            <CFormInput
                                                                type="text"
                                                                name="vehicalType"
                                                                floatingLabel="Vehical Type"
                                                                className="transparent-input"
                                                                value={state.vehicalType}
                                                                onChange={handleInputChange}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.vehicalType && !!errors.vehicalType}
                                                            />
                                                            <ErrorMessage
                                                                name="vehicalType"
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </CCol>
                                                        <CCol className='dark-label'>
                                                            <CFormInput
                                                                type="text"
                                                                name="vehicalModel"
                                                                floatingLabel="Vehical Model"
                                                                className="transparent-input"
                                                                value={state.vehicalModel}
                                                                onChange={handleInputChange}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.vehicalModel && !!errors.vehicalModel}
                                                            />
                                                            <ErrorMessage
                                                                name="vehicalModel"
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </CCol>
                                                        <CCol className='dark-label'>
                                                            <CFormInput
                                                                type="text"
                                                                name="vehicalNumber"
                                                                floatingLabel="Vehical Registored Number"
                                                                className="transparent-input"
                                                                value={values.vehicalNumber}
                                                                onChange={handleInputChange}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.vehicalNumber && !!errors.vehicalNumber}
                                                            />
                                                            <ErrorMessage
                                                                name="vehicalNumber"
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </CCol>
                                                    </CRow>
                                                    <CRow xs={{ gutter: 2 }} className="mb-2 mt-2" >
                                                    <CCol md={6} className='dark-label'>
                                                            <CFormInput
                                                                type="date"
                                                                name="registrationDate"
                                                                floatingLabel="Vehical Registration Date"
                                                                className="transparent-input"
                                                                selected={values.registrationDate ? new Date(values.registrationDate) : null}
                                                                onChange={(e) => { dateHandleChange("registrationDate", e) }}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.registrationDate && !!errors.registrationDate}
                                                            />
                                                            <ErrorMessage
                                                                name="registrationDate"
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </CCol>
                                                        <CCol md={6} className='dark-label'>
                                                            <CFormInput
                                                                type="text"
                                                                name="vehicalCost"
                                                                floatingLabel="Vehical Cost (Rs.)"
                                                                className="transparent-input"
                                                                value={state.vehicalCost}
                                                                onChange={handleInputChange}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.vehicalCost && !!errors.vehicalCost}
                                                            />
                                                            <ErrorMessage
                                                                name="vehicalCost"
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </CCol>
                                                    </CRow >

                                                    <CRow>
                                                        <CCol className="text-start" >
                                                            <div >Surety Person Information:<span style={{ color: 'red', fontSize: '20px' }}>*</span></div>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow xs={{ gutter: 2 }}>
                                                        <CCol className='dark-label'>
                                                            <CFormInput
                                                                type="text"
                                                                name="suretyFirstName"
                                                                floatingLabel="First Name"
                                                                className="transparent-input"
                                                                value={state.suretyFirstName}
                                                                onChange={handleInputChange}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.suretyFirstName && !!errors.suretyFirstName}
                                                            />
                                                            <ErrorMessage
                                                                name="suretyFirstName"
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </CCol>
                                                        <CCol className='dark-label'>
                                                            <CFormInput
                                                                type="text"
                                                                name="suretyLastName"
                                                                floatingLabel="Last Name"
                                                                className="transparent-input"
                                                                value={state.suretyLastName}
                                                                onChange={handleInputChange}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.suretyLastName && !!errors.suretyLastName}
                                                            />
                                                            <ErrorMessage
                                                                name="suretyLastName"
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </CCol>
                                                    </CRow>
                                                    <CRow className="mb-2 mt-2">
                                                        <CCol className='dark-label'>
                                                            <CFormInput
                                                                type="text"
                                                                name="relation"
                                                                className="transparent-input"
                                                                floatingLabel="Relationship with Applicant"
                                                                value={state.relation}
                                                                onChange={handleInputChange}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.relation && !!errors.relation}
                                                            />
                                                            <ErrorMessage
                                                                name="relation"
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol className="text-start" >
                                                            <div >Permanent Address:<span style={{ color: 'red', fontSize: '20px' }}>*</span></div>
                                                        </CCol>
                                                    </CRow>

                                                    <CRow >
                                                        <CCol className='dark-label'>
                                                            <CFormInput
                                                                type="text"
                                                                id="floatingInput"
                                                                name="address"
                                                                className="transparent-input"
                                                                value={values.address}
                                                                floatingClassName="mb-2"
                                                                floatingLabel="Street address"
                                                                placeholder="Street address"
                                                                onChange={handleInputChange}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.address && !!errors.address}
                                                            />
                                                            <ErrorMessage
                                                                name="address"
                                                                component="div"
                                                                className="errmsg text-danger"
                                                            ></ErrorMessage>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow xs={{ gutter: 3 }}>
                                                        <CCol className='dark-label'>
                                                            <CFormInput
                                                                type="text"
                                                                id="floatingInput"
                                                                name="city"
                                                                className="transparent-input"
                                                                value={values.city}
                                                                floatingClassName="mb-2"
                                                                floatingLabel="City"
                                                                placeholder="City"
                                                                onChange={handleInputChange}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.city && !!errors.city}
                                                            />
                                                            <ErrorMessage name="city" component="div" className="text-danger" />
                                                        </CCol>
                                                        <CCol className='dark-label'>
                                                            <CFormInput
                                                                type="text"
                                                                id="floatingInput"
                                                                name="state"
                                                                className="transparent-input"
                                                                value={values.state}
                                                                floatingClassName="mb-2"
                                                                floatingLabel="State"
                                                                placeholder="State"
                                                                onChange={handleInputChange}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.state && !!errors.state}
                                                            />
                                                            <ErrorMessage name="state" component="div" className="text-danger" />
                                                        </CCol>
                                                        <CCol className='dark-label'>
                                                            <CFormInput
                                                                type="text"
                                                                id="floatingInput"
                                                                name="country"
                                                                className="transparent-input"
                                                                value={values.country}
                                                                floatingClassName="mb-2"
                                                                floatingLabel="Country"
                                                                placeholder="Country"
                                                                onChange={handleInputChange}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.country && !!errors.country}
                                                            />
                                                            <ErrorMessage
                                                                name="country"
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </CCol>
                                                        <CCol className='dark-label'>
                                                            <CFormInput
                                                                type="text"
                                                                name="pincode"
                                                                floatingLabel="Pincode"
                                                                className="transparent-input"
                                                                value={values.pincode}
                                                                onChange={handleInputChange}
                                                                onChangeCapture={handleChange}
                                                                onBlur={handleBlur}
                                                                invalid={touched.pincode && !!errors.pincode}
                                                            />
                                                            <ErrorMessage
                                                                name="pincode"
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2">

                                                            <CButton
                                                                id='cancel'
                                                                type="reset"
                                                                color="danger"
                                                            //onClick={handlePrevious}
                                                            >
                                                                Cancel
                                                            </CButton>
                                                            <CButton id="bttn" type="submit" disabled={isSubmitting}>
                                                                {isSubmitting ? <CSpinner /> : 'Next'}
                                                            </CButton>


                                                        </div>
                                                    </CRow>

                                                </Form>
                                            )}
                                        </Formik>
                                    </CCardBody>
                                </CCol>
                            </CRow>
                        </CCard>
                    </CCol>
                </CRow>
            </Container>
        </>
    )
}

export default VehicalLoan