import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Select } from 'final-form-material-ui';
import { Paper, Grid, Button, MenuItem, withStyles } from '@material-ui/core';
import { updateData } from '../helpers';
import styles from '../styles/AutocorrectionUpdateFormStyles';

function AutocorrectionUpdateForm({
  classes,
  // autocorrection data
  autocorrectionTypes,
  autocorrectionsGetURL,
  setAutocorrections,
  autocorrectionUpdateURL,
  // selected autocorrection update data
  selectedUpdateAutocorrection,
  setSelectedUpdateAutocorrection,
  updateAutocorrectionCode,
  setUpdateAutocorrectionCode,
  updatedAutocorrectionName,
  setUpdatedAutocorrectionName,
  updatedAutocorrectionDName,
  setUpdatedAutocorrectionDName,
  updatedAutocorrectionAddress,
  setUpdatedAutocorrectionAddress,
  // reset validation modes
  resetCodeMode,
  resetNameMode,
  resetDNameMode,
  resetAddressMode,
  setResetCodeMode,
  setResetNameMode,
  setResetDNameMode,
  setResetAddressMode,
  // show|hide udpdate form
  setShowAutocorrectionTable,
  showAutocorrectionUpdateForm,
  setShowAutocorrectionUpdateForm,
  setRenderedData,
}) {
  const validate = (values) => {
    const errors = {};
    if (!values.code && resetCodeMode === false) {
      errors.code = 'Autocorrection code is required';
    }
    if (!values.name && resetNameMode === false) {
      errors.name = 'Name is required';
    }
    if (!values.displayName && resetDNameMode === false) {
      errors.displayName = 'Display name is required';
    }
    if (!values.address && resetAddressMode === false) {
      errors.address = 'Address is required';
    }
    if (!values.selectedCityName && resetCityMode === false) {
      errors.selectedCityName = 'City is required';
    }
    if (!values.selectedAutocorrectionTypeName && resetSTypeMode === false) {
      errors.selectedAutocorrectionTypeName = 'Autocorrection type is required';
    }
    return errors;
  };

  const updateAutocorrection = async (values) => {
    const { code, name, displayName, address } = values;
    let updatedAutocorrection = {
      id: selectedUpdateAutocorrection.id,
      code: code ? code : selectedUpdateAutocorrection.code,
      name: name ? name : selectedUpdateAutocorrection.name,
      displayName: displayName
        ? displayName
        : selectedUpdateAutocorrection.displayName,
      address: address ? address : selectedUpdateAutocorrection.address,
    };
    if (
      updatedAutocorrection.code &&
      updatedAutocorrection.name &&
      updatedAutocorrection.displayName &&
      updatedAutocorrection.address
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
      // hide Autocorrection update form, show its table
      setShowAutocorrectionUpdateForm(false);
      setShowAutocorrectionTable(true);
      setRenderedData('autocorrections-rendered');
      console.log(updatedAutocorrection);
    }
  };

  const getAutocorrectionTypesMenu = () => {
    return autocorrectionTypes.map((autocorrectionType) => {
      const { id, name } = autocorrectionType;
      return (
        <MenuItem
          key={id}
          value={name}
          onClick={() => handleAutocorrectionTypeSelected(autocorrectionType)}
        >
          {name}
        </MenuItem>
      );
    });
  };

  // resetting validation for autocorrection after submit
  const handleCodeResetMode = () => {
    setUpdateAutocorrectionCode('');
    setResetCodeMode(false);
  };
  const handleNameResetMode = () => {
    setUpdatedAutocorrectionName('');
    setResetNameMode(false);
  };
  const handleDisplayNameResetMode = () => {
    setUpdatedAutocorrectionDName('');
    setResetDNameMode(false);
  };
  const handleAdressResetMode = () => {
    setUpdatedAutocorrectionAddress('');
    setResetAddressMode(false);
  };

  const handleCancelButton = () => {
    // reset selected data
    setSelectedUpdateAutocorrection({});
    // hide autocorrection update form, show its table
    setShowAutocorrectionUpdateForm(false);
    setShowAutocorrectionTable(true);
    setRenderedData('autocorrections-rendered');
  };

  return (
    <div
      style={{ padding: '16px', margin: 'auto', maxWidth: 7500 }}
      className={showAutocorrectionUpdateForm ? classes.Show : classes.Hide}
    >
      {/* <div className={classes.CreateForm}> */}
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
                <Grid container alignItems='flex-start' spacing={8}>
                  <Grid
                    item
                    xs={12}
                    className={classes.AutocorrectionFormTitle}
                  >
                    <h2
                      style={{
                        marginLeft: '-55%',
                        fontWeight: '300',
                      }}
                    >
                      Autocorrection Update Form
                    </h2>
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      name='code'
                      component={TextField}
                      label={
                        updateAutocorrectionCode
                          ? updateAutocorrectionCode
                          : 'Autocorrection code'
                      }
                      onClick={() => handleCodeResetMode()}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      name='name'
                      component={TextField}
                      label={
                        updatedAutocorrectionName
                          ? updatedAutocorrectionName
                          : 'Autocorrection Name'
                      }
                      onClick={() => handleNameResetMode()}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      name='displayName'
                      component={TextField}
                      label={
                        updatedAutocorrectionDName
                          ? updatedAutocorrectionDName
                          : 'Display Name'
                      }
                      onClick={() => handleDisplayNameResetMode()}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      name='address'
                      component={TextField}
                      label={
                        updatedAutocorrectionAddress
                          ? updatedAutocorrectionAddress
                          : 'Address'
                      }
                      onClick={() => handleAdressResetMode()}
                    />
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
