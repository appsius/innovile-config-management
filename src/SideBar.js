import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { getData } from './helpers';
import AutocorrectionsTable from './tables/AutocorrectionsTable';
import { withStyles } from '@material-ui/core';
import styles from './styles/SidebarStyles';

function SideBar({ classes }) {
  // if no data cond.
  const noDataText = 'Neither AutoCorrections nor Their Details Found!';

  // get data URLs - JSON_SERVER
  const autocorrectionsGetURL = 'http://localhost:3000/autocorrections';
  const autocorrectionCreateURL = 'http://localhost:3000/autocorrections';
  const autocorrectionUpdateURL = 'http://localhost:3000/autocorrections/';
  const autocorrectionDeleteURL = 'http://localhost:3000/autocorrections/';

  // data to fetch
  const [autocorrections, setAutocorrections] = useState([]);

  // hide forms and table
  const [showAutocorrectionCreateForm, setShowAutocorrectionCreateForm] =
    useState(false);
  const [showAutocorrectionUpdateForm, setShowAutocorrectionUpdateForm] =
    useState(false);
  const [showAutocorrectionTable, setShowAutocorrectionTable] = useState(true);

  useEffect(() => {
    getData(autocorrectionsGetURL, setAutocorrections);
  }, []);

  return (
    <div className={classes.Content}>
      <div className={classes.Sidebar}>
        <div className={classes.Menu}>
          <Button
            variant='contained'
            style={{
              backgroundColor: 'black',
              textTransform: 'uppercase',
              minWidth: '10.25vw',
              height: '4vh',
              padding: '6px 16px',
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
                  setAutocorrections={setAutocorrections}
                  // URLs
                  autocorrectionsGetURL={autocorrectionsGetURL}
                  autocorrectionCreateURL={autocorrectionCreateURL}
                  autocorrectionUpdateURL={autocorrectionUpdateURL}
                  autocorrectionDeleteURL={autocorrectionDeleteURL}
                  // show/hide autocorrection forms and table
                  showAutocorrectionTable={showAutocorrectionTable}
                  setShowAutocorrectionTable={setShowAutocorrectionTable}
                  showAutocorrectionCreateForm={showAutocorrectionCreateForm}
                  setShowAutocorrectionCreateForm={
                    setShowAutocorrectionCreateForm
                  }
                  showAutocorrectionUpdateForm={showAutocorrectionUpdateForm}
                  setShowAutocorrectionUpdateForm={
                    setShowAutocorrectionUpdateForm
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
