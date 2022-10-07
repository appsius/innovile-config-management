const styles = {
  Show: {
    display: 'flex',
    transition: 'all 0.3s ease-in-out !important',
  },
  Hide: {
    display: 'none',
    transition: 'all 0.3s ease-in-out !important',
  },
  TableRow: {
    height: 2,
  },
  TableCell: {
    padding: '0px 16px',
  },
  AutocorrectionTableButtons: {
    width: '11.11vw !important',
  },
  Button: {
    padding: '3px 10px !important',
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
    fontSize: '13px !important',
    padding: '5px 5px !important',
    marginRight: '7px !important',
    width: '12rem !important',
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
};

export default styles;
