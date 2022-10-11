import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles/HeaderStyles';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';

function Header({ classes, removeToken }) {
  const handleClickLogout = () => {
    removeToken();
  };

  return (
    <div className={classes.Header}>
      {/* <img
        src={`${process.env.PUBLIC_URL}/imgs/image-2.png`}
        style={{ width: '10.9vw' }}
      /> */}
      <h3 style={{ marginLeft: '11vw', fontSize: '19.5px', fontWeight: '300' }}>
        Innovile Config Management App
      </h3>
      <Button
        variant='contained'
        onClick={() => handleClickLogout()}
        style={{
          backgroundColor: '#079caa',
          color: 'white',
          height: '3.75vh',
          padding: '2px 10px',
          marginRight: '10px',
          letterSpacing: '2px',
        }}
      >
        <LockIcon
          sx={{ color: 'white', marginRight: '5px' }}
          style={{ height: '2vh', width: '2vh' }}
        />
        Logout
      </Button>
    </div>
  );
}

export default withStyles(styles)(Header);
