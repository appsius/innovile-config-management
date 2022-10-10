import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from '../styles/AutocorrectionsTableStyles';
import PaginationDetailsDropdown from './PaginationDetailsDropdown';

function PaginationDetailsEl({
  classes,
  autocorrectionDetails,
  currentPage,
  setCurrentPage,
  autocorrectionsPerPage,
  setCurrentAutocorrections,
  // show or hide dropdown
  showAutocorrectionUpdateForm,
  showAutocorrectionCreateForm,
}) {
  // Logic for displaying page numbers
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(autocorrectionDetails.length / autocorrectionsPerPage);
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

  console.log(currentPage);

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
      {/* {currentPage === 1 &&
        pageNumbersItems.length > 5 &&
        pageNumbersItems.slice(0, 5)}
      {currentPage === 1 && pageNumbersItems.length <= 5 && pageNumbersItems}

      {currentPage !== 1 && pageNumbersItems.length <= 5 && pageNumbersItems}

      {currentPage === pageNumbersItems.length &&
        pageNumbersItems.length <= 5 &&
        pageNumbersItems}

      {currentPage === pageNumbersItems.length &&
        pageNumbersItems.length > 5 &&
        pageNumbersItems.slice(pageNumbersItems - 5)}

      {currentPage !== pageNumbersItems.length &&
        pageNumbersItems.length < 5 &&
        pageNumbersItems}

      {currentPage !== pageNumbersItems.length &&
        pageNumbersItems.length > 5 &&
        pageNumbersItems.slice(pageNumbersItems - 5)} */}

      <PaginationDetailsDropdown
        autocorrectionDetails={autocorrectionDetails}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageNumbers={pageNumbers}
        autocorrectionsPerPage={autocorrectionsPerPage}
        setCurrentAutocorrections={setCurrentAutocorrections}
        // show or hide dropdown
        showAutocorrectionUpdateForm={showAutocorrectionUpdateForm}
        showAutocorrectionCreateForm={showAutocorrectionCreateForm}
      />
    </ul>
  );
}

export default withStyles(styles)(PaginationDetailsEl);
