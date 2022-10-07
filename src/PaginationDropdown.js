import React, { useState, useRef } from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
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

  const handleClick = (number) => {
    setCurrentPage(number);
    const paginatedAutocorrections = autocorrections.slice(
      (number - 1) * autocorrectionsPerPage,
      number * autocorrectionsPerPage
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
                <MenuItem onClick={() => handleClick(number)}>
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
