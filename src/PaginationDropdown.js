import React, { useState, useEffect } from 'react';
import { Paper, MenuList, MenuItem, ListItemText } from '@mui/material';
import { withStyles } from '@material-ui/core';
import styles from './styles/AutocorrectionsTableStyles';

function PaginationDropdown({
  classes,
  autocorrections,
  currentPage,
  setCurrentPage,
  pageNumbers,
  autocorrectionsPerPage,
  setCurrentAutocorrections,
}) {
  // Logic for displaying autocorrections
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [openDropDownText, setOpenDropDownText] = useState('Open Menu');

  const handleClick = (num) => {
    setCurrentPage(num);
    const paginatedAutocorrections = autocorrections.slice(
      (num - 1) * autocorrectionsPerPage,
      num * autocorrectionsPerPage
    );
    setCurrentAutocorrections(paginatedAutocorrections);
  };

  const handleDropdownOpen = () => {
    if (dropdownIsOpen) {
      setDropdownIsOpen(false);
      setOpenDropDownText('Close Menu');
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
        left: '11vw',
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
                      : autocorrections.length}
                  </ListItemText>
                </MenuItem>
              </div>
            ))
            .reverse()}
        {/* Pagination Button */}
        {
          <div className={classes.DropdownMenuItem}>
            <MenuItem onClick={() => handleDropdownOpen()}>
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

export default withStyles(styles)(PaginationDropdown);
