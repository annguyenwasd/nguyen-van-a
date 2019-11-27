import React from 'react';
import styled from 'styled-components';
import { useFormikContext } from 'formik';
import { Button } from '@material-ui/core';

import MyInput from './MyInput';

export default function() {
  const { setFieldValue } = useFormikContext();

  return (
    <Wrapper>
      <MyInput label="Năm làm hồ sơ" type="number" name="year" />

      <Output>
        <label htmlFor="input">Thư mục chứa file word</label>
        <input
          onChange={e => {
            setFieldValue('input', e.target.files[0]);
          }}
          id="input"
          type="file"
          webkitdirectory="true"
          directory="true"
        />
      </Output>
      <Output>
        <label htmlFor="output">Thư mục xuất</label>
        <input
          onChange={e => {
            setFieldValue('output', e.target.files[0]);
          }}
          id="output"
          type="file"
          webkitdirectory="true"
          directory="true"
        />
      </Output>
      <Button variant="contained" color="primary" type="submit">
        Xuất
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
