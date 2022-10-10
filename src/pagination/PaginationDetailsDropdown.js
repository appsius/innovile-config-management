import React, { useState } from 'react';
import { Paper, MenuList, MenuItem, ListItemText } from '@mui/material';
import { withStyles } from '@material-ui/core';
import styles from '../styles/AutocorrectionsTableStyles';

function PaginationDetailsDropdown({
  classes,
  currentPage,
  setCurrentPage,
  pageNumbers,
  autocorrectionsPerPage,
  matchedAutocorrectionDetails,
  // show or hide dropdown
  showAutocorrectionUpdateForm,
  showAutocorrectionCreateForm,
}) {
  // Logic for displaying autocorrections
  const [openDropDownText, setOpenDropDownText] = useState('Open Menu');
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [paginatedAutoDetails, setPaginatedAutoDetails] = useState(false);

  const handleClick = (num) => {
    setCurrentPage(num);
    const paginatedAutocorrections = matchedAutocorrectionDetails.slice(
      (num - 1) * autocorrectionsPerPage,
      num * autocorrectionsPerPage
    );
    setPaginatedAutoDetails(paginatedAutocorrections);
  };

  const handleDropdownOpen = () => {
    if (dropdownIsOpen) {
      setDropdownIsOpen(false);
      setOpenDropDownText('Open Menu');
    }
    if (!dropdownIsOpen) {
      setDropdownIsOpen(true);
      setOpenDropDownText('Close Menu');
    }
  };

  return (
    <Paper
      style={{
        position: 'absolute',
        left: '4vw',
        bottom: '1.25vh',
        margin: '0 1rem',
        backgroundColor: 'rgb(250, 250, 250)',
        color: 'black',
      }}
    >
      <MenuList
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Pagination dropdown page items, Ex. [0 - 10] */}
        {dropdownIsOpen &&
          pageNumbers
            .map((number, idx) => (
              <div key={idx} className={classes.DropdownMenuItem}>
                <MenuItem
                  onClick={() => handleClick(number)}
                  className={
                    currentPage === number ? classes.DropdownActiveItem : ''
                  }
                >
                  <ListItemText
                    style={{
                      padding: '5px 0px',
                      marginRight: '30px',
                    }}
                  >
                    {idx * autocorrectionsPerPage}
                    {' - '}
                    {idx !== pageNumbers.length - 1
                      ? (idx + 1) * autocorrectionsPerPage
                      : matchedAutocorrectionDetails.length}
                  </ListItemText>
                </MenuItem>
              </div>
            ))
            .reverse()}
        {/* Pagination Button */}
        {
          <div className={classes.DropdownMenuItem}>
            <MenuItem
              onClick={() => handleDropdownOpen()}
              disabled={
                showAutocorrectionUpdateForm || showAutocorrectionCreateForm
              }
            >
              <ListItemText
                style={{
                  height: '20px',
                  padding: '0px 0px',
                  marginRight: '30px',
                }}
              >
                {openDropDownText}
              </ListItemText>
            </MenuItem>
          </div>
        }
      </MenuList>
    </Paper>
  );
}

export default withStyles(styles)(PaginationDetailsDropdown);
