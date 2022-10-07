import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { getData } from './helpers';
import AutocorrectionsTable from './tables/AutocorrectionsTable';
import { withStyles } from '@material-ui/core';
import styles from './styles/SidebarStyles';

function SideBar({ classes }) {
  // if no data cond.
  const noDataText = 'Neither AutoCorrections nor Their Details Found!';
  const [loading, setLoading] = useState(false);

  // get data URLs - JSON_SERVER
  const autocorrectionsGetURL = 'http://localhost:3000/autocorrections';

  // data to fetch
  const [autocorrections, setAutocorrections] = useState([]);

  // hide forms and table
  const [showAutocorrectionCreateForm, setShowAutocorrectionCreateForm] =
    useState(false);
  const [showAutocorrectionUpdateForm, setShowAutocorrectionUpdateForm] =
    useState(false);
  const [showAutocorrectionTable, setShowAutocorrectionTable] = useState(false);
  const [renderedData, setRenderedData] = useState('');

  useEffect(() => {
    fetchAutocorrection(
      autocorrectionsGetURL,
      setAutocorrections,
      'autocorrections-rendered'
    );
  }, []);

  function hideAllForms() {
    setShowAutocorrectionCreateForm(false);
    setShowAutocorrectionUpdateForm(false);
  }

  function fetchAutocorrection(dataUrl, setData, renderedData) {
    setLoading(true);
    getData(dataUrl, setData);
    hideAllForms();
    if (renderedData === 'autocorrections-rendered') {
      setShowAutocorrectionTable(true);
      setRenderedData('autocorrections-rendered');
    }
  }

  return (
    <div className={classes.Content}>
      <div className={classes.Sidebar}>
        <div className={classes.Menu}>
          <React.Fragment>
            <div>
              <Button
                variant='contained'
                style={{
                  backgroundColor: 'black',
                  textTransform: 'uppercase',
                  minWidth: '10.25vw',
                  height: '5.75vh',
                  padding: '6px 16px',
                  marginTop: '-.75vh',
                  borderRadius: '4px',
                }}
              >
                Autocorrection
              </Button>
            </div>
          </React.Fragment>
        </div>
        <div className={classes.Table}>
          {!loading && <div className={classes.NoDataText}>{noDataText}</div>}
          {autocorrections && renderedData === 'autocorrections-rendered' && (
            <div>
              <div className={classes.Tables}>
                <AutocorrectionsTable
                  // autocorrections data
                  autocorrections={autocorrections}
                  autocorrectionsGetURL={autocorrectionsGetURL}
                  setAutocorrections={setAutocorrections}
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
                  setRenderedData={setRenderedData}
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
