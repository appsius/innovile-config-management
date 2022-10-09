import React, { useState } from 'react';
import moment from 'moment-timezone';
import { v4 as uuidv4 } from 'uuid';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { Paper, Grid, Button, withStyles } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { createData } from '../helpers';
import styles from '../styles/AutocorrectionCreateFormStyles';

import Stack from '@mui/material/Stack';
import TextFieldDatePicker from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function AutocorrectionCreateForm({
  classes,
  // autocorrection data
  autocorrections,
  setAutocorrections,
  operationTypes,
  autocorrectionsGetURL,
  autocorrectionCreateURL,
  // validation reset modes
  resetNameMode,
  resetDescMode,
  setResetNameMode,
  setResetDescMode,
  // show|hide form & table
  setShowAutocorrectionTable,
  showAutocorrectionCreateForm,
  setShowAutocorrectionCreateForm,
}) {
  // Date & time pickers
  const nowDateTime = moment(new Date())
    .tz('Europe/Istanbul')
    .format('YYYY-MM-DD hh:mm:ss');
  const [dateTimeStart, setDateTimeStart] = useState(nowDateTime);
  const [dateTimeEnd, setDateTimeEnd] = useState(nowDateTime);
  const [isDateLate, setIsDateLate] = useState(false);
  const [selectOpType, setSelectOpType] = useState(operationTypes[0]);

  const validate = (values) => {
    const errors = {};
    if (!values.name && resetNameMode === false) {
      errors.name = 'Autocorrection code is required';
    }
    if (!values.description && resetDescMode === false) {
      errors.description = 'Description is required';
    }
    return errors;
  };

  // create function
  const createNewAutocorrection = async (values) => {
    const { name, description } = values;
    const id = uuidv4();
    const newAutocorrection = {
      id,
      name,
      description,
      operation_type: selectOpType.id,
      start_date: dateTimeStart,
      end_date: dateTimeEnd,
      created_date: nowDateTime,
    };

    if (
      id &&
      name &&
      description &&
      selectOpType.id &&
      dateTimeStart &&
      dateTimeEnd &&
      nowDateTime
    ) {
      // insert new autocorrection
      createData(
        autocorrectionsGetURL,
        setAutocorrections,
        autocorrectionCreateURL,
        newAutocorrection
      );
      // show autocorrection table
      setShowAutocorrectionCreateForm(false);
      setShowAutocorrectionTable(true);
      console.log(newAutocorrection);
    }
  };

  // handle input insertions
  const handleChangeDateTimeStart = (date) => {
    setDateTimeStart(
      moment(date).tz('Europe/Istanbul').format('YYYY-MM-DD hh:mm:ss')
    );
    moment(dateTimeStart).isAfter(moment(dateTimeEnd))
      ? setIsDateLate(true)
      : setIsDateLate(false);
  };

  const handleChangeDateTimeEnd = (dateEnd) => {
    setIsDateLate(false);
    setDateTimeEnd(
      moment(dateEnd).tz('Europe/Istanbul').format('YYYY-MM-DD hh:mm:ss')
    );
  };

  // resetting validations conds.
  const handleNameResetMode = () => {
    setResetNameMode(false);
  };
  const handleDescResetMode = () => {
    setResetDescMode(false);
  };

  const handleCancelButton = () => {
    // hide autocorrection form, show its table
    setShowAutocorrectionCreateForm(false);
    setShowAutocorrectionTable(true);
  };

  const handleOpClick = (selectedOp) => {
    setSelectOpType(selectedOp);
  };

  return (
    <div
      style={{ padding: '16px', margin: 'auto' }}
      className={showAutocorrectionCreateForm ? classes.Show : classes.Hide}
    >
      <div className={classes.CreateForm}>
        <Form
          onSubmit={(data) => {
            createNewAutocorrection(data);
          }}
          validate={validate}
          render={({ form, handleSubmit, submitting }) => (
            <form
              onSubmit={handleSubmit}
              noValidate
              className={classes.AutocorrectionCreateForm}
            >
              <Paper style={{ padding: '16px 16px 44px 16px' }}>
                <Grid container alignItems='flex-start' spacing={5}>
                  <Grid
                    item
                    xs={12}
                    className={classes.AutocorrectionFormTitle}
                  >
                    <h2
                      align='left'
                      style={{
                        fontWeight: '300',
                      }}
                    >
                      Autocorrection Create Form
                    </h2>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name='name'
                      component={TextField}
                      label='Autocorrection Name'
                      onClick={() => handleNameResetMode()}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name='description'
                      component={TextField}
                      label='Autocorrection Description'
                      onClick={() => handleDescResetMode()}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      className={classes.OperationTypeSelectContainer}
                      variant='standard'
                      name='operationType'
                      label='Select Operation Type'
                      value={selectOpType.name}
                      align='left'
                    >
                      {operationTypes.map((operation, index) => {
                        return (
                          <MenuItem
                            key={index}
                            value={operation.name}
                            onClick={() => handleOpClick(operation)}
                          >
                            {operation.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={12}>
                        <DateTimePicker
                          name='startDate'
                          variant='standard'
                          label='Select start date'
                          inputFormat='dd/MMM/yyyy hh:mm:ss a'
                          value={dateTimeStart}
                          disableMaskedInput
                          onChange={(date) => handleChangeDateTimeStart(date)}
                          renderInput={(params) => (
                            <TextFieldDatePicker {...params} />
                          )}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={12}>
                        <DateTimePicker
                          name='endDate'
                          variant='standard'
                          label='Select end date'
                          inputFormat='dd/MMM/yyyy hh:mm:ss a'
                          value={isDateLate ? dateTimeStart : dateTimeEnd}
                          minDate={dateTimeStart}
                          disableMaskedInput
                          onChange={(dateEnd) =>
                            handleChangeDateTimeEnd(dateEnd)
                          }
                          renderInput={(params) => (
                            <TextFieldDatePicker {...params} />
                          )}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </Grid>
                  <Grid
                    item
                    style={{ marginTop: 16 }}
                    xs={12}
                    className={classes.Buttons}
                  >
                    <Button
                      className={
                        classes.FormButtons +
                        ' ' +
                        classes.AutocorrectionCancelButton
                      }
                      variant='contained'
                      type='cancel'
                      onClick={() => {
                        handleCancelButton();
                        form.reset();
                      }}
                      disabled={submitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      className={classes.FormButtons}
                      variant='contained'
                      type='submit'
                      onClick={() => {
                        setTimeout(() => {
                          form.reset();
                        }, 1000);
                      }}
                      disabled={submitting}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          )}
        />
      </div>
    </div>
  );
}

export default withStyles(styles)(AutocorrectionCreateForm);
