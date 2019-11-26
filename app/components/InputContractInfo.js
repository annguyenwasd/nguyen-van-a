import React from 'react';
import styled from 'styled-components';
import { InputAdornment, IconButton, Button } from '@material-ui/core';
import LandType from '../classes/LandType';
import { useFormikContext, FieldArray } from 'formik';
import DeleteIcon from '@material-ui/icons/Delete';
import MyInput from './MyInput';

export default function() {
  const {
    values: { contract }
  } = useFormikContext();

  return (
    <React.Fragment>
      <Sep />
      <h3>Thông tin chuyển nhượng</h3>
      <Transfer>
        <MyInput
          label="Diện tích"
          type="number"
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

        <MyInput
          label="Diện tích bằng chữ"
          type="text"
          name="contract.land.squareText"
        />
        <MyInput
          label="Địa chỉ đất"
          style={{
            gridColumnEnd: 'span 2'
          }}
          type="text"
          name="contract.land.address"
        />
        <MyInput
          style={{
            gridColumnEnd: 'span 2'
          }}
          label="Mục đích sử dụng (bằng chữ)"
          type="text"
          name="contract.land.purposeText"
        />

        <MyInput
          label="Thời hạn sử dụng"
          type="text"
          name="contract.land.duration"
        />
        <MyInput
          label="Nguồn gốc sử dụng"
          type="text"
          name="contract.land.source"
        />
        <MyInput
          style={{
            gridColumnEnd: 'span 2'
          }}
          label="Những hạn chế về quyền sử dụng đất"
          type="text"
          name="contract.land.limitation"
        />

        <FieldArray
          name="contract.land.types"
          render={arrayHelpers => {
            return (
              <LandTypes>
                <h4>
                  Các loại đất &nbsp;
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => arrayHelpers.push(new LandType())}
                  >
                    Thêm loại đất
                  </Button>
                </h4>

                {contract.land.types.map((type, idx) => {
                  const nthType = `contract.land.types.${idx}`;
                  return (
                    <LandTypeDiv key={type.id}>
                      <MyInput label="Tên loại đất" name={`${nthType}.name`} />
                      <MyInput
                        label="Diện tích"
                        type="number"
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
                        disabled={contract.land.types.length < 2}
                        onClick={() => arrayHelpers.remove(idx)}
                        style={{ justifySelf: 'start' }}
                      >
                        <DeleteIcon fontSize="large" />
                      </IconButton>
                    </LandTypeDiv>
                  );
                })}
              </LandTypes>
            );
          }}
        />
        <span></span>

        <h4>Tiền</h4>
        <span></span>

        <MyInput
          label="Giá (bằng số)"
          type="number"
          name="contract.price.number"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <span>
                  <sup>vnđ</sup>
                </span>
              </InputAdornment>
            )
          }}
        />
        <MyInput
          label="Giá (bằng chữ)"
          type="text"
          name="contract.price.text"
        />

        <MyInput
          style={{
            gridColumnEnd: 'span 2'
          }}
          label="Nơi chứng thực"
          type="text"
          name="contract.land.authenticateLocation"
        />
      </Transfer>
    </React.Fragment>
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

const Misc = styled(Land)``;

const GCN = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
`;

const Sep = styled.div`
  height: 50px;
`;

const Wrapper = styled.main`
  padding: 30px 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;
