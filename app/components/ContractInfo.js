import React from 'react';
import styled from 'styled-components';
import { InputAdornment, IconButton, Button } from '@material-ui/core';
import { useFormContext } from 'react-form';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from './Input';
import LandType from '../classes/LandType';

export default function() {
  const { pushFieldValue, getFieldValue, removeFieldValue } = useFormContext();
  return (
    <>
      <h3>Thông tin chuyển nhượng</h3>
      <Transfer>
        <Input
          label="Diện tích"
          field="changes.before.square"
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
        <Input label="Diện tích bằng chữ" field="contract.land.squareText" />
        <Input
          label="Địa chỉ đất"
          style={{
            gridColumnEnd: 'span 2'
          }}
          field="contract.land.address"
        />
        <Input
          style={{
            gridColumnEnd: 'span 2'
          }}
          label="Mục đích sử dụng (bằng chữ)"
          field="contract.land.purposeText"
        />
        <Input label="Thời hạn sử dụng" field="contract.land.duration" />
        <Input label="Nguồn gốc sử dụng" field="contract.land.source" />
        <Input
          style={{
            gridColumnEnd: 'span 2'
          }}
          label="Những hạn chế về quyền sử dụng đất"
          field="contract.land.limitation"
        />
        <LandTypes>
          <h4>
            Các loại đất &nbsp;
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                pushFieldValue('contract.land.types', new LandType())
              }
            >
              Thêm loại đất
            </Button>
          </h4>

          {getFieldValue('contract.land.types').map((type, idx) => {
            const nthType = `contract.land.types.${idx}`;

            return (
              <LandTypeDiv key={type.id}>
                <Input label="Tên loại đất" field={`${nthType}.name`} />

                <Input
                  label="Diện tích"
                  field={`${nthType}.square`}
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
                  onClick={() => removeFieldValue(idx)}
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
    </>
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
