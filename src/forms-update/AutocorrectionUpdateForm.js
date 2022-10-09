import React, { useState } from 'react';
import moment from 'moment-timezone';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { Paper, Grid, Button, MenuItem, withStyles } from '@material-ui/core';
import Select from '@mui/material/Select';

import Stack from '@mui/material/Stack';
import TextFieldDatePicker from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import styles from '../styles/AutocorrectionUpdateFormStyles';
import { updateData } from '../helpers';

function AutocorrectionUpdateForm({
  classes,
  // autocorrection data
  operationTypes,
  setAutocorrections,
  autocorrectionsGetURL,
  autocorrectionUpdateURL,
  // selected autocorrection update data
  selectedUpdateAutocorrection,
  selectedUpdateAutocorrectionOpType,
  selectedUpdateAutocorrectionStartDate,
  selectedUpdateAutocorrectionEndDate,
  setSelectedUpdateAutocorrection,
  setSelectedUpdateAutocorrectionOpType,
  setSelectedUpdateAutocorrectionStartDate,
  setSelectedUpdateAutocorrectionEndDate,
  // reset validation modes
  resetNameMode,
  resetDescMode,
  setResetNameMode,
  setResetDescMode,
  // show|hide udpdate form
  setShowAutocorrectionTable,
  showAutocorrectionUpdateForm,
  setShowAutocorrectionUpdateForm,
  setRenderedData,
}) {
  // Date & time pickers
  const nowDateTime = moment(new Date())
    .tz('Europe/Istanbul')
    .format('YYYY-MM-DD hh:mm:ss');
  const [isDateLate, setIsDateLate] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.name && resetNameMode === false) {
      errors.name = 'Autocorrection name is required';
    }
    if (!values.description && resetDescMode === false) {
      errors.description = 'Description is required';
    }
    return errors;
  };

  // console.log(selectedUpdateAutocorrection);

  const updateAutocorrection = async (values) => {
    const { name, description } = values;
    let updatedAutocorrection = {
      id: selectedUpdateAutocorrection.id,
      name: name ? name : selectedUpdateAutocorrection.name,
      description: description
        ? description
        : selectedUpdateAutocorrection.description,
      operation_type: selectedUpdateAutocorrectionOpType,
      start_date: selectedUpdateAutocorrectionStartDate,
      end_date: selectedUpdateAutocorrectionEndDate,
      created_date: nowDateTime,
    };
    if (
      updatedAutocorrection.id &&
      updatedAutocorrection.name &&
      updatedAutocorrection.description &&
      updatedAutocorrection.operation_type &&
      updatedAutocorrection.start_date &&
      updatedAutocorrection.end_date &&
      updatedAutocorrection.created_date
    ) {
      // insert updated autocorrection
      updateData(
        autocorrectionsGetURL,
        setAutocorrections,
        autocorrectionUpdateURL + selectedUpdateAutocorrection.id,
        updatedAutocorrection
      );
      // reset selected data
      setSelectedUpdateAutocorrection({});
      setSelectedUpdateAutocorrectionOpType(1);
      setSelectedUpdateAutocorrectionStartDate('');
      setSelectedUpdateAutocorrectionEndDate('');
      // hide Autocorrection update form, show its table
      setShowAutocorrectionUpdateForm(false);
      setShowAutocorrectionTable(true);
      console.log(updatedAutocorrection);
    }
  };

  // handle input insertions
  const handleChangeDateTimeStart = (date) => {
    setSelectedUpdateAutocorrectionStartDate(
      moment(date).tz('Europe/Istanbul').format('YYYY-MM-DD hh:mm:ss')
    );
    moment(selectedUpdateAutocorrectionStartDate).isAfter(
      moment(selectedUpdateAutocorrectionEndDate)
    )
      ? setIsDateLate(true)
      : setIsDateLate(false);
    console.log(date, selectedUpdateAutocorrectionStartDate);
  };

  const handleChangeDateTimeEnd = (dateEnd) => {
    setIsDateLate(false);
    setSelectedUpdateAutocorrectionEndDate(
      moment(dateEnd).tz('Europe/Istanbul').format('YYYY-MM-DD hh:mm:ss')
    );
  };

  const handleOpClick = (selectedOp) => {
    setSelectedUpdateAutocorrectionOpType(selectedOp.id);
  };

  // resetting validation for autocorrection after submit
  const handleNameResetMode = () => {
    setResetNameMode(false);
  };
  const handleDescResetMode = () => {
    setResetDescMode(false);
  };

  const handleCancelButton = () => {
    // reset selected data
    setSelectedUpdateAutocorrection({});
    // hide autocorrection update form, show its table
    setShowAutocorrectionUpdateForm(false);
    setShowAutocorrectionTable(true);
  };

  return (
    <div
      style={{ padding: '16px', margin: 'auto', maxWidth: 7500 }}
      className={showAutocorrectionUpdateForm ? classes.Show : classes.Hide}
    >
      <div
        className={classes.AutocorrectionUpdateForm + ' ' + classes.CreateForm}
      >
        <Form
          onSubmit={(data) => updateAutocorrection(data)}
          validate={validate}
          render={({ form, handleSubmit, submitting }) => (
            <form
              onSubmit={handleSubmit}
              noValidate
              className={classes.AutocorrectionUpdateForm}
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
                      Autocorrection Update Form
                    </h2>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name='name'
                      defaultValue={selectedUpdateAutocorrection.name}
                      // value={selectedUpdateAutocorrection.name}
                      component={TextField}
                      label={'Autocorrection Name'}
                      onClick={() => handleNameResetMode()}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name='description'
                      defaultValue={selectedUpdateAutocorrection.description}
                      value={selectedUpdateAutocorrection.description}
                      component={TextField}
                      label={'Autocorrection Description'}
                      multiline
                      rows={
                        selectedUpdateAutocorrection.description.length / 45
                      }
                      onClick={() => handleDescResetMode()}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Select
                      className={classes.OperationTypeSelectContainer}
                      variant='standard'
                      name='operationType'
                      value={
                        operationTypes.filter(
                          (opr) => opr.id === selectedUpdateAutocorrectionOpType
                        )[0].name
                      }
                      label='Select an operation type'
                      align='left'
                    >
                      {operationTypes.map((operation, index) => {
                        return (
                          <MenuItem
                            key={index}
                            value={`${operation.name}`}
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
                          label={'Select start date'}
                          inputFormat='dd/MMM/yyyy hh:mm:ss a'
                          value={selectedUpdateAutocorrectionStartDate}
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
                          value={
                            isDateLate
                              ? selectedUpdateAutocorrectionStartDate
                              : selectedUpdateAutocorrectionEndDate
                          }
                          minDate={selectedUpdateAutocorrectionStartDate}
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
                        setTimeout(() => {
                          form.reset();
                        }, 1000);
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

export default withStyles(styles)(AutocorrectionUpdateForm);
