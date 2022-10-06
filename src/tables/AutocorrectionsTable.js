import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import {
//   Link,
//   MemoryRouter,
//   Route,
//   Routes,
//   useLocation,
// } from 'react-router-dom';
// import Pagination from '@mui/material/Pagination';
// import PaginationItem from '@mui/material/PaginationItem';
import { deleteData } from '../helpers';
import AutocorrectionCreateForm from '../forms-create/AutocorrectionCreateForm';
import AutocorrectionUpdateForm from '../forms-update/AutocorrectionUpdateForm';
import { withStyles } from '@material-ui/core';
import styles from '../styles/AutocorrectionsTableStyles';

// table rows styles
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function AutocorrectionsTable({
  classes,
  // autocorrections data
  autocorrections,
  autocorrectionsGetURL,
  setAutocorrections,
  // show/hide form or table
  showAutocorrectionTable,
  setShowAutocorrectionTable,
  showAutocorrectionCreateForm,
  setShowAutocorrectionCreateForm,
  showAutocorrectionUpdateForm,
  setShowAutocorrectionUpdateForm,
  setRenderedData,
}) {
  // json-server delete urls
  const autocorrectionCreateURL = '/autocorrections';
  const autocorrectionUpdateURL = '/autocorrections/';
  const autocorrectionDeleteURL = '/autocorrections/';
  // selected autocorrection update data
  const [selectedUpdateAutocorrection, setSelectedUpdateAutocorrection] =
    useState({});
  const [updatedAutocorrectionCode, setUpdatedAutocorrectionCode] =
    useState('');
  const [updatedAutocorrectionName, setUpdatedAutocorrectionName] =
    useState('');
  const [updatedAutocorrectionDName, setUpdatedAutocorrectionDName] =
    useState('');
  const [updatedAutocorrectionAddress, setUpdatedAutocorrectionAddress] =
    useState('');
  // validation reset controllers
  const [resetCodeMode, setResetCodeMode] = useState(false);
  const [resetNameMode, setResetNameMode] = useState(false);
  const [resetDNameMode, setResetDNameMode] = useState(false);
  const [resetAddressMode, setResetAddressMode] = useState(false);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [autocorrectionsPerPage, setAutocorrectionsPerPage] = useState(10);
  const [pageActive, setPageActive] = useState(1);

  const openAutocorrectionForm = () => {
    // set validation modes
    // not show validation errors when open create form
    setResetCodeMode(true);
    setResetNameMode(true);
    setResetDNameMode(true);
    setResetAddressMode(true);
    // hide table and show create form
    setShowAutocorrectionCreateForm(true);
    setShowAutocorrectionTable(false);
    setShowAutocorrectionUpdateForm(false);
  };

  function handleAutocorrectionUpdate(autocorrection) {
    // set selected autocorrection update data
    setSelectedUpdateAutocorrection(autocorrection);
    setUpdatedAutocorrectionCode(autocorrection.code);
    setUpdatedAutocorrectionName(autocorrection.name);
    setUpdatedAutocorrectionDName(autocorrection.displayName);
    setUpdatedAutocorrectionAddress(autocorrection.address);
    // set validation modes
    // not show validation errors when open update form
    setResetCodeMode(true);
    setResetNameMode(true);
    setResetDNameMode(true);
    setResetAddressMode(true);
    // hide table and show update form
    setShowAutocorrectionTable(false);
    setShowAutocorrectionCreateForm(false);
    setShowAutocorrectionUpdateForm(true);
  }

  const handleAutocorrectionDelete = (id) => {
    deleteData(
      autocorrectionsGetURL,
      setAutocorrections,
      autocorrectionDeleteURL + id
    );
    setShowAutocorrectionTable(true);
    setRenderedData('autocorrections-rendered');
  };

  const handleClick = (event) => {
    const id = Number(event.target.id);
    setCurrentPage(id);
    setPageActive(id);
  };

  // Logic for displaying autocorrections
  const indexOfLastAutocorrection = currentPage * autocorrectionsPerPage;
  const indexOfFirstAutocorrection =
    indexOfLastAutocorrection - autocorrectionsPerPage;
  const currentAutocorrections = autocorrections.slice(
    indexOfFirstAutocorrection,
    indexOfLastAutocorrection
  );

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
          (pageActive === number && classes.PageActive)
        }
        onClick={handleClick}
      >
        {number}
      </li>
    );
  });

  const autocorrectionsItems = (
    <Table sx={{ minWidth: 700 }} aria-label='customized table'>
      <TableHead>
        <TableRow className={classes.TableRow}>
          <StyledTableCell align='left'>Name</StyledTableCell>
          <StyledTableCell align='left'>Description</StyledTableCell>
          <StyledTableCell align='left'>Start Date</StyledTableCell>
          <StyledTableCell align='left'>End Date</StyledTableCell>
          <StyledTableCell align='center'>Operation Type</StyledTableCell>
          <StyledTableCell align='left'>Created Date</StyledTableCell>
          <StyledTableCell
            align='right'
            className={classes.AutocorrectionTableButtons}
          >
            <Button
              className={classes.Button + ' ' + classes.InsertButton}
              variant='contained'
              color='success'
              onClick={() => openAutocorrectionForm()}
            >
              NEW AUTOCORRECTION
            </Button>
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {currentAutocorrections.map((autocorrection, index) => {
          const {
            id,
            name,
            description,
            start_date,
            end_date,
            operation_type,
            created_date,
          } = autocorrection;
          return (
            <StyledTableRow key={id} className={classes.TableRow}>
              <StyledTableCell align='left'>{name}</StyledTableCell>
              <StyledTableCell align='left'>
                {description.slice(1, 60) + '...'}
              </StyledTableCell>
              <StyledTableCell align='center'>{start_date}</StyledTableCell>
              <StyledTableCell align='center'>{end_date}</StyledTableCell>
              <StyledTableCell align='center'>{operation_type}</StyledTableCell>
              <StyledTableCell align='center'>{created_date}</StyledTableCell>
              <StyledTableCell align='right'>
                <Button
                  className={classes.Button + ' ' + classes.UpdateButton}
                  variant='contained'
                  onClick={() => handleAutocorrectionUpdate(autocorrection)}
                >
                  UPDATE
                </Button>
                <Button
                  className={classes.Button + ' ' + classes.DeleteButton}
                  variant='contained'
                  color='error'
                  id={id}
                  onClick={(e) => handleAutocorrectionDelete(e.target.id)}
                >
                  DELETE
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          );
        })}
      </TableBody>
      {/* pagination page list */}
    </Table>
  );

  return (
    <div>
      <TableContainer
        component={Paper}
        className={showAutocorrectionTable ? classes.Show : classes.Hide}
      >
        {autocorrectionsItems}
      </TableContainer>
      <ul className={classes.Pagination}>{pageNumbersItems}</ul>
      {showAutocorrectionCreateForm && (
        <AutocorrectionCreateForm
          // autocorrections data
          autocorrectionsGetURL={autocorrectionsGetURL}
          setAutocorrections={setAutocorrections}
          autocorrectionCreateURL={autocorrectionCreateURL}
          // validation reset modes
          resetCodeMode={resetCodeMode}
          resetNameMode={resetNameMode}
          resetDNameMode={resetDNameMode}
          resetAddressMode={resetAddressMode}
          setResetCodeMode={setResetCodeMode}
          setResetNameMode={setResetNameMode}
          setResetDNameMode={setResetDNameMode}
          setResetAddressMode={setResetAddressMode}
          // hide table, show autocorrection create form
          setShowAutocorrectionTable={setShowAutocorrectionTable}
          showAutocorrectionCreateForm={showAutocorrectionCreateForm}
          setShowAutocorrectionCreateForm={setShowAutocorrectionCreateForm}
          setRenderedData={setRenderedData}
        />
      )}
      {showAutocorrectionUpdateForm && (
        <AutocorrectionUpdateForm
          // autocorrections data
          autocorrectionsGetURL={autocorrectionsGetURL}
          autocorrectionUpdateURL={autocorrectionUpdateURL}
          setAutocorrections={setAutocorrections}
          // selected autocorrection update data
          selectedUpdateAutocorrection={selectedUpdateAutocorrection}
          setSelectedUpdateAutocorrection={setSelectedUpdateAutocorrection}
          updatedAutocorrectionCode={updatedAutocorrectionCode}
          setUpdatedAutocorrectionCode={setUpdatedAutocorrectionCode}
          updatedAutocorrectionName={updatedAutocorrectionName}
          setUpdatedAutocorrectionName={setUpdatedAutocorrectionName}
          updatedAutocorrectionDName={updatedAutocorrectionDName}
          setUpdatedAutocorrectionDName={setUpdatedAutocorrectionDName}
          updatedAutocorrectionAddress={updatedAutocorrectionAddress}
          setUpdatedAutocorrectionAddress={setUpdatedAutocorrectionAddress}
          // validation reset modes
          resetCodeMode={resetCodeMode}
          resetNameMode={resetNameMode}
          resetDNameMode={resetDNameMode}
          resetAddressMode={resetAddressMode}
          setResetCodeMode={setResetCodeMode}
          setResetNameMode={setResetNameMode}
          setResetDNameMode={setResetDNameMode}
          setResetAddressMode={setResetAddressMode}
          // hide table, show autocorrection update form
          setShowAutocorrectionTable={setShowAutocorrectionTable}
          showAutocorrectionUpdateForm={showAutocorrectionUpdateForm}
          setShowAutocorrectionUpdateForm={setShowAutocorrectionUpdateForm}
          setRenderedData={setRenderedData}
        />
      )}
    </div>
  );
}
export default withStyles(styles)(AutocorrectionsTable);
