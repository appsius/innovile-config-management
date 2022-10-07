import React, { useState, useRef } from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { withStyles } from '@material-ui/core';
import styles from './styles/AutocorrectionsTableStyles';

function PaginationDropdown({
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

  const handleDropdownOpen = (e, node) => {
    // setCurrentAutocorrections(
    //   autocorrections.slice(
    //     autocorrectionsPerPage * (currentPage - 1),
    //     autocorrectionsPerPage * currentPage
    //   )
    // );
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
        margin: '0 1rem',
        position: 'absolute',
        left: '11vw',
        bottom: '1vh',
        backgroundColor: 'black',
        color: 'white',
      }}
    >
      <MenuList>
        {dropdownIsOpen &&
          pageNumbers
            .map((number, idx) => (
              <div key={idx}>
                <MenuItem onClick={() => handleClick(number)}>
                  <ListItemText
                    style={{
                      margin: '0 30px 0 0',
                      padding: '5px 0px',
                    }}
                  >
                    {idx * autocorrectionsPerPage} -
                    {idx !== pageNumbers.length - 1
                      ? (idx + 1) * autocorrectionsPerPage
                      : autocorrections.length}
                  </ListItemText>
                </MenuItem>
              </div>
            ))
            .reverse()}
        {
          <MenuItem onClick={() => handleDropdownOpen()}>
            <ListItemText
              style={{
                margin: '0 30px 0 0',
                padding: '5px 0px',
              }}
            >
              {openDropDownText}
            </ListItemText>
          </MenuItem>
        }
      </MenuList>
    </Paper>
  );
}

export default withStyles(styles)(PaginationDropdown);
