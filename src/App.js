import React from 'react';
import { withStyles } from '@material-ui/core';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import styles from './styles/AppStyles';
import SideBar from './SideBar';
import Login from './components/Login/Login';
import useToken from './components/App/useToken';

function App({ classes }) {
  const { token, removeToken, setToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} exact path='/sidebar' />;
  }

  return (
    <div className={classes.App}>
      <BrowserRouter>
        <Routes>
          <Route index element={<SideBar removeToken={removeToken} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default withStyles(styles)(App);
