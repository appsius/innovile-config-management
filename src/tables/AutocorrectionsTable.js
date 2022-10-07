import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { deleteData } from '../helpers';
import PaginationEl from '../PaginationEl';
import AutocorrectionCreateForm from '../forms-create/AutocorrectionCreateForm';
import AutocorrectionUpdateForm from '../forms-update/AutocorrectionUpdateForm';
import { withStyles } from '@material-ui/core';
import styles from '../styles/AutocorrectionsTableStyles';
import { tableCellClasses } from '@mui/material/TableCell';
import {
  Button,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

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
  // json-server urls
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
  const [showAlert, setShowAlert] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(4);
  const [autocorrectionsPerPage, setAutocorrectionsPerPage] = useState(25);

  // set items per pagination page
  const initialAutocorrections = autocorrections.slice(
    (currentPage - 1) * autocorrectionsPerPage,
    currentPage * autocorrectionsPerPage
  );
  const [currentAutocorrections, setCurrentAutocorrections] = useState(
    initialAutocorrections
  );

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
      backgroundColor: '',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

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
    if (!selectedUpdateAutocorrection.id) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return;
    }
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
    if (!selectedUpdateAutocorrection.id) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return;
    }
    deleteData(
      autocorrectionsGetURL,
      setAutocorrections,
      autocorrectionDeleteURL + id
    );
    setShowAutocorrectionTable(true);
    setRenderedData('autocorrections-rendered');
  };

  const handleAutocorrectionSelect = (autocorrectItem) => {
    console.log(autocorrectItem);
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
                (selectedUpdateAutocorrection.id === id
                  ? classes.SelectedAutocorrection
                  : '')
              }
              onClick={() => handleAutocorrectionSelect(autocorrection)}
            >
              <StyledTableCell className={classes.TableCell} align='left'>
                {name}
              </StyledTableCell>
              <StyledTableCell className={classes.TableCell} align='left'>
                {description.slice(0, 60) + '...'}
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
      {showAlert && (
        <Alert
          variant='filled'
          severity='error'
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'fixed',
            top: '0',
            width: '88vw',
            height: '6vh',
            borderRadius: 0,
            backgroundColor: 'red',
            fontSize: '1rem',
            fontWeight: 'lighter',
            letterSpacing: '1.25px',
          }}
        >
          {`Please select (click) one of the list item to update | delete!`}
        </Alert>
      )}
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
