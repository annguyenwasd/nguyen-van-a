import React from 'react';
import { useField, splitFormProps } from 'react-form';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const DateInput = React.forwardRef((props, ref) => {
  // Let's use splitFormProps to get form-specific props
  const [field, fieldOptions, rest] = splitFormProps(props);

  // Use the useField hook with a field and field options
  // to access field state
  const {
    meta: { error, isTouched, isValidating },
    setValue,
    getInputProps
  } = useField(field, fieldOptions);

  const { value, ...dateProps } = getInputProps({ ref, ...rest });

  // Build the field
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        {...dateProps}
        value={value}
        onChange={date => setValue(date)}
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        id="gcn-date-picker-inline"
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
      />
    </MuiPickersUtilsProvider>
  );
});

export default DateInput;
