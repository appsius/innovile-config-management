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
          backgroundColor: 'rgb(45 236 255)',
          color: 'black',
          height: '4vh',
          width: '7vw',
          marginRight: '10px',
        }}
      >
        <LockIcon
          sx={{ color: 'black', marginRight: '8px' }}
          style={{ height: '2.25vh', width: '2.25vh' }}
        />
        LOGOUT
      </Button>
    </div>
  );
}

export default withStyles(styles)(Header);
