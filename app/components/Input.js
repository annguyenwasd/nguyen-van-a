import React from 'react';
import { asField } from 'informed';
import { TextField } from '@material-ui/core';

const Input = asField(({ fieldApi, fieldState, ...props }) => {
  const { value } = fieldState;
  const { setValue, setTouched } = fieldApi;
  const { onChange, onBlur, initialValue, forwardedRef, ...rest } = props;
  return (
    <TextField
      {...rest}
      ref={forwardedRef}
      value={!value && value !== 0 ? '' : value}
      onChange={e => {
        setValue(e.target.value);
        if (onChange) {
          onChange(e);
        }
      }}
      onBlur={e => {
        setTouched(true);
        if (onBlur) {
          onBlur(e);
        }
      }}
    />
  );
});

export default Input;
