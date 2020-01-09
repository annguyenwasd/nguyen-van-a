import React from 'react';
import { useField, splitFormProps } from 'react-form';
import { TextField } from '@material-ui/core';

const Input = React.forwardRef((props, ref) => {
  // Let's use splitFormProps to get form-specific props
  const [field, fieldOptions, rest] = splitFormProps(props);

  // Use the useField hook with a field and field options
  // to access field state
  const {
    meta: { error, isTouched, isValidating },
    getInputProps
  } = useField(field, fieldOptions);

  const textFieldProps = getInputProps({ ref, ...rest });

  // Build the field
  return <TextField {...textFieldProps} />;
});

export default Input;
