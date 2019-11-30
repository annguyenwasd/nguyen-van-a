import React from 'react';
import styled from 'styled-components';
import { Form, Text, ArrayField, Radio, RadioGroup, Scope } from 'informed';

import Input from './Input';

import { TextField, Button, MenuItem, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { FieldArray, useFormikContext } from 'formik';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Person from '../classes/Person';

const now = new Date();
const initialValues = {
  sideA: {
    people: [new Person()]
  },
  sideB: {
    people: [new Person()]
  },
  year: now.getFullYear(),
  changes: {
    gcn: {
      number: '',
      publish: '',
      approveDate: now,
      location: ''
    },
    before: {
      square: 0,
      number: 0,
      mapNumber: 0,
      purpose: ''
    },
    after: {
      square: 0,
      number: 0,
      mapNumber: 0,
      purpose: ''
    },
    reason: ''
  },
  contract: {
    land: {
      squareText: '',
      address: '',
      purposeText: '',
      duration: '',
      source: '',
      limitation: '',
      types: []
    },
    price: {
      number: 0,
      text: ''
    },
    authenticateLocation: '',
    output: null,
    input: null
  }
};

function Home() {
  return (
    <Form
      onSubmit={values => console.log(values)}
      initialValues={initialValues}
    >
      <div>
        <SideA />
        <button type="submit">submit</button>
      </div>
    </Form>
  );
}

export default Home;
const honorifics = ['Ông', 'Bà'];

function SideA() {
  return (
    <Scope scope="sideA">
      <ArrayField field="people">
        {({ add, fields }) => (
          <>
            <h2>Side A</h2>
            <button onClick={add}>add</button>

            {fields.map(({ field, key, remove, initialValue }) => (
              <PersonDiv key={key}>
                <Input
                  field={`${field}.honorific`}
                  as={TextField}
                  select
                  label="Ông/Bà"
                  id="honorific-selector"
                >
                  {honorifics.map(h => (
                    <MenuItem value={h} key={h}>
                      {h}
                    </MenuItem>
                  ))}
                </Input>
                <Input
                  label="Họ và tên"
                  field={`${field}.fullName`}
                  initialValue={initialValue.fullName}
                  style={{ gridColumnEnd: 'span 3' }}
                />
                {/* <Input
                  label="Sinh năm"
                  type="number"
                  field={`${field}.yearOfBirth`}
                />
                <Input
                  label="CMND số"
                  field={`${field}.identifier`}
                  style={{ gridRow: 2, gridColumn: '1/2' }}
                />
                <Input
                  label="Cấp tại"
                  field={`${field}.idLocation`}
                  style={{ gridRow: 2, gridColumnEnd: 'span 2' }}
                />
                <Input
                  label="Địa chỉ"
                  field={`${field}.address`}
                  style={{ gridRow: 3, gridColumn: '1/6' }}
                /> */}

                <IconButton
                  aria-label="delete"
                  onClick={() => arrayHelpers.remove(idx)}
                  style={{ justifySelf: 'start' }}
                >
                  <DeleteIcon fontSize="large" />
                </IconButton>
              </PersonDiv>
            ))}
          </>
        )}
      </ArrayField>
    </Scope>
  );
}
const PersonDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 100px);
  grid-gap: 30px;
  margin-bottom: 30px;
`;
