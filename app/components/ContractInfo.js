import React, { useState } from 'react';
import styled from 'styled-components';
import {
  TextField,
  InputAdornment,
  IconButton,
  Button
} from '@material-ui/core';
import LandType from '../classes/LandType';
import DeleteIcon from '@material-ui/icons/Delete';
import useForm from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';
import { remove, append } from 'ramda';
import { useStateMachine } from 'little-state-machine';
import updateAction from '../utils/updateAction';

export default function() {
  const { action, state } = useStateMachine(updateAction);
  const { register, handleSubmit, setValue, watch } = useForm(state);

  const [types, setTypes] = useState(state.contract.land.types);

  const onSubmit = values => {
    action(values);
  };

  const handleDelete = idx => {
    setTypes(remove(idx, 1, types));
    const nthType = `contract.land.types.${idx}`;
    unregister(`${nthType}.name`);
    unregister(`${nthType}.square`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Thông tin chuyển nhượng</h3>
      <Transfer>
        <RHFInput
          register={register}
          setValue={setValue}
          as={<TextField />}
          label="Diện tích"
          defaultValue={state.changes.before.square}
          name="changes.before.square"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <span>
                  m<sup>2</sup>
                </span>
              </InputAdornment>
            )
          }}
        />
        <RHFInput
          register={register}
          setValue={setValue}
          defaultValue={state.contract.land.squareText}
          as={<TextField />}
          label="Diện tích bằng chữ"
          name="contract.land.squareText"
        />
        <RHFInput
          register={register}
          setValue={setValue}
          defaultValue={state.contract.land.address}
          label="Địa chỉ đất"
          as={<TextField />}
          style={{
            gridColumnEnd: 'span 2'
          }}
          name="contract.land.address"
        />
        <RHFInput
          register={register}
          setValue={setValue}
          defaultValue={state.contract.land.purposeText}
          as={<TextField />}
          style={{
            gridColumnEnd: 'span 2'
          }}
          label="Mục đích sử dụng (bằng chữ)"
          name="contract.land.purposeText"
        />
        <RHFInput
          register={register}
          setValue={setValue}
          defaultValue={state.contract.land.duration}
          as={<TextField />}
          label="Thời hạn sử dụng"
          name="contract.land.duration"
        />
        <RHFInput
          register={register}
          setValue={setValue}
          defaultValue={state.contract.land.source}
          as={<TextField />}
          label="Nguồn gốc sử dụng"
          name="contract.land.source"
        />
        <RHFInput
          register={register}
          setValue={setValue}
          defaultValue={state.contract.land.limitation}
          as={<TextField />}
          style={{
            gridColumnEnd: 'span 2'
          }}
          label="Những hạn chế về quyền sử dụng đất"
          name="contract.land.limitation"
        />
        <LandTypes>
          <h4>
            Các loại đất &nbsp;
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setTypes(append(new LandType(), types))}
            >
              Thêm loại đất
            </Button>
          </h4>

          {types &&
            types.map((type, idx) => {
              const nthType = `contract.land.types.${idx}`;

              return (
                <LandTypeDiv key={type.id}>
                  <RHFInput
                    register={register}
                    setValue={setValue}
                    as={<TextField />}
                    label="Tên loại đất"
                    name={`${nthType}.name`}
                  />

                  <RHFInput
                    register={register}
                    setValue={setValue}
                    as={<TextField />}
                    label="Diện tích"
                    name={`${nthType}.square`}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <span>
                            m<sup>2</sup>
                          </span>
                        </InputAdornment>
                      )
                    }}
                  />

                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(idx)}
                    style={{ justifySelf: 'start' }}
                  >
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                </LandTypeDiv>
              );
            })}
        </LandTypes>
        <span></span>
      </Transfer>
    </form>
  );
}

const LandTypeDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
`;

const LandTypes = styled.div``;

const Transfer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
`;

const Land = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
`;

const Wrapper = styled.main`
  padding: 30px 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;
