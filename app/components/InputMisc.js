import React from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';

export default function() {
  const { register, setValue, getValues } = useFormContext();

  const values = getValues({ nest: true });

  return (
    <Wrapper>
      <RHFInput
        register={register}
        setValue={setValue}
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
        disabled={!values.input}
      >
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
