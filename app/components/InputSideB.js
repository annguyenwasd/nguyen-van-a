import React from 'react';
import styled from 'styled-components';
import { TextField, Button, MenuItem, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MyInput from './MyInput';
import Person from '../classes/Person';
import { FieldArray, useFormikContext } from 'formik';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const honorifics = ['Ông', 'Bà'];

export default function() {
  const { values, setFieldValue } = useFormikContext();
  const { sideB } = values;

  return (
    <React.Fragment>
      <FieldArray
        name="sideB.people"
        render={arrayHelpers => {
          return (
            <People>
              <h2>
                Bên B &nbsp;
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => arrayHelpers.push(new Person())}
                >
                  Thêm bên B
                </Button>
              </h2>

              {sideB.people.map((person, idx) => {
                const nthPerson = `sideB.people.${idx}`;
                return (
                  <PersonDiv key={person.id}>
                    <MyInput
                      name={`${nthPerson}.honorific`}
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
                    </MyInput>
                    <MyInput
                      label="Họ và tên"
                      name={`${nthPerson}.fullName`}
                      as={TextField}
                      style={{ gridColumnEnd: 'span 3' }}
                    />
                    <MyInput
                      label="Sinh năm"
                      type="number"
                      name={`${nthPerson}.yearOfBirth`}
                      as={TextField}
                    />
                    <MyInput
                      label="CMND số"
                      name={`${nthPerson}.identifier`}
                      as={TextField}
                      style={{ gridRow: 2, gridColumn: '1/3' }}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        style={{ gridRow: 2, gridColumnEnd: 'span 2' }}
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        id="date-picker-inline"
                        label="Ngày cấp GCN"
                        KeyboardButtonProps={{
                          'aria-label': 'change date'
                        }}
                        value={sideB.idDate}
                        onChange={date => {
                          setFieldValue('sideB.idDate', date);
                        }}
                      />
                    </MuiPickersUtilsProvider>
                    <MyInput
                      label="Cấp tại"
                      name={`${nthPerson}.idLocation`}
                      as={TextField}
                      style={{ gridRow: 2, gridColumnEnd: 'span 2' }}
                    />
                    <MyInput
                      label="Địa chỉ"
                      name={`${nthPerson}.address`}
                      as={TextField}
                      style={{ gridRow: 3, gridColumn: '1/6' }}
                    />
                    <IconButton
                      aria-label="delete"
                      disabled={sideB.people.length < 2}
                      onClick={() => arrayHelpers.remove(idx)}
                      style={{ justifySelf: 'start' }}
                    >
                      <DeleteIcon fontSize="large" />
                    </IconButton>
                  </PersonDiv>
                );
              })}
            </People>
          );
        }}
      />
    </React.Fragment>
  );
}

const PersonDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 100px);
  grid-gap: 30px;
  margin-bottom: 30px;
`;

const People = styled.div``;

const Side = styled.div``;

const Sep = styled.div`
  height: 50px;
`;
