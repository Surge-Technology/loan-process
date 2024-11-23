/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaUpload } from 'react-icons/fa';
import { Box, Button, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import '../css/customerForm.css'
const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [clarificationData, setClarificationData] = useState("");
  useEffect(() => {
    const fetchClarification = async () => {
      try {
        const response = await axios.get("http://localhost:8080/clarification");
        console.log("API Response Data:", response.data); // Log the actual response data
        setClarificationData(response.data); // Update the state with API data
      } catch (error) {
        console.error("Error fetching clarification data:", error);
      }
    };
  
    fetchClarification();
  }, []);
  useEffect(() => {
    if (clarificationData) {
      formik.setFieldValue("Clarification", clarificationData);
    }
  }, [clarificationData]);

  const formik = useFormik({
    initialValues: {
      applicationNo: 'ACI08924123',
      loanType: 'Home loan',
      comments: '',
      Clarification:clarificationData,
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      
      formData.append('applicationNo', values.applicationNo);
      formData.append('loanType', values.loanType);
      formData.append('comments', values.comments);
      
      files.forEach((file, index) => {
        formData.append('files', file);  
      });

      try {
        const response = await axios.post('http://localhost:8080/customerReply', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for file upload
          },
        });

        if (response) {
          Swal.fire({
            text: 'Thanks for your submitting!',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            // Redirect to home page after success
            window.location.href = '/home';  // You can change this to any path
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to submit your application. Please try again.',
            icon: 'error',
            confirmButtonText: 'Retry',
          });
        }
      } catch (error) {
        console.error('API Error:', error);
        Swal.fire({
          title: 'Error!',
          text: 'An unexpected error occurred. Please try again later.',
          icon: 'error',
          confirmButtonText: 'Retry',
        });
      }
    console.log("form",values);
    
    },
  });

  const handleFileChange = (e) => {
    // Collect files selected by user
    setFiles([...e.target.files]);
  };
  const [otherFiles, setOtherFiles] = useState([]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setOtherFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const removeFile = (index) => {
    setOtherFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  return (
    <div className="container mt-4">
      <div className="card p-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="form-title mb-4 mx-auto text-center">
            <span>File Upload Form</span>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          {/* Application Number Field */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="applicationNo">Application No</label>
              <input
                type="text"
                id="applicationNo"
                name="applicationNo"
                className="form-control"
                value={formik.values.applicationNo}
                onChange={formik.handleChange}
              />
            </div>
            {/* Loan Type Field */}
            <div className="col-md-6">
              <label htmlFor="loanType">Loan Type</label>
              <input
                type="text"
                id="loanType"
                name="loanType"
                disabled
                className="form-control"
                value={formik.values.loanType}
                onChange={formik.handleChange}
              />
            </div>
          </div>
<div> <div className="col-md-6">
<label htmlFor="applicationNo">Clarification</label>
<input
  type="text"
  id="clarification"
  name="clarification"
  className="form-control"
  value={formik.values.Clarification}
  onChange={formik.handleChange}
/>
</div></div>


          <div className="container mt-4">
          <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upload Files
            </Typography>
    
            {/* Multi File Upload Button */}
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUpload />}
            >
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
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">{file.name}</Typography>
                    <Button
                      color="error"
                      size="small"
                      onClick={() => removeFile(index)}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </div>
          {/* File Upload Field 
          <div className="mb-3">
            <label htmlFor="files">Upload Files</label>
            <input
              type="file"
              id="files"
              name="files"
              className="form-control"
              multiple
              onChange={handleFileChange}
            />
          </div>*/}

                    {/* Comments Field */}
                    <div className="mb-3">
                    <label htmlFor="comments">Comments</label>
                    <textarea
                      id="comments"
                      name="comments"
                      className="form-control"
                      value={formik.values.comments}
                      onChange={formik.handleChange}
                    ></textarea>
                  </div>

          {/* Submit Button */}
          <div className="d-md-flex justify-content-md-end mt-3">
            <button type="submit" className="btn btn-primary">
              <FaUpload /> Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileUpload;
