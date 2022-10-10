import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { withStyles } from '@material-ui/core';
import styles from '../styles/AutoCorrectionDetailsTableStyles';
import { Button } from '@mui/material';

function ExportCSV({
  classes,
  autocorrectionDetails,
  vendors,
  technologies,
  filename,
}) {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  let formattedAutos = [];
  autocorrectionDetails.forEach((auto, index) => {
    const { id, branch, oss_name, site, vendor, technology } = auto;
    const ven = vendors.filter((v) => v.id === vendor)[0].name;
    const tech = technologies.filter((t) => t.id === technology)[0].name;
    const newAuto = {
      branch,
      oss_name,
      site,
      vendor: ven,
      technology: tech,
    };
    formattedAutos.push(newAuto);
  });

  const handleAutocorrectionDetailExport = (csvData, newFilename) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, newFilename + fileExtension);
  };

  return (
    <Button
      className={classes.Button + ' ' + classes.ExportButton}
      variant='contained'
      onClick={(e) =>
        handleAutocorrectionDetailExport(formattedAutos, filename)
      }
      data={formattedAutos}
      filename={filename}
      target='_blank'
    >
      Export
    </Button>
  );
}

export default withStyles(styles)(ExportCSV);
