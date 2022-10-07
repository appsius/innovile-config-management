import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Select } from 'final-form-material-ui';
import { Paper, Grid, Button, withStyles } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { createData } from '../helpers';
import styles from '../styles/AutocorrectionCreateFormStyles';

function AutocorrectionCreateForm({
  classes,
  // autocorrection data
  countries,
  cities,
  autocorrectionsGetURL,
  setAutocorrections,
  autocorrectionCreateURL,
  // validation reset modes
  resetCodeMode,
  resetNameMode,
  resetDNameMode,
  resetAddressMode,
  setResetCodeMode,
  setResetNameMode,
  setResetDNameMode,
  setResetAddressMode,
  // show|hide form & table
  setShowAutocorrectionTable,
  showAutocorrectionCreateForm,
  setShowAutocorrectionCreateForm,
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
    return errors;
  };

  // main autocorrection insertion function - onSubmit form
  const createNewAutocorrection = async (values) => {
    const { code, name, displayName, address } = values;
    const id = uuidv4();
    const newAutocorrection = {
      id,
      code,
      name,
      displayName,
      address,
    };

    if (code && name && displayName && address) {
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
      setRenderedData('autocorrections-rendered');
      console.log(newAutocorrection);
    }
  };

  // resetting validations conds. if false --> validate()
  const handleCodeResetMode = () => {
    setResetCodeMode(false);
  };
  const handleNameResetMode = () => {
    setResetNameMode(false);
  };
  const handleDisplayNameResetMode = () => {
    setResetDNameMode(false);
  };
  const handleAdressResetMode = () => {
    setResetAddressMode(false);
  };

  const handleCancelButton = () => {
    // hide autocorrection form, show its table
    setShowAutocorrectionCreateForm(false);
    setShowAutocorrectionTable(true);
    setRenderedData('autocorrections-rendered');
  };
  return (
    <div
      style={{ padding: '16px', margin: 'auto' }}
      className={showAutocorrectionCreateForm ? classes.Show : classes.Hide}
    >
      <div className={classes.CreateForm}>
        <Form
          onSubmit={(data) => createNewAutocorrection(data)}
          validate={validate}
          render={({ form, handleSubmit, submitting, pristine, values }) => (
            <form
              onSubmit={handleSubmit}
              noValidate
              className={classes.AutocorrectionCreateForm}
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
                      Autocorrection Create Form
                    </h2>
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      name='code'
                      component={TextField}
                      label='Autocorrection code'
                      onClick={() => handleCodeResetMode()}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      name='name'
                      component={TextField}
                      label='Autocorrection Name'
                      onClick={() => handleNameResetMode()}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      name='displayName'
                      component={TextField}
                      label='Display Name'
                      onClick={() => handleDisplayNameResetMode()}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      name='address'
                      component={TextField}
                      label='Address'
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
