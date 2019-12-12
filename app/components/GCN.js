import 'date-fns';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { RHFInput } from 'react-hook-form-input';
import useForm from 'react-hook-form';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { TextField } from '@material-ui/core';
import { useStateMachine } from 'little-state-machine';
import updateAction from '../utils/updateAction';
import { pathOr } from 'ramda';

function GCN() {
  const { action, state } = useStateMachine(updateAction);
  const { register, handleSubmit, setValue, watch, unregister } = useForm(
    state
  );

  const approveDate = watch('changes.gcn.approveDate');

  const onSubmit = values => {
    action(values);
  };

  useEffect(() => {
    register({ name: 'changes.gcn.approveDate', type: 'custom' });

    return () => unregister('changes.gcn.approveDate');
  }, [register]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Thông tin đăng kí biến động</h2>
      <h3>GCN</h3>
      <button>submit</button>
      <GCNDiv>
        <RHFInput
          register={register}
          setValue={setValue}
          defaultValue={state.changes.gcn.number}
          as={<TextField />}
          label="Số vào sổ cấp GCN"
          name="changes.gcn.number"
        />
        <RHFInput
          register={register}
          setValue={setValue}
          defaultValue={state.changes.gcn.publish}
          as={<TextField />}
          label="Số phát hành GCN"
          name="changes.gcn.publish"
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            value={approveDate}
            onChange={date => setValue('changes.gcn.approveDate', date)}
            variant="inline"
            format="dd/MM/yyyy"
            label="Ngày cấp GCN"
            id="gcn-date-picker-inline"
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>
        <RHFInput
          register={register}
          setValue={setValue}
          defaultValue={state.changes.gcn.location}
          as={<TextField />}
          style={{
            gridColumnEnd: 'span 3'
          }}
          label="Nơi cấp"
          name="changes.gcn.location"
        />
      </GCNDiv>
    </form>
  );
}

const GCNDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
`;

export default GCN;
