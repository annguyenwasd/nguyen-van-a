import React, { memo } from 'react';
import { Field } from 'formik';
import { TextField } from '@material-ui/core';

function MyInput({ type, ...props }) {
  return <Field as={TextField} type={type} {...props} />;
}

export default memo(MyInput);
