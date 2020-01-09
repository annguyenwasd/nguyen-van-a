import React from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';

import Input from './Input';
import { useFormContext } from 'react-form';

export default function() {
  const { values, setValues } = useFormContext();
  return (
    <>
      <Input label="Năm làm hồ sơ" type="number" field="year" />

      <Folder>
        <label htmlFor="input">Thư mục chứa file word: {values.input}</label>
        <input
          onChange={e =>
            setValues({ ...values, input: e.target.files[0].path })
          }
          id="input"
          type="file"
          webkitdirectory="true"
          directory="true"
        />
      </Folder>
      <Folder>
        <label htmlFor="output">Thư mục xuất: {values.output}</label>
        <input
          onChange={e =>
            setValues({ ...values, output: e.target.files[0].path })
          }
          id="output"
          type="file"
          webkitdirectory="true"
          directory="true"
        />
      </Folder>
      <Button variant="contained" color="primary" type="submit">
        Xuất
      </Button>
    </>
  );
}

const Folder = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  grid-column-gap: 30px;
  margin: 30px 0;

  label {
    margin-right: 20px;
  }
`;
