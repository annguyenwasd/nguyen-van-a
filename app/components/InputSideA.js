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
  const { sideA } = values;

  return (
    <React.Fragment>
      <FieldArray
        name="sideA.people"
        render={arrayHelpers => {
          return (
            <People>
              <h2>
                Bên A &nbsp;
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => arrayHelpers.push(new Person())}
                >
                  Thêm bên A
                </Button>
              </h2>

              {sideA.people.map((person, idx) => {
                const nthPerson = `sideA.people.${idx}`;
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
                      style={{ gridColumnEnd: 'span 3' }}
                    />
                    <MyInput
                      label="Sinh năm"
                      type="number"
                      name={`${nthPerson}.yearOfBirth`}
                    />
                    <MyInput
                      label="CMND số"
                      name={`${nthPerson}.identifier`}
                      style={{ gridRow: 2, gridColumn: '1/2' }}
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
                        value={sideA.idDate}
                        onChange={date => {
                          setFieldValue('sideA.idDate', date);
                        }}
                      />
                    </MuiPickersUtilsProvider>
                    <MyInput
                      label="Cấp tại"
                      name={`${nthPerson}.idLocation`}
                      style={{ gridRow: 2, gridColumnEnd: 'span 2' }}
                    />
                    <MyInput
                      label="Địa chỉ"
                      name={`${nthPerson}.address`}
                      style={{ gridRow: 3, gridColumn: '1/6' }}
                    />

                    <IconButton
                      aria-label="delete"
                      disabled={sideA.people.length < 2}
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
