import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { withStyles } from '@material-ui/core';
import AutocorrectionsTable from './tables/AutocorrectionsTable';
import { getData } from './helpers';
import styles from './styles/SidebarStyles';
import Header from './Header';

function SideBar({ classes, removeToken }) {
  // if no data cond.
  const noDataText = 'Neither AutoCorrections nor Their Details Found!';

  // get data URLs - JSON_SERVER
  const autocorrectionsGetURL = 'http://localhost:3000/autocorrections';
  const autocorrectionCreateURL = 'http://localhost:3000/autocorrections';
  const autocorrectionUpdateURL = 'http://localhost:3000/autocorrections/';
  const autocorrectionDeleteURL = 'http://localhost:3000/autocorrections/';
  const autocorrectionDetailsGetURL =
    'http://localhost:3000/autocorrectionDetails';

  // data to fetch
  const [autocorrections, setAutocorrections] = useState([]);
  const [autocorrectionDetails, setAutocorrectionDetails] = useState([]);

  // hide forms and table
  const [showAutocorrectionCreateForm, setShowAutocorrectionCreateForm] =
    useState(false);
  const [showAutocorrectionUpdateForm, setShowAutocorrectionUpdateForm] =
    useState(false);
  const [showAutocorrectionDetailsTable, setShowAutocorrectionDetailsTable] =
    useState(false);
  const [showAutocorrectionTable, setShowAutocorrectionTable] = useState(true);

  useEffect(() => {
    getData(autocorrectionsGetURL, setAutocorrections);
    getData(autocorrectionDetailsGetURL, setAutocorrectionDetails);
  }, []);

  return (
    <div className={classes.Content}>
      <Header removeToken={removeToken} />
      <div className={classes.Sidebar}>
        <div className={classes.Menu}>
          <Button
            variant='contained'
            style={{
              backgroundColor: 'black',
              textTransform: 'uppercase',
              fontSize: '14px',
              width: '10vw',
              padding: '10px',
              height: '4vh',
              marginTop: '-.75vh',
              borderRadius: '0 !important',
            }}
          >
            Autocorrection
          </Button>
        </div>
        <div className={classes.Table}>
          {autocorrections.length === 0 && (
            <div className={classes.NoDataText}>{noDataText}</div>
          )}
          {autocorrections.length > 0 && (
            <div>
              <div className={classes.Tables}>
                <AutocorrectionsTable
                  // autocorrections data
                  autocorrections={autocorrections}
                  autocorrectionDetails={autocorrectionDetails}
                  setAutocorrectionDetails={setAutocorrectionDetails}
                  setAutocorrections={setAutocorrections}
                  // URLs
                  autocorrectionsGetURL={autocorrectionsGetURL}
                  autocorrectionDetailsGetURL={autocorrectionDetailsGetURL}
                  autocorrectionCreateURL={autocorrectionCreateURL}
                  autocorrectionUpdateURL={autocorrectionUpdateURL}
                  autocorrectionDeleteURL={autocorrectionDeleteURL}
                  // show/hide autocorrection forms and table
                  showAutocorrectionTable={showAutocorrectionTable}
                  showAutocorrectionCreateForm={showAutocorrectionCreateForm}
                  showAutocorrectionUpdateForm={showAutocorrectionUpdateForm}
                  showAutocorrectionDetailsTable={
                    showAutocorrectionDetailsTable
                  }
                  setShowAutocorrectionTable={setShowAutocorrectionTable}
                  setShowAutocorrectionCreateForm={
                    setShowAutocorrectionCreateForm
                  }
                  setShowAutocorrectionUpdateForm={
                    setShowAutocorrectionUpdateForm
                  }
                  setShowAutocorrectionDetailsTable={
                    setShowAutocorrectionDetailsTable
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(SideBar);
