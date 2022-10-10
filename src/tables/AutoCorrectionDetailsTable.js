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
  autocorrectionDetails,
  autocorrectionDetailsGetURL,
  selectedUpdateAutocorrection,
  // show/hide form or table
  showAutocorrectionTable,
  showAutocorrectionCreateForm,
  showAutocorrectionUpdateForm,
  showAutocorrectionDetailsTable,
  setShowAutocorrectionTable,
  setShowFooterButtons,
  setShowAutocorrectionDetailsTable,
}) {
  // select autocorrection update data

  const nowDateTime = moment(new Date())
    .tz('Europe/Istanbul')
    .format('YYYY-MM-DD hh:mm');
  // validation reset controllers
  const [currentAutocorrections, setCurrentAutocorrections] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const VendorGetURL = 'http://localhost:3000/vendors';
  const TechnologyGetURL = 'http://localhost:3000/technologies';
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [autocorrectionsPerPage, setAutocorrectionsPerPage] = useState(20);
  // initial autocorrections
  const getCurrentAutocorrections = () => {
    const currentAutos = autocorrectionDetails.slice(
      (currentPage - 1) * autocorrectionsPerPage,
      currentPage * autocorrectionsPerPage
    );
    setCurrentAutocorrections(currentAutos);
  };

  useEffect(() => {
    getCurrentAutocorrections();
    getData(VendorGetURL, setVendors);
    getData(TechnologyGetURL, setTechnologies);
  }, []);

  const handleAutocorrectionDetailExport = (currentAutocorrections) => {
    setShowAutocorrectionDetailsTable(false);
    setShowAutocorrectionTable(true);
    setShowFooterButtons(true);
  };

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
          <StyledTableCell className={classes.TableCellTitle} align='left'>
            Technology
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {currentAutocorrections.map((autocorrection, index) => {
          const vendor = vendors.filter(
            (v) => v.id === autocorrection.vendor
          )[0].name;
          const technology = technologies.filter(
            (t) => t.id === autocorrection.technology
          )[0].name;

          let ven = vendor;
          let tech = technology;

          const { branch, oss_name, site } = autocorrection;
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
                {ven}
              </StyledTableCell>
              <StyledTableCell className={classes.TableCell} align='left'>
                {tech}
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
              autocorrectionDetails={autocorrectionDetails}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              autocorrectionsPerPage={autocorrectionsPerPage}
              currentAutocorrections={currentAutocorrections}
              setCurrentAutocorrections={setCurrentAutocorrections}
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
            >
              Close
            </Button>
            {/*Export excell table */}
            <ExportCSV
              vendors={vendors}
              technologies={technologies}
              autocorrectionDetails={autocorrectionDetails}
              filename={`${nowDateTime}-Innovile-Case-Study`}
            />
          </div>
        </div>
      </div>
    )
  );
}

export default withStyles(styles)(AutoCorrectionDetailsTable);
