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

export default function({ sideName }) {
  const { values, setFieldValue } = useFormikContext();
  const side = values[`side${sideName}`];

  return (
    <React.Fragment>
      <FieldArray
        name={`side${sideName}.people`}
        render={arrayHelpers => {
          return (
            <People>
              <h2>
                Bên {sideName} &nbsp;
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => arrayHelpers.push(new Person())}
                >
                  Thêm bên {sideName}
                </Button>
              </h2>

              {side.people.map((person, idx) => {
                const nthPerson = `side${sideName}.people.${idx}`;
                return (
                  <PersonDiv key={person.identifier}>
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
                        label="Ngày cấp"
                        KeyboardButtonProps={{
                          'aria-label': 'change date'
                        }}
                        value={side.idDate}
                        onChange={date => {
                          setFieldValue(`side${sideName}.idDate`, date);
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
                      label="Số nhà"
                      name={`${nthPerson}.houseNumber`}
                      as={TextField}
                      style={{ gridRow: 3, gridColumn: '1/3' }}
                    />
                    <MyInput
                      label="Quận/Huyện"
                      name={`${nthPerson}.district`}
                      as={TextField}
                      style={{ gridRow: 3, gridColumn: '3/5' }}
                    />
                    <MyInput
                      label="Tỉnh/thành phố"
                      name={`${nthPerson}.city`}
                      as={TextField}
                      style={{ gridRow: 3, gridColumn: '5/7' }}
                    />
                    <IconButton
                      aria-label="delete"
                      disabled={side.people.length < 2}
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
  margin-bottom: 100px;
`;

const People = styled.div``;
