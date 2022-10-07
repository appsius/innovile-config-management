import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles/AutocorrectionsTableStyles';
import PaginationDropdown from './PaginationDropdown';

function PaginationEl({
  classes,
  autocorrections,
  currentPage,
  setCurrentPage,
  autocorrectionsPerPage,
  setCurrentAutocorrections,
}) {
  // Logic for displaying page numbers
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(autocorrections.length / autocorrectionsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const pageNumbersItems = pageNumbers.map((number) => {
    return (
      <li
        key={number}
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
      style={{ position: 'relative', marginLeft: '1.5vh' }}
    >
      {pageNumbersItems.slice(0, 2)}
      {currentPage != 1 && '...'}
      {currentPage >= 3 &&
        currentPage <= pageNumbersItems.length - 2 &&
        pageNumbersItems[currentPage - 1]}
      {currentPage != pageNumbersItems.length - 1 && '...'}
      {pageNumbersItems.slice(pageNumbersItems.length - 2)}

      <PaginationDropdown
        autocorrections={autocorrections}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageNumbers={pageNumbers}
        autocorrectionsPerPage={autocorrectionsPerPage}
        setCurrentAutocorrections={setCurrentAutocorrections}
      />
    </ul>
  );
}

export default withStyles(styles)(PaginationEl);
