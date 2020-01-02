import 'date-fns';
import React from 'react';
import styled from 'styled-components';
import Input from './Input';
import DateInput from './DateInput';

function GCN() {
  return (
    <>
      <h2>Thông tin đăng kí biến động</h2>
      <h3>GCN</h3>
      <GCNDiv>
        <Input label="Số vào sổ cấp GCN" field="changes.gcn.number" />
        <Input label="Số phát hành GCN" field="changes.gcn.publish" />
        <DateInput
          field="changes.gcn.approveDate"
          label="Ngày cấp GCN"
          id="gcn-date-picker-inline"
        />
        <Input
          style={{
            gridColumnEnd: 'span 3'
          }}
          label="Nơi cấp"
          field="changes.gcn.location"
        />
      </GCNDiv>
    </>
  );
}

const GCNDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
`;

export default GCN;
