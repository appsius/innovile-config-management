import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Button, MenuItem } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteData } from '../helpers';
import PaginationEl from '../PaginationEl';
import AutocorrectionCreateForm from '../forms-create/AutocorrectionCreateForm';
import AutocorrectionUpdateForm from '../forms-update/AutocorrectionUpdateForm';
import { MenuList, withStyles } from '@material-ui/core';
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
  const [currentPage, setCurrentPage] = useState(4);
  const [autocorrectionsPerPage, setAutocorrectionsPerPage] = useState(25);
  const initialAutocorrections = autocorrections.slice(
    (currentPage - 1) * autocorrectionsPerPage,
    currentPage * autocorrectionsPerPage
  );
  const [currentAutocorrections, setCurrentAutocorrections] = useState(
    initialAutocorrections
  );

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

  const handleAutocorrectionUpdate = () => {
    const autocorrection = selectedUpdateAutocorrection;
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
  };

  const handleAutocorrectionDelete = (id) => {
    deleteData(
      autocorrectionsGetURL,
      setAutocorrections,
      autocorrectionDeleteURL + id
    );
    setShowAutocorrectionTable(true);
    setRenderedData('autocorrections-rendered');
  };

  const handleAutocorrectionSelect = (autocorrectItem) => {
    setSelectedUpdateAutocorrection(autocorrectItem);
  };

  const autocorrectionsItems = (
    <Table sx={{ minWidth: 700 }} aria-label='customized table'>
      <TableHead>
        <TableRow className={classes.TableRow}>
          <StyledTableCell className={classes.TableCellTitle} align='left'>
            Name
          </StyledTableCell>
          <StyledTableCell className={classes.TableCellTitle} align='left'>
            Description
          </StyledTableCell>
          <StyledTableCell className={classes.TableCellTitle} align='left'>
            Start Date
          </StyledTableCell>
          <StyledTableCell className={classes.TableCellTitle} align='left'>
            End Date
          </StyledTableCell>
          <StyledTableCell className={classes.TableCellTitle} align='center'>
            Operation Type
          </StyledTableCell>
          <StyledTableCell className={classes.TableCellTitle} align='left'>
            Created Date
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {(currentAutocorrections.length === 0
          ? initialAutocorrections
          : currentAutocorrections
        ).map((autocorrection, index) => {
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
            <StyledTableRow
              key={index}
              className={
                classes.TableRow +
                ' ' +
                (selectedUpdateAutocorrection.id &&
                  classes.SelectedAutocorrection)
              }
              onClick={() => handleAutocorrectionSelect(autocorrection)}
            >
              <StyledTableCell className={classes.TableCell} align='left'>
                {name}
              </StyledTableCell>
              <StyledTableCell className={classes.TableCell} align='left'>
                {description.slice(1, 60) + '...'}
              </StyledTableCell>
              <StyledTableCell className={classes.TableCell} align='left'>
                {start_date}
              </StyledTableCell>
              <StyledTableCell className={classes.TableCell} align='left'>
                {end_date}
              </StyledTableCell>
              <StyledTableCell className={classes.TableCell} align='center'>
                {operation_type}
              </StyledTableCell>
              <StyledTableCell className={classes.TableCell} align='left'>
                {created_date}
              </StyledTableCell>
            </StyledTableRow>
          );
        })}
      </TableBody>
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <PaginationEl
          autocorrections={autocorrections}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          autocorrectionsPerPage={autocorrectionsPerPage}
          currentAutocorrections={currentAutocorrections}
          setCurrentAutocorrections={setCurrentAutocorrections}
        />
        <div
          align='right'
          style={{ position: 'fixed', right: '5vh', bottom: '5vh' }}
        >
          <Button
            className={classes.Button + ' ' + classes.InsertButton}
            variant='contained'
            color='success'
            onClick={() => openAutocorrectionForm()}
          >
            INSERT
          </Button>
          <Button
            className={classes.Button + ' ' + classes.UpdateButton}
            variant='contained'
            onClick={() => handleAutocorrectionUpdate()}
            disabled={!selectedUpdateAutocorrection.id}
          >
            UPDATE
          </Button>
          <Button
            className={classes.Button + ' ' + classes.DeleteButton}
            variant='contained'
            color='error'
            onClick={() =>
              handleAutocorrectionDelete(selectedUpdateAutocorrection.id)
            }
            disabled={!selectedUpdateAutocorrection.id}
          >
            DELETE
          </Button>
        </div>
      </div>

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
