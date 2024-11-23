/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { FaArrowLeft, FaUpload, FaUndo } from 'react-icons/fa'
import { CButton } from '@coreui/react' // Assuming you're using CoreUI for CButton
import '../css/customerForm.css'
import '../css/loanApproval.css'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from "axios";

const LoanApplicationForm = () => {
  const [loanStatus, setLoanStatus] = useState('')
  const [creditScore, setCreditScore] = useState('')
  const [incomeVerificationStatus, setIncomeVerificationStatus] = useState('')
  const [collateralStatus, setCollateralStatus] = useState('')
  const [riskAssessment, setRiskAssessment] = useState('')
  const [approvalStage, setApprovalStage] = useState({
    loanOfficerReview: false,
    underwriter: false,
    legalReview: false,
    finalApproval: false,
  })
  const [underwriterDecision, setUnderwriterDecision] = useState('')
  const [legalReviewStatus, setLegalReviewStatus] = useState('')
  const [finalDecision, setFinalDecision] = useState('')
  const [notes, setNotes] = useState('')
  const [isCustomerDataAvailable, setIsCustomerDataAvailable] = useState(false) // Placeholder for your actual state
  // const [formik, setFormik] = useState({
  //  handleSubmit: () => {
  //   e.preventDefault(e);
  //   const dataToSubmit = { loanStatus, creditScore, notes };
  //   console.log("Submitted Data:", dataToSubmit);
  //   setFormData(dataToSubmit);
  //   }
  //  }); // Placeholder for form submission
  const navigate = useNavigate()
  const handleCheckboxChange = (event) => {
    setApprovalStage({
      ...approvalStage,
      [event.target.name]: event.target.checked,
    })
  }

  const handleRadioChange = (setter) => (event) => {
    setter(event.target.value)
  }

  const handleLoadData = () => {
    const data = {
      loanStatus: 'pending',
      creditScore: 'good',
      notes: 'This is a preloaded note.',
    }
    setLoanStatus(data.loanStatus)
    setCreditScore(data.creditScore)
    setNotes(data.notes)
  }

  const handleReset = () => {
    setLoanStatus('')
    setCreditScore('')
    setNotes('')
  }

  const handlePrevious = () => {
    navigate(-1)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const dataToSubmit = { loanStatus, creditScore, notes }
    console.log('Submitted Data:', dataToSubmit)
    setFormData(dataToSubmit)
  }
  const [showClarificationInput, setShowClarificationInput] = useState(false)

  const formik = useFormik({
    initialValues: {
      loanStatus: '',
      creditScore: '',
      incomeVerificationStatus: '',
      collateralStatus: '',
      riskAssessment: '',
      approvalStage: {
        loanOfficerReview: false,
        underwriter: false,
        legalReview: false,
        finalApproval: false,
      },
      underwriterDecision: '',
      legalReviewStatus: '',
      finalDecision: '',

      clarificationDetails: '',
      notes: '',
      // isCustomerDataAvailable: false,
    },
    // validationSchema: Yup.object({
    //   loanStatus: Yup.string().required("Loan status is required"),
    //   creditScore: Yup.string().required("Credit score is required"),
    //   incomeVerificationStatus: Yup.string().required("Income verification status is required"),
    //   collateralStatus: Yup.string().required("Collateral status is required"),
    //   riskAssessment: Yup.string().required("Risk assessment is required"),
    //   notes: Yup.string(),
    // }),
    onSubmit: async (values) => {
      if (values.finalDecision === "approved") {
        sessionStorage.setItem("finalDecision", values.finalDecision);

        navigate("/LoanDisbursementForm");
      } else {
        const formData = {
          finalDecision: values.finalDecision,
          clarificationDetails: values.finalDecision === "needClarification" ? values.clarificationDetails : "",
        };

        try {
          const response = await axios.post("http://localhost:8080/loanApproval", formData);
          console.log("API Response:", response);
response
          navigate("/taskInbox");
        } catch (error) {
          console.error("Error during API submission:", error);
        }
      }
    },
  });

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex">
            {/*  <CButton color="success" onClick={handlePrevious} title="Go Back">
            //   <FaArrowLeft />
             </CButton>*/}
          </div>
          <h2 className="form-title mb-4 mx-auto text-center">Loan Approval</h2>
          {/*   <div className="d-flex">
            {!isCustomerDataAvailable && (
              <>
                <CButton color="info" className="me-2" onClick={handleLoadData} title="Load Data">
                  <FaUpload />
                </CButton>
                <CButton color="danger" onClick={handleReset} title="Reset Form">
                  <FaUndo />
                </CButton>
              </>
            )}
          </div>
        */}
        </div>
        <form onSubmit={formik.handleSubmit} id="myForm">
          {/* Loan Status */}

          <div className="form-section mt-4 custom-form-section">
            <div className="row mt-3">
              <div className="col-md-4 pl-4">
                <InputLabel className="custom-label pl-8">Loan Status</InputLabel>
              </div>
              <div className="col-md-6">
                <RadioGroup
                  name="loanStatus"
                  className="radio-group"
                  value={formik.values.loanStatus}
                  onChange={formik.handleChange}
                  row
                >
                  <FormControlLabel
                    className="radio-label-spacing"
                    value="pending"
                    control={<Radio />}
                    label="Pending"
                  />
                  <FormControlLabel
                    className="radio-label-spacing"
                    value="approved"
                    control={<Radio />}
                    label="Approve"
                  />
                  <FormControlLabel
                    value="rejected"
                    className="radio-label-spacing"
                    control={<Radio />}
                    label="Reject"
                  />
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Credit Score */}
          <div className="form-section mt-4 custom-form-section">
            <div className="row mt-3">
              <div className="col-md-4">
                <InputLabel className="custom-label">Credit Score</InputLabel>
              </div>
              <div className="col-md-4">
                <RadioGroup
                  name="creditScore"
                  className="radio-group"
                  value={formik.values.creditScore}
                  onChange={formik.handleChange}
                  row
                >
                  <FormControlLabel
                    className="radio-label-spacing"
                    value="good"
                    control={<Radio />}
                    label="Good"
                  />
                  <FormControlLabel
                    className="radio-label-spacing"
                    value="fair"
                    control={<Radio />}
                    label="Fair"
                  />
                  <FormControlLabel
                    className="radio-label-spacing"
                    value="poor"
                    control={<Radio />}
                    label="Poor"
                  />
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Income Verification Status */}
          <div className="form-section mt-4 custom-form-section">
            <div className="row mt-3">
              <div className="col-md-4">
                <InputLabel className="custom-label">Income Verification Status</InputLabel>
              </div>
              <div className="col-md-4">
                <RadioGroup
                  name="incomeVerificationStatus"
                  className="radio-group"
                  value={formik.values.incomeVerificationStatus}
                  onChange={formik.handleChange}
                  row
                >
                  <FormControlLabel
                    className="radio-label-spacing"
                    value="pending"
                    control={<Radio />}
                    label="Pending"
                  />
                  <FormControlLabel
                    className="radio-label-spacing"
                    value="verified"
                    control={<Radio />}
                    label="Verified"
                  />
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Collateral Status */}
          <div className="form-section mt-4 custom-form-section">
            <div className="row mt-3">
              <div className="col-md-4">
                <InputLabel className="custom-label">Collateral Status</InputLabel>
              </div>
              <div className="col-md-6">
                <RadioGroup
                  name="collateralStatus"
                  className="radio-group"
                  value={formik.values.collateralStatus}
                  onChange={formik.handleChange}
                  row
                >
                  <FormControlLabel
                    className="radio-label-spacing"
                    value="approve"
                    control={<Radio />}
                    label="Approve"
                  />
                  <FormControlLabel
                    className="radio-label-spacing"
                    value="pending"
                    control={<Radio />}
                    label="Pending"
                  />
                  <FormControlLabel
                    className="radio-label-spacing"
                    value="notApplicable"
                    control={<Radio />}
                    label="Not Applicable"
                  />
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="form-section mt-4 custom-form-section">
            <div className="row mt-3">
              <div className="col-md-4">
                <InputLabel className="custom-label">Risk Assessment</InputLabel>
              </div>
              <div className="col-md-6">
                <RadioGroup
                  name="riskAssessment"
                  className="radio-group"
                  value={formik.values.riskAssessment}
                  onChange={formik.handleChange}
                  row
                >
                  <FormControlLabel
                    className="radio-label-spacing"
                    value="low"
                    control={<Radio />}
                    label="Low"
                  />
                  <FormControlLabel
                    className="radio-label-spacing"
                    value="medium"
                    control={<Radio />}
                    label="Medium"
                  />
                  <FormControlLabel
                    className="radio-label-spacing"
                    value="high"
                    control={<Radio />}
                    label="High"
                  />
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Approval Stage (Checkbox) */}
          <div className="form-section mt-4 custom-form-section">
            <div className="row mt-3">
              <div className="col-md-4">
                <Typography className="custom-label">Approval Stage</Typography>
              </div>
              <div className="col-md-6">
                <FormGroup row>
                  <FormControlLabel
                    className="radio-group"
                    control={
                      <Checkbox
                        checked={formik.values.approvalStage.loanOfficerReview}
                        onChange={formik.handleChange}
                        name="approvalStage.loanOfficerReview"
                      />
                    }
                    label="Loan Officer Review"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.approvalStage.underwriter}
                        onChange={formik.handleChange}
                        name="approvalStage.underwriter"
                      />
                    }
                    label="Underwriter"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.approvalStage.legalReview}
                        onChange={formik.handleChange}
                        name="approvalStage.legalReview"
                      />
                    }
                    label="Legal Review"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.approvalStage.finalApproval}
                        onChange={formik.handleChange}
                        name="approvalStage.finalApproval"
                      />
                    }
                    label="Final Approval"
                  />
                </FormGroup>
              </div>
            </div>
          </div>

          {/* Underwriter Decision */}
          <div className="form-section mt-4 custom-form-section">
            <div className="row mt-3">
              <div className="col-md-4">
                <InputLabel className="custom-label">Underwriter Decision</InputLabel>
              </div>
              <div className="col-md-6">
                <RadioGroup
                  name="underwriterDecision"
                  className="radio-group"
                  value={formik.values.underwriterDecision}
                  onChange={formik.handleChange}
                  row
                >
                  <FormControlLabel
                    className="radio-label-spacing"
                    value="approve"
                    control={<Radio />}
                    label="Approve"
                  />
                  <FormControlLabel
                    className="radio-label-spacing"
                    value="reject"
                    control={<Radio />}
                    label="Reject"
                  />
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Legal Review Status */}
          <div className="form-section mt-4 custom-form-section">
            <div className="row mt-3">
              <div className="col-md-4">
                <InputLabel className="custom-label">Legal Review Status</InputLabel>
              </div>
              <div className="col-md-6">
                <RadioGroup
                  name="legalReviewStatus"
                  className="radio-group"
                  value={formik.values.legalReviewStatus}
                  onChange={formik.handleChange}
                  row
                >
                  <FormControlLabel
                    className="radio-label-spacing"
                    value="complete"
                    control={<Radio />}
                    label="Complete"
                  />
                  <FormControlLabel
                    className="radio-label-spacing"
                    value="pending"
                    control={<Radio />}
                    label="Pending"
                  />
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Final Decision */}
          <div className="form-section mt-4 custom-form-section">
            <div className="row mt-3">
              <div className="col-md-4">
                <InputLabel className="custom-label">Final Decision</InputLabel>
              </div>
              <div className="col-md-6">
                <RadioGroup
                  name="finalDecision"
                  className="radio-group"
                  value={formik.values.finalDecision}
                  onChange={(event) => {
                    formik.handleChange(event) // Update Formik's value
                    if (event.target.value === 'needClarification') {
                      setShowClarificationInput(true) // Show clarification input field
                    } else {
                      setShowClarificationInput(false) // Hide clarification input field
                    }
                  }}
                  row
                >
                  <FormControlLabel
                    className="radio-label-spacing"
                    value="approved"
                    control={<Radio />}
                    label="Approve"
                  />
                  <FormControlLabel
                    className="radio-label-spacing"
                    value="rejected"
                    control={<Radio />}
                    label="Reject"
                  />{' '}
                  <FormControlLabel
                    className="radio-label-spacing"
                    value="needClarification"
                    control={<Radio />}
                    label="Need Clarification"
                  />
                </RadioGroup>
                {showClarificationInput && (
                  <div className="clarification-input mt-3">
                    <InputLabel className="custom-label">Clarification Details</InputLabel>
                    <TextField
                      name="clarificationDetails"
                      value={formik.values.clarificationDetails}
                      onChange={formik.handleChange}
                      fullWidth
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="form-section mt-4 custom-form-section">
            <div className="row mt-3">
              <div className="col-md-4">
                <InputLabel className="custom-label">Notes</InputLabel>
              </div>
              <div className="col-md-6">
                <TextField
                  className="radio-label-spacing"
                  name="notes"
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
            {/* Cancel Button */}
            <Button
              variant="contained" // Solid style
              color="error"
              type="button"
              onClick={() => formik.resetForm()} // Resets form to initial values
            >
              Cancel
            </Button>

            {/* Submit Button */}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={formik.isSubmitting} // Disables the button while submitting
            >
              Submit
              {/*  {formik.isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Next'}*/}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoanApplicationForm
