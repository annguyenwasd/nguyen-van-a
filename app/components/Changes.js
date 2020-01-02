import React from 'react';
import styled from 'styled-components';
import { InputAdornment, TextField } from '@material-ui/core';
import { isEmpty } from 'ramda';
import Input from './Input';
import { useFormContext } from 'react-form';

export default function Changes() {
  const { setFieldValue } = useFormContext();
  const copy = (e, name) => {
    setFieldValue(`changes.before.${name}`, e.target.value);
    setFieldValue(`changes.after.${name}`, e.target.value);
  };
  return (
    <>
      <h2>Thông tin đăng kí biến động</h2>

      <Land>
        <h4>Trước biến động</h4>
        <h4>Sau biến động</h4>

        <Input
          label="Thửa đất số"
          type="number"
          field="changes.before.number"
          onChange={e => copy(e, 'number')}
        />

        <Input label="Thửa đất số" type="number" field="changes.after.number" />

        <Input
          label="Tờ bản đồ số"
          type="number"
          field="changes.before.mapNumber"
          onChange={e => copy(e, 'mapNumber')}
        />

        <Input
          label="Tờ bản đồ số"
          type="number"
          field="changes.after.mapNumber"
        />

        <Input
          label="Mục đích sử dụng (kí hiệu)"
          type="text"
          field="changes.before.purpose"
          onChange={e => copy(e, 'purpose')}
        />

        <Input
          as={<TextField />}
          label="Mục đích sử dụng (kí hiệu)"
          type="text"
          field="changes.after.purpose"
        />

        <Input
          label="Diện tích"
          type="number"
          field="changes.before.square"
          onChange={e => copy(e, 'square')}
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

        <Input
          label="Diện tích"
          type="number"
          field="changes.after.square"
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

        <Input
          label="Lý do biến động"
          type="text"
          field="changes.reason"
          style={{
            gridColumnEnd: 'span 2'
          }}
        />
      </Land>
    </>
  );
}

const Land = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
`;
