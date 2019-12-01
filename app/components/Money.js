import React from 'react';
import styled from 'styled-components';
import { InputAdornment, IconButton, Button } from '@material-ui/core';
import LandType from '../classes/LandType';
import { useFormikContext, FieldArray } from 'formik';
import DeleteIcon from '@material-ui/icons/Delete';
import MyInput, { MoneyFormat } from './MyInput';

export default function() {
  const {
    values: { contract }
  } = useFormikContext();

  return (
    <React.Fragment>
      <Transfer>
        <h4>Tiền</h4>
        <span></span>

        <MyInput
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

        <MyInput
          label="Giá (bằng chữ)"
          type="text"
          name="contract.price.text"
        />

        <MyInput
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

const Land = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
`;
