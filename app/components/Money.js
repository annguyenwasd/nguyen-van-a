import React from 'react';
import styled from 'styled-components';
import { TextField, InputAdornment } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';

import LandType from '../classes/LandType';
export default function() {
  const { register, setValue } = useFormContext();

  return (
    <React.Fragment>
      <Transfer>
        <h4>Tiền</h4>
        <span></span>

        <RHFInput
          register={register}
          setValue={setValue}
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
          as={<TextField />}
          label="Giá (bằng chữ)"
          type="text"
          name="contract.price.text"
        />

        <RHFInput
          register={register}
          setValue={setValue}
          as={<TextField />}
          style={{
            gridColumnEnd: 'span 2'
          }}
          label="Nơi chứng thực"
          type="text"
          name="contract.land.authenticateLocation"
        />
      </Transfer>
    </React.Fragment>
  );
}

const Transfer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
`;

