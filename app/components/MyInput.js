import React, { memo } from 'react';
import { FastField } from 'formik';
import { TextField } from '@material-ui/core';

function MyInput({ type, ...props }) {
  return <FastField as={TextField} type={type} {...props} />;
}

export default memo(MyInput);
