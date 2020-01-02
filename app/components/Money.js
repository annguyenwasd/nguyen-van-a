import React from 'react';
import styled from 'styled-components';
import { InputAdornment } from '@material-ui/core';
import Input from './Input';

export default function() {
  return (
    <>
      <Transfer>
        <h4>Tiền</h4>
        <span></span>

        <Input
          label="Giá (bằng số)"
          field="contract.price.number"
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

        <Input label="Giá (bằng chữ)" type="text" field="contract.price.text" />

        <Input
          style={{
            gridColumnEnd: 'span 2'
          }}
          label="Nơi chứng thực"
          type="text"
          field="contract.land.authenticateLocation"
        />
      </Transfer>
    </>
  );
}

const Transfer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
`;
