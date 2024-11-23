/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { CButton } from "@coreui/react";
import { FaArrowLeft, FaUndo, FaUpload } from "react-icons/fa";
import { Box, Button, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import '../css/customerForm.css';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const DocumentUpload = () => {
  const location = useLocation();
  const { personalData, employmentData, bankDetails, assetsDetail, houseHold,liabilities } =
  location.state || {};
  console.log("Full Data from Assets:", personalData);
  console.log("Received Employment Data:", employmentData);
  console.log("Received Bank Details:", bankDetails);
  console.log("Received Assets Detail:", assetsDetail);
  console.log("Received Household Detail:", houseHold);
  console.log("Received liabilitiesValue Detail:", liabilities);
  
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [otherFiles, setOtherFiles] = useState([]);
  const [comments, setComments] = useState("");
  const [isCustomerDataAvailable, setIsCustomerDataAvailable] = useState(false);
  const [isFirstConsentChecked, setIsFirstConsentChecked] = useState(false);
  const [isSecondConsentChecked, setIsSecondConsentChecked] = useState(false);
  const [formData, setFormData] = useState({
    selectedTypes: [],
    comments: "",
    otherFiles: [],
    isFirstConsentChecked: false,
    isSecondConsentChecked: false
  });
  

  const navigate = useNavigate();

  const handleFirstConsentChange = (event) => {
    setIsFirstConsentChecked(event.target.checked);
  };

  const handleSecondConsentChange = (event) => {
    setIsSecondConsentChecked(event.target.checked);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTypes((prev) => [...prev, value]);
    } else {
      setSelectedTypes((prev) => prev.filter((type) => type !== value));
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setOtherFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const removeFile = (index) => {
    setOtherFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    resetForm();
  };
  const fileDetails = formData.otherFiles.map((file) => ({
    name: file.name,
    size: file.size,
    type: file.type,
  }));
  const handleSubmit = (docsValue) => {
    event.preventDefault();
    // const dataToSubmit = {
      
    //   otherFiles
      
    // };
    const email = personalData?.contactInfo?.email || "";
    //   const name = email.split("@")[0]; 
  const fullData = {
    
    personalData,
    employmentData,
    bankDetails,
    assetsDetail,
    houseHold,
    liabilities,
Files: formData,
    
  };
  
  console.log("Full Data to Submit:", fullData,email);
  try {
    const formDataToSubmit = new FormData();
      formDataToSubmit.append("data", JSON.stringify(fullData)); // Add fullData as a JSON string

      // Append files to FormData
      formData.otherFiles.forEach((file, index) => {
        formDataToSubmit.append(`file_${index}`, file);
      });
    const response =  axios.post('http://localhost:8080/saveJsonData', fullData,email);
console.log(response);

    if (response) {
      Swal.fire({
        text: "Your account has been created successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/home");
      });

    } else {
      Swal.fire({
        title: "Error!",
        text: "Failed to submit application. Please try again.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  } catch (error) {
    console.error("API Error:", error);
    Swal.fire({
      title: "Error!",
      text: "An unexpected error occurred. Please try again later.",
      icon: "error",
      confirmButtonText: "Retry",
    });
  }
    // console.log("Form Data Submitted: ", dataToSubmit);
    // alert("Form submitted successfully!");
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  const handleReset = () => {
    setSelectedTypes([]);
    setOtherFiles([]);
    setComments("");
    setIsFirstConsentChecked(false);
    setIsSecondConsentChecked(false);
  };

  const handleLoadData = () => {
    // Sample JSON Data (can be fetched from an API or database)
    const sampleData = {
      selectedTypes: ["Income Proof", "Other Proof"],
      comments: "This is a sample comment.",
      otherFiles: [{ name: "document1.pdf" }, { name: "document2.jpg" }],
      isFirstConsentChecked: true,
      isSecondConsentChecked: true
    };

    // Load data into the form fields
    setFormData(sampleData);
    setSelectedTypes(sampleData.selectedTypes);
    setComments(sampleData.comments);
    setOtherFiles(sampleData.otherFiles);
    setIsFirstConsentChecked(sampleData.isFirstConsentChecked);
    setIsSecondConsentChecked(sampleData.isSecondConsentChecked);

    setIsCustomerDataAvailable(true); // Indicate data has been loaded
  };

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <div className="d-flex justify-content-between align-items-center">
          {/* Go Back Button */}
          <CButton color="success" onClick={handlePrevious} title="Go Back">
            <FaArrowLeft />
          </CButton>

          {/* Form Title */}
          <h2 className="form-title mb-4 mx-auto text-center">Document Upload</h2>

          {/* Load Data and Reset Buttons */}
          <div className="d-flex">
            {!isCustomerDataAvailable && (
              <>
                {/* Load Data Button */}
                <CButton
                  color="info"
                  className="me-2"
                  onClick={handleLoadData}
                  title="Load Data"
                >
                  <FaUpload />
                </CButton>

                {/* Reset Button */}
                <CButton color="danger" onClick={handleReset} title="Reset Form">
                  <FaUndo />
                </CButton>
              </>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} id="documentUploadForm">
          {/* Document Type Checkboxes */}
          <div className="form-section mt-4">
            <h5 className="section-title">Document Types</h5>
            <div className="d-flex flex-wrap">
              {["Income Proof", "Asset Proof", "Other Proof"].map((type) => (
                <div key={type} className="form-check me-4">
                  <input
                    type="checkbox"
                    id={type}
                    value={type}
                    checked={selectedTypes.includes(type)}
                    className="form-check-input"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={type} className="form-check-label">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* File Upload Section */}
          <Box sx={{ mt: 4, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upload Files
            </Typography>

            {/* Multi File Upload */}
            <Button variant="outlined" component="label" startIcon={<CloudUpload />}>
              Upload Files
              <input
                type="file"
                hidden
                multiple
                accept="application/pdf, image/*"
                onChange={handleFileUpload}
              />
            </Button>

            {/* Display Uploaded Files */}
            {otherFiles.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" gutterBottom>
                  Files:
                </Typography>
                {otherFiles.map((file, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">{file.name}</Typography>
                    <Button color="error" size="small" onClick={() => removeFile(index)}>
                      Remove
                    </Button>
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          {/* Consent Section */}
          <div className="form-section mt-8">
            <Typography variant="h5" gutterBottom>
              Consent of the Borrower
            </Typography>

            {/* First Checkbox for Consent */}
            <div className="form-check mt-4">
              <input
                type="checkbox"
                id="firstConsent"
                checked={isFirstConsentChecked}
                onChange={handleFirstConsentChange}
                className="form-check-input"
              />
              <label htmlFor="firstConsent" className="form-check-label mb-4">
                I authorize the lending company to obtain my personal and credit information about me from my employer and credit bureau. Just add a tick below so that the customer can authenticate his/her approval. I hereby agree that the above information is true and accurate.
              </label>
            </div>

            {/* Second Checkbox for Consent */}
            <div className="form-check">
              <input
                type="checkbox"
                id="secondConsent"
                checked={isSecondConsentChecked}
                onChange={handleSecondConsentChange}
                className="form-check-input"
              />
              <label htmlFor="secondConsent" className="form-check-label">
                I hereby agree that the above information is true and accurate.
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4 text-center">
            <CButton color="primary" type="submit">
              Submit
            </CButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentUpload;
