import React from 'react';
import styled from 'styled-components';
import { InputAdornment, TextField } from '@material-ui/core';
import useForm from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';
import { isEmpty } from 'ramda';
import { useStateMachine } from 'little-state-machine';
import updateAction from '../utils/updateAction';

export default function InputChanges() {
  const { action, state } = useStateMachine(updateAction);
  const { register, handleSubmit, setValue, watch } = useForm(state);

  const copy = name => {
    const values = getValues();
    const b4Value = values[`changes.before.${name}`];
    const afterValue = values[`changes.after.${name}`];
    setValue(`changes.after.${name}`, b4Value);
  };

  console.log(state);

  const onSubmit = values => action(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Thông tin đăng kí biến động</h2>

      <Land>
        <h4>Trước biến động</h4>
        <h4>Sau biến động</h4>

        <RHFInput
          register={register}
          setValue={setValue}
          defaultValue={state.changes.before.number}
          as={<TextField />}
          label="Thửa đất số"
          type="number"
          name="changes.before.number"
          onChange={() => copy('number')}
        />

        <RHFInput
          register={register}
          setValue={setValue}
          defaultValue={state.changes.after.number}
          as={<TextField />}
          label="Thửa đất số"
          type="number"
          name="changes.after.number"
        />

        <RHFInput
          register={register}
          setValue={setValue}
          defaultValue={state.changes.before.mapNumber}
          as={<TextField />}
          label="Tờ bản đồ số"
          type="number"
          name="changes.before.mapNumber"
          onChange={() => copy('mapNumber')}
        />

        <RHFInput
          register={register}
          setValue={setValue}
          defaultValue={state.changes.after.mapNumber}
          as={<TextField />}
          label="Tờ bản đồ số"
          type="number"
          name="changes.after.mapNumber"
        />

        <RHFInput
          register={register}
          setValue={setValue}
          defaultValue={state.changes.before.purpose}
          as={<TextField />}
          label="Mục đích sử dụng (kí hiệu)"
          type="text"
          name="changes.before.purpose"
          onChange={() => copy('purpose')}
        />

        <RHFInput
          register={register}
          setValue={setValue}
          defaultValue={state.changes.after.purpose}
          as={<TextField />}
          label="Mục đích sử dụng (kí hiệu)"
          type="text"
          name="changes.after.purpose"
        />

        <RHFInput
          register={register}
          setValue={setValue}
          defaultValue={state.changes.before.square}
          as={<TextField />}
          label="Diện tích"
          type="number"
          name="changes.before.square"
          onChange={() => copy('square')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <span>
                  m<sup>2</sup>
                </span>
              </InputAdornment>
            )
          }}
        />

        <RHFInput
          register={register}
          setValue={setValue}
          as={<TextField />}
          defaultValue={state.changes.after.square}
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
        />

        <RHFInput
          register={register}
          setValue={setValue}
          defaultValue={state.changes.reason}
          as={<TextField />}
          label="Lý do biến động"
          type="text"
          name="changes.reason"
          style={{
            gridColumnEnd: 'span 2'
          }}
        />
      </Land>
    </form>
  );
}

const Land = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
`;
