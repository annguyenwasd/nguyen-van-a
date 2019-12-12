import 'date-fns';
import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button, MenuItem, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Person from '../classes/Person';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import useForm from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';
import { append, remove, pathOr } from 'ramda';
import { useStateMachine } from 'little-state-machine';
import updateAction from '../utils/updateAction';

const honorifics = ['Ông', 'Bà'];

export default function({ sideName }) {
  const { register, handleSubmit, setValue } = useForm();
  const { action, state } = useStateMachine(updateAction);

  const [people, setPeople] = useState(
    pathOr([], [`side${sideName}`, 'people'], state)
  );

  const onSubmit = data => {
    action(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <People>
        <h2>
          Bên {sideName} &nbsp;
          <Button
            color="secondary"
            variant="contained"
            onClick={() => setPeople(append(new Person(), people))}
          >
            Thêm bên {sideName}
          </Button>
        </h2>

        {people.map((person, idx) => {
          const nthPerson = `side${sideName}.people.${idx}`;

          return (
            <PersonDiv key={`person-${idx}`}>
              <RHFInput
                register={register}
                setValue={setValue}
                as={<TextField />}
                name={`${nthPerson}.honorific`}
                select
                label="Ông/Bà"
                id="honorific-selector"
              >
                {honorifics.map(h => (
                  <MenuItem value={h} key={h}>
                    {h}
                  </MenuItem>
                ))}
              </RHFInput>
              <RHFInput
                register={register}
                setValue={setValue}
                as={<TextField />}
                label="Họ và tên"
                name={`${nthPerson}.fullName`}
                style={{ gridColumnEnd: 'span 3' }}
              />
              <RHFInput
                register={register}
                setValue={setValue}
                as={<TextField />}
                label="Sinh năm"
                type="number"
                name={`${nthPerson}.yearOfBirth`}
              />
              <RHFInput
                register={register}
                setValue={setValue}
                as={<TextField />}
                type="text"
                label="CMND số"
                name={`${nthPerson}.identifier`}
                style={{ gridRow: 2, gridColumn: '1/3' }}
              />
              <RHFInput
                register={register}
                name={`${nthPerson}.idDate`}
                as={
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
                      value={people[idx].idDate}
                      onChange={setValue}
                    />
                  </MuiPickersUtilsProvider>
                }
              />
              <RHFInput
                register={register}
                setValue={setValue}
                as={<TextField />}
                label="Cấp tại"
                name={`${nthPerson}.idLocation`}
                style={{ gridRow: 2, gridColumnEnd: 'span 2' }}
              />
              <RHFInput
                register={register}
                setValue={setValue}
                as={<TextField />}
                label="Số nhà"
                name={`${nthPerson}.houseNumber`}
                style={{ gridRow: 3, gridColumn: '1/3' }}
              />
              <RHFInput
                register={register}
                setValue={setValue}
                as={<TextField />}
                label="Quận/Huyện"
                name={`${nthPerson}.district`}
                style={{ gridRow: 3, gridColumn: '3/5' }}
              />
              <RHFInput
                register={register}
                setValue={setValue}
                as={<TextField />}
                label="Tỉnh/thành phố"
                name={`${nthPerson}.city`}
                style={{ gridRow: 3, gridColumn: '5/7' }}
              />
              <IconButton
                aria-label="delete"
                disabled={people.length < 2}
                onClick={() => setPeople(remove(idx, 1))}
                style={{ justifySelf: 'start' }}
              >
                <DeleteIcon fontSize="large" />
              </IconButton>
            </PersonDiv>
          );
        })}
      </People>
    </form>
  );
}

const PersonDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 100px);
  grid-gap: 30px;
  margin-bottom: 100px;
`;

const People = styled.div``;
