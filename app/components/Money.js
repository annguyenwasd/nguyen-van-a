import React from 'react';
import styled from 'styled-components';
import { TextField, InputAdornment } from '@material-ui/core';
import { RHFInput } from 'react-hook-form-input';
import useForm from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import updateAction from '../utils/updateAction';
import LandType from '../classes/LandType';

export default function() {
  const { action, state } = useStateMachine(updateAction);
  const { register, handleSubmit, setValue, watch } = useForm(state);

  const onSubmit = values => {
    action(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Transfer>
        <h4>Tiền</h4>
        <span></span>

        <RHFInput
          register={register}
          setValue={setValue}
          defaultValue={state.contract.price.number}
          as={<TextField />}
          label="Giá (bằng số)"
          name="contract.price.number"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <span>
                  <sup>vnđ</sup>
                </span>
              </InputAdornment>
            )
          }}
        />

        <RHFInput
          register={register}
          setValue={setValue}
          defaultValue={state.contract.price.text}
          as={<TextField />}
          label="Giá (bằng chữ)"
          type="text"
          name="contract.price.text"
        />

        <RHFInput
          register={register}
          setValue={setValue}
          defaultValue={state.contract.land.authenticateLocation}
          as={<TextField />}
          style={{
            gridColumnEnd: 'span 2'
          }}
          label="Nơi chứng thực"
          type="text"
          name="contract.land.authenticateLocation"
        />
      </Transfer>
    </form>
  );
}

const Transfer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
`;
