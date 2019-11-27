import React, { memo } from 'react';
import { FastField } from 'formik';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import NumberFormat from 'react-number-format';

function MyInput({ type, ...props }) {
  return <FastField as={TextField} type={type} {...props} />;
}

export default memo(MyInput);

function MoneyFormat(props) {
  console.log(props);
  const { inputRef, handleChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {}}
      thousandSeparator=" "
      isNumericString
    />
  );
}

MoneyFormat.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export { MoneyFormat };
