/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography, Paper, Box, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
const navigate=useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/taskInbox')
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    
    //   <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
    //     <IconButton style={{ fontSize: 40, color: '#3f51b5' }}>
    //       <AccountCircleIcon />
    //     </IconButton>
    //     <IconButton style={{ fontSize: 40, color: '#3f51b5' }}>
    //       <LockIcon />
    //     </IconButton>
    //   </Box>
    <div>    <Container maxWidth="xs" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* Box before the form */}
      
     
      <Paper elevation={6} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" align="center">
        Login
        </Typography>
     

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Log In
            </Button>
          </Grid>
        </Grid>
      </form>
      </Paper>
    </Container>
    </div>
  );
};

export default SignUpPage;
