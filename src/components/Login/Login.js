import React, { useEffect, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { getData } from '../../helpers';

import {
  Avatar,
  Button,
  Alert,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { withStyles } from '@material-ui/core';
import styles from '../../styles/LoginStyles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#079caa',
    },
  },
});

async function loginUser(credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'red',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#079caa',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#079caa',
      },
      '&:hover fieldset': {
        borderColor: '#079caa',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#079caa',
      },
    },
  },
})(TextField);

function Login({ classes, setToken }) {
  const usersGetURL = 'http://localhost:3000/users';
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getData(usersGetURL, setUsers);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    users.filter((user) => {
      if (user.email !== email || user.password !== password) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000); 
      }
      if (user.email === email && user.password === password) {
        setToken(token);
      }
    });
  };

  return (
    <div>
      {showAlert && (
        <Alert
          variant='filled'
          severity='error'
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'fixed',
            top: '0',
            width: '100%',
            height: '5.75vh',
            borderRadius: 0,
            textAlign: 'center',
            backgroundColor: 'red',
            fontSize: '1rem',
            fontWeight: 'lighter',
            letterSpacing: '1.25px',
          }}
        >
          {`User email | user password is wrong!`}
        </Alert>
      )}
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#079caa' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Innovile Case Study
            </Typography>
            <Box
              component='form'
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <CssTextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <CssTextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                onChange={(e) => setUserPassword(e.target.value)}
                autoComplete='current-password'
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2, bgcolor: '#079caa' }}
                className={classes.LoginButton}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2' sx={{ color: '#079caa' }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='#' variant='body2' sx={{ color: '#079caa' }}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default withStyles(styles)(Login);
