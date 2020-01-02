import React from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';

import Input from './Input';
import { useFormContext } from 'react-form';

export default function() {
  const { values } = useFormContext();
  return (
    <>
      <Input label="Năm làm hồ sơ" type="number" field="year" />

      <Output>
        <label htmlFor="input">Thư mục chứa file word</label>
        <input
          field="input"
          id="input"
          type="file"
          webkitdirectory="true"
          directory="true"
        />
      </Output>
      <Output>
        <label htmlFor="output">Thư mục xuất</label>
        <input
          field="output"
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
      >
        Xuất
      </Button>
    </>
  );
}

const Output = styled.div`
  grid-column-end: 2;

  label {
    margin-right: 20px;
  }
`;
