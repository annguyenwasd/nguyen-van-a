import React from 'react';
import styled from 'styled-components';
import MyInput from './MyInput';
import { TextField } from '@material-ui/core';
import { FieldArray, useFormikContext } from 'formik';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function GCN() {
  const {
    values: { changes },
    setFieldValue
  } = useFormikContext();
  return (
    <React.Fragment>
      <h2>Thông tin đăng kí biến động</h2>
      <h3>GCN</h3>
      <GCNDiv>
        <MyInput
          label="Số vào sổ cấp GCN"
          name="changes.gcn.number"
          as={TextField}
        />
        <MyInput
          label="Số phát hành GCN"
          name="changes.gcn.publish"
          as={TextField}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            id="date-picker-inline"
            label="Ngày cấp GCN"
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
            value={changes.gcn.approveDate}
            onChange={date => {
              setFieldValue('changes.gcn.approveDate', date);
            }}
          />
        </MuiPickersUtilsProvider>
        <MyInput
          style={{
            gridColumnEnd: 'span 3'
          }}
          label="Nơi cấp"
          name="changes.gcn.location"
          as={TextField}
        />
      </GCNDiv>
    </React.Fragment>
  );
}

const GCNDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
`;

export default GCN;
