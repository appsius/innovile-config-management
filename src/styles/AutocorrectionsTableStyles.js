const styles = {
  Show: {
    display: 'flex',
    transition: 'all 0.3s ease-in-out !important',
  },
  Hide: {
    display: 'none',
    transition: 'all 0.3s ease-in-out !important',
  },
  TableRowTitle: {
    height: '12px',
  },
  TableRow: {
    height: '12px',
  },
  TableCell: {
    padding: '2px 4px !important',
  },
  TableCellTitle: {
    padding: '5px 4px !important',
  },
  AutocorrectionTableButtons: {
    width: '10vw !important',
  },
  Button: {
    padding: '2px 8px !important',
    fontSize: '12px !important',
    marginRight: '8px !important',
    fontWeight: 'normal !important',
    letterSpacing: '0.5px !important',
    fontFamily: 'Poppins !important',
    color: 'rgb(255, 255, 255) !important',
    borderRadius: '2.5px !important',
  },
  InsertButton: {
    display: 'inline-block !important',
    color: 'black !important',
    backgroundColor: 'aquamarine !important',
    whiteSpace: 'normal !important',
    fontSize: '12px !important',
    padding: '2px 0px !important',
    marginRight: '3px !important',
    width: '6rem !important',
  },
  DeleteButton: {
    padding: '3.6px 10px !important',
    backgroundColor: 'rgb(255 0 0) !important',
  },
  UpdateButton: {
    width: '4.5vw !important',
    backgroundColor: '#097ddb !important',
  },
  PaginationContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '7.5vh',
    color: 'black',
    marginTop: '10px',
  },
  PaginationItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    textAlign: 'center',
    listStyleType: 'none',
    margin: '0 5px',
    padding: '1rem',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    fontSize: '12.5px',
  },
  PageActive: {
    backgroundColor: '#757575',
    color: 'white',
  },
  SelectedAutocorrection: {
    backgroundColor: '#35ff87',
  },
};

export default styles;
