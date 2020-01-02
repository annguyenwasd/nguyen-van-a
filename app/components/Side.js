import 'date-fns';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextField, Button, MenuItem, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Person from '../classes/Person';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { append, remove, pathOr } from 'ramda';
import Input from './Input';
import DateInput from './DateInput';
import { useFormContext } from 'react-form';

const honorifics = ['Ông', 'Bà'];

export default function Side({ sideName }) {
  const { getFieldValue, pushFieldValue, removeFieldValue } = useFormContext();
  const peopleField = `side${sideName}.people`;
  return (
    <People>
      <h2>
        Bên {sideName} &nbsp;
        <Button
          color="secondary"
          variant="contained"
          onClick={() => pushFieldValue(peopleField, new Person())}
        >
          Thêm bên {sideName}
        </Button>
      </h2>

      {getFieldValue(peopleField).map((person, idx) => {
        const nthPerson = `${peopleField}.${idx}`;

        return (
          <PersonDiv key={`person-${idx}`}>
            <Input
              field={`${nthPerson}.honorific`}
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
              field={`${nthPerson}.fullName`}
              style={{ gridColumnEnd: 'span 3' }}
            />
            <Input label="Sinh năm" field={`${nthPerson}.yearOfBirth`} />
            <Input
              type="text"
              label="CMND số"
              field={`${nthPerson}.identifier`}
              style={{ gridRow: 2, gridColumn: '1/3' }}
            />
            <DateInput
              style={{ gridRow: 2, gridColumnEnd: 'span 2' }}
              field={`${nthPerson}.idDate`}
              label="Ngày cấp GCN"
            />
            <Input
              label="Cấp tại"
              field={`${nthPerson}.idLocation`}
              style={{ gridRow: 2, gridColumnEnd: 'span 2' }}
            />
            <Input
              label="Số nhà"
              field={`${nthPerson}.houseNumber`}
              style={{ gridRow: 3, gridColumn: '1/3' }}
            />
            <Input
              label="Quận/Huyện"
              field={`${nthPerson}.district`}
              style={{ gridRow: 3, gridColumn: '3/5' }}
            />
            <Input
              label="Tỉnh/thành phố"
              field={`${nthPerson}.city`}
              style={{ gridRow: 3, gridColumn: '5/7' }}
            />
            <IconButton
              aria-label="delete"
              disabled={getFieldValue(peopleField).length < 2}
              onClick={() => removeFieldValue(idx)}
              style={{ justifySelf: 'start' }}
            >
              <DeleteIcon fontSize="large" />
            </IconButton>
          </PersonDiv>
        );
      })}
    </People>
  );
}

const PersonDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 100px);
  grid-gap: 30px;
  margin-bottom: 100px;
`;

const People = styled.div``;
