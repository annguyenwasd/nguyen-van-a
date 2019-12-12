import React from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';
import { RHFInput } from 'react-hook-form-input';
import useForm from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import updateAction from '../utils/updateAction';

export default function() {
  const { action, state } = useStateMachine(updateAction);
  const { register, handleSubmit, setValue, watch } = useForm(state);

  const onSubmit = values => {
    action(values);
  };

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <RHFInput
        register={register}
        setValue={setValue}
        defaultValue={state.year}
        as={<TextField />}
        label="Năm làm hồ sơ"
        type="number"
        name="year"
      />

      <Output>
        <label htmlFor="input">Thư mục chứa file word</label>
        <input
          ref={register}
          name="input"
          defaultValue={state.input}
          id="input"
          type="file"
          webkitdirectory="true"
          directory="true"
        />
      </Output>
      <Output>
        <label htmlFor="output">Thư mục xuất</label>
        <input
          ref={register}
          defaultValue={state.output}
          name="output"
          id="output"
          type="file"
          webkitdirectory="true"
          directory="true"
        />
      </Output>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!state.input}
      >
        Xuất
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
`;

const Output = styled.div`
  grid-column-end: 2;

  label {
    margin-right: 20px;
  }
`;
