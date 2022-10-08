import React, { useEffect, useState } from 'react';
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
  setAutocorrections,
  // URLs
  autocorrectionsGetURL,
  autocorrectionCreateURL,
  autocorrectionUpdateURL,
  autocorrectionDeleteURL,
  // show/hide form or table
  showAutocorrectionTable,
  setShowAutocorrectionTable,
  showAutocorrectionCreateForm,
  setShowAutocorrectionCreateForm,
  showAutocorrectionUpdateForm,
  setShowAutocorrectionUpdateForm,
}) {
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
  const [itemIsDeleted, setItemIsDeleted] = useState(null);

  // validation reset controllers
  const [resetCodeMode, setResetCodeMode] = useState(false);
  const [resetNameMode, setResetNameMode] = useState(false);
  const [resetDNameMode, setResetDNameMode] = useState(false);
  const [resetAddressMode, setResetAddressMode] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [currentAutocorrections, setCurrentAutocorrections] = useState([]);

  // pagination
  const [currentPage, setCurrentPage] = useState(4);
  const [autocorrectionsPerPage, setAutocorrectionsPerPage] = useState(25);
  // initial autocorrections

  const getCurrentAutocorrections = () => {
    const currentAutos = autocorrections.slice(
      (currentPage - 1) * autocorrectionsPerPage,
      currentPage * autocorrectionsPerPage
    );
    setCurrentAutocorrections(currentAutos);
  };

  useEffect(() => {
    getCurrentAutocorrections();
  }, []);

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

  const handleAutocorrectionUpdate = (id) => {
    if (!id) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } else {
      // set selected autocorrection update data
      setSelectedUpdateAutocorrection(selectedUpdateAutocorrection);
      setUpdatedAutocorrectionCode(selectedUpdateAutocorrection.code);
      setUpdatedAutocorrectionName(selectedUpdateAutocorrection.name);
      setUpdatedAutocorrectionDName(selectedUpdateAutocorrection.displayName);
      setUpdatedAutocorrectionAddress(selectedUpdateAutocorrection.address);
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
  };

  const handleAutocorrectionDelete = (id) => {
    if (!id) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } else if (id) {
      // delete method
      deleteData(
        autocorrectionsGetURL,
        setAutocorrections,
        autocorrectionDeleteURL + id
      );
      setItemIsDeleted(id);
      getCurrentAutocorrections();
      setSelectedUpdateAutocorrection({});
    } else {
      return;
    }
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
          console.log(itemIsDeleted === id);
          return (
            <StyledTableRow
              key={index}
              className={
                classes.TableRow +
                ' ' +
                (selectedUpdateAutocorrection.id === id &&
                  classes.SelectedAutocorrection)
              }
              style={{ display: `${itemIsDeleted === id && 'none'}` }}
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
            width: '89vw',
            height: '5.75vh',
            borderRadius: 0,
            backgroundColor: 'red',
            fontSize: '1rem',
            fontWeight: 'lighter',
            letterSpacing: '1.25px',
          }}
        >
          {`Please select (click) one of the list item to UPDATE or DELETE!`}
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
          justifyContent: 'space-around',
        }}
      >
        <div
          style={{
            position: 'fixed',
            left: '12vw',
            bottom: '5vh',
            width: '8vw',
          }}
        >
          <Button
            className={classes.Button + ' ' + classes.DetailsButton}
            variant='contained'
            color='success'
            // onClick={() => showDetailsForm()}
          >
            SHOW DETAILS
          </Button>
        </div>
        <PaginationEl
          autocorrections={autocorrections}
          setAutocorrections={setAutocorrections}
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
            onClick={() =>
              handleAutocorrectionUpdate(selectedUpdateAutocorrection.id)
            }
          >
            UPDATE
          </Button>
          <Button
            className={classes.Button + ' ' + classes.DeleteButton}
            variant='contained'
            color='error'
            onClick={() => {
              handleAutocorrectionDelete(selectedUpdateAutocorrection.id);
            }}
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
        />
      )}
    </div>
  );
}
export default withStyles(styles)(AutocorrectionsTable);
