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
    '&:hover': {
      cursor: 'pointer',
    },
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
    width: '5vw !important',
    padding: '2px 8px !important',
    fontSize: '14px !important',
    fontWeight: 'normal !important',
    letterSpacing: '1.4px !important',
    fontFamily: 'Poppins !important',
    color: 'rgb(255, 255, 255) !important',
    borderRadius: '2.5px !important',
    textTransform: 'none !important',
  },
  DetailsButton: {
    width: '100% !important',
    backgroundColor: '#079CAA !important',
  },
  CloseDetailsButton: {
    backgroundColor: 'white !important',
    color: 'black !important',
    padding: '0.65vh 1vw !important',
    marginRight: '0.75vw !important',
  },
  ExportButton: {
    backgroundColor: '#079CAA !important',
    padding: '0.65vh 1vw !important',
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
    backgroundColor: '#757575 !important',
    color: 'white',
  },
  DropdownActiveItem: {
    backgroundColor: '#E7E7E7 !important',
    color: 'black',
  },
  SelectedAutocorrection: {
    backgroundColor: '#a8f7ff',
  },
};

export default styles;
