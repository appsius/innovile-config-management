import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from '../styles/AutocorrectionsTableStyles';
import PaginationDetailsDropdown from './PaginationDetailsDropdown';

function PaginationDetailsEl({
  classes,
  matchedAutocorrectionDetails,
  currentPage,
  setCurrentPage,
  autocorrectionsPerPage,
  // show or hide dropdown
  showAutocorrectionUpdateForm,
  showAutocorrectionCreateForm,
}) {
  // Logic for displaying page numbers
  const pageNumbers = [];
  for (
    let i = 1;
    i <=
    Math.ceil(matchedAutocorrectionDetails.length / autocorrectionsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const pageNumbersItems = pageNumbers.map((number, idx) => {
    return (
      <li
        key={idx}
        id={number}
        className={
          classes.PaginationItem +
          ' ' +
          (currentPage === number && classes.PageActive)
        }
      >
        {number}
      </li>
    );
  });

  return (
    <ul
      className={classes.PaginationContainer}
      style={{
        position: 'fixed',
        left: '40vw',
        bottom: '3vh',
        marginLeft: '1.5vh',
      }}
      align='center'
    >
      {pageNumbersItems}

      {/* TODO - Pagination */}

      <PaginationDetailsDropdown
        matchedAutocorrectionDetails={matchedAutocorrectionDetails}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageNumbers={pageNumbers}
        autocorrectionsPerPage={autocorrectionsPerPage}
        // show or hide dropdown
        showAutocorrectionUpdateForm={showAutocorrectionUpdateForm}
        showAutocorrectionCreateForm={showAutocorrectionCreateForm}
      />
    </ul>
  );
}

export default withStyles(styles)(PaginationDetailsEl);
