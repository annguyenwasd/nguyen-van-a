import 'date-fns';
import React from 'react';
import styled from 'styled-components';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { InputAdornment, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { useFormikContext } from 'formik';
import MyInput from './MyInput';

export default function() {
  const {
    values: { changes },
    setFieldValue
  } = useFormikContext();

  return (
    <React.Fragment>
      <h2>Thông tin đăng kí biến động</h2>
      <h3>GCN</h3>

      <GCN>
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
      </GCN>
      <Sep />
      <h2>Thông tin đăng kí biến động</h2>
      <h3>Thông tin đất</h3>

      <Land>
        <h4>Trước biến động</h4>
        <h4>Sau biến động</h4>

        <MyInput
          label="Thửa đất số"
          type="number"
          name="changes.before.number"
          as={TextField}
        />
        <MyInput
          label="Thửa đất số"
          type="number"
          name="changes.after.number"
          as={TextField}
        />

        <MyInput
          label="Tờ bản đồ số"
          type="number"
          name="changes.before.mapNumber"
          as={TextField}
        />
        <MyInput
          label="Tờ bản đồ số"
          type="number"
          name="changes.after.mapNumber"
          as={TextField}
        />

        <MyInput
          label="Mục đích sử dụng (kí hiệu)"
          type="text"
          name="changes.before.purpose"
          as={TextField}
        />
        <MyInput
          label="Mục đích sử dụng (kí hiệu)"
          type="text"
          name="changes.after.purpose"
          as={TextField}
        />

        <MyInput
          label="Diện tích"
          type="number"
          name="changes.before.square"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <span>
                  m<sup>2</sup>
                </span>
              </InputAdornment>
            )
          }}
          as={TextField}
        />
        <MyInput
          label="Diện tích"
          type="number"
          name="changes.after.square"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <span>
                  m<sup>2</sup>
                </span>
              </InputAdornment>
            )
          }}
          as={TextField}
        />

        <MyInput
          label="Lý do biến động"
          type="text"
          name="changes.reason"
          style={{
            gridColumnEnd: 'span 2'
          }}
          as={TextField}
        />
      </Land>
    </React.Fragment>
  );
}

const GCN = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
`;
const Sep = styled.div`
  height: 50px;
`;

const Land = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
`;
