import React from 'react';
import styled from 'styled-components';
import { InputAdornment, TextField } from '@material-ui/core';
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
          value={changes.after.number || changes.before.number}
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
          value={changes.after.mapNumber || changes.before.mapNumber}
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
          value={changes.after.purpose || changes.before.purpose}
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
          value={changes.after.square || changes.before.square}
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

const Land = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
`;
