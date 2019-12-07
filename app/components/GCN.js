import 'date-fns';
import React from 'react';
import styled from 'styled-components';
import { RHFInput } from 'react-hook-form-input';
import { useFormContext } from 'react-hook-form';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { TextField } from '@material-ui/core';

function GCN() {
  const { register, setValue } = useFormContext();

  return (
    <React.Fragment>
      <h2>Thông tin đăng kí biến động</h2>
      <h3>GCN</h3>
      <GCNDiv>
        <RHFInput
          register={register}
          setValue={setValue}
          as={<TextField />}
          label="Số vào sổ cấp GCN"
          name="changes.gcn.number"
        />

        <RHFInput
          register={register}
          setValue={setValue}
          as={<TextField />}
          label="Số phát hành GCN"
          name="changes.gcn.publish"
        />

        <RHFInput
          register={register}
          as={
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                onChange={setValue}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                label="Ngày cấp GCN"
                id="date-picker-inline"
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>
          }
          name="changes.gcn.approveDate"
        />

        <RHFInput
          register={register}
          setValue={setValue}
          as={<TextField />}
          style={{
            gridColumnEnd: 'span 3'
          }}
          label="Nơi cấp"
          name="changes.gcn.location"
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
