import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import { styled } from '@mui/material/styles';
import { withStyles } from '@material-ui/core';
import { tableCellClasses } from '@mui/material/TableCell';
import styles from '../styles/AutoCorrectionDetailsTableStyles';
import PaginationDetailsEl from '../pagination/PaginationDetailsEl';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import ExportCSV from '../excell/ExportCSV';
import { getData } from '../helpers';

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

function AutoCorrectionDetailsTable({
  classes,
  // autocorrections data
  matchedAutocorrectionDetails,
  setSelectedUpdateAutocorrection,
  // show/hide form or table
  showAutocorrectionCreateForm,
  showAutocorrectionUpdateForm,
  showAutocorrectionDetailsTable,
  setShowAutocorrectionTable,
  setShowFooterButtons,
  setShowAutocorrectionDetailsTable,
}) {
  const nowDateTime = moment(new Date())
    .tz('Europe/Istanbul')
    .format('YYYY-MM-DD hh:mm');
  // validation reset controllers
  const [vendors, setVendors] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const VendorGetURL = 'http://localhost:3000/vendors';
  const TechnologyGetURL = 'http://localhost:3000/technologies';

  useEffect(() => {
    getData(VendorGetURL, setVendors);
    getData(TechnologyGetURL, setTechnologies);
  }, []);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [autocorrectionsPerPage, setAutocorrectionsPerPage] = useState(20);

  const handleCloseAutoCorrectionDetail = () => {
    setShowAutocorrectionDetailsTable(false);
    setShowAutocorrectionTable(true);
    setShowFooterButtons(true);
  };

  const autocorrectionsItems = (
    <Table sx={{ minWidth: 700 }} aria-label='customized table'>
      <TableHead>
        <TableRow className={classes.TableRow}>
          <StyledTableCell className={classes.TableCellTitle} align='left'>
            Branch
          </StyledTableCell>
          <StyledTableCell className={classes.TableCellTitle} align='left'>
            OSS Name
          </StyledTableCell>
          <StyledTableCell className={classes.TableCellTitle} align='left'>
            Site
          </StyledTableCell>
          <StyledTableCell className={classes.TableCellTitle} align='left'>
            Vendor
          </StyledTableCell>
          <StyledTableCell className={classes.TableCellTitle} align='center'>
            Technology
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {matchedAutocorrectionDetails.length === 0 && (
          <div className={classes.NoDataText}>
            The autocorrection details doesn"t exist
          </div>
        )}
        {matchedAutocorrectionDetails.length > 0 &&
          matchedAutocorrectionDetails.map((autocorrection, index) => {
            const { branch, oss_name, site } = autocorrection;
            const vendor = vendors.filter(
              (v) => v.id === autocorrection.vendor && v.name
            )[0].name;
            const technology = technologies.filter(
              (t) => t.id === autocorrection.technology && t.name
            )[0].name;
            return (
              <StyledTableRow key={index} className={classes.TableRow}>
                <StyledTableCell className={classes.TableCell} align='left'>
                  {branch}
                </StyledTableCell>
                <StyledTableCell className={classes.TableCell} align='left'>
                  {oss_name}
                </StyledTableCell>
                <StyledTableCell className={classes.TableCell} align='left'>
                  {site}
                </StyledTableCell>
                <StyledTableCell className={classes.TableCell} align='left'>
                  {vendor}
                </StyledTableCell>
                <StyledTableCell className={classes.TableCell} align='center'>
                  {technology}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
      </TableBody>
    </Table>
  );

  return (
    showAutocorrectionDetailsTable && (
      <div>
        <TableContainer component={Paper}>
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
          {
            <PaginationDetailsEl
              matchedAutocorrectionDetails={matchedAutocorrectionDetails}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              autocorrectionsPerPage={autocorrectionsPerPage}
              // show or hide dropdown
              showAutocorrectionUpdateForm={showAutocorrectionUpdateForm}
              showAutocorrectionCreateForm={showAutocorrectionCreateForm}
            />
          }
          <div
            align='right'
            style={{ position: 'fixed', right: '5vh', bottom: '5vh' }}
          >
            <Button
              className={classes.Button + ' ' + classes.CloseDetailsButton}
              variant='contained'
              color='success'
              onClick={() => handleCloseAutoCorrectionDetail()}
              style={{ textTransform: 'none !important' }}
            >
              Close
            </Button>
            {/*Export excell table */}
            <ExportCSV
              vendors={vendors}
              technologies={technologies}
              matchedAutocorrectionDetails={matchedAutocorrectionDetails}
              filename={`${nowDateTime}-Innovile-Case-Study`}
              setSelectedUpdateAutocorrection={setSelectedUpdateAutocorrection}
              setShowAutocorrectionDetailsTable={
                setShowAutocorrectionDetailsTable
              }
              setShowAutocorrectionTable={setShowAutocorrectionTable}
              setShowFooterButtons={setShowFooterButtons}
            />
          </div>
        </div>
      </div>
    )
  );
}

export default withStyles(styles)(AutoCorrectionDetailsTable);
