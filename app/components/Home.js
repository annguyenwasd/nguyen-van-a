import React from 'react';
import styled from 'styled-components';
import useForm, { FormContext } from 'react-hook-form';
import {
  Button,
  Step,
  Stepper,
  StepButton,
  Typography
} from '@material-ui/core';
import { assocPath, compose, map, prop, assoc } from 'ramda';
import moment from 'moment';
import { StateMachineProvider, createStore } from 'little-state-machine';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Person from '../classes/Person';
import Changes from './Changes';
import ContractInfo from './ContractInfo';
import Misc from './Misc';
import { generate } from '../utils/generator';
import GCN from './GCN';
import Side from './Side';
import Money from './Money';

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
      number: '1234',
      publish: '',
      approveDate: now,
      location: ''
    },
    before: {
      square: 2222,
      number: '',
      mapNumber: '',
      purpose: ''
    },
    after: {
      square: '',
      number: '',
      mapNumber: '',
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
      number: '',
      text: ''
    },
    authenticateLocation: '',
    output: null,
    input: null
  }
};

const toString = date => moment(date).format('DD/MM/YYYY');

const formatPeople = people =>
  people.map(p => ({
    ...p,
    idDate: toString(p.idDate),
    address: `${p.houseNumber} ${p.district} ${p.city}`,
    fullNameCap: p.fullName.toUpperCase()
  }));

const handleSubmit = values => {
  const data = compose(
    assocPath(
      ['changes', 'gcn', 'approveDate'],
      toString(values.changes.gcn.approveDate)
    ),
    map(assoc('id', prop('identifier')))
  )(values);

  data.sideA.people = formatPeople(values.sideA.people);

  data.sideB.people = formatPeople(values.sideB.people);

  data.sideB.names = data.sideB.people
    .map(
      p =>
        `${p.fullName}, sinh năm ${p.yearOfBirth}, CMND số: ${p.identifier} cấp ngày: ${p.idDate} tại ${p.idLocation}`
    )
    .join(' và ');

  generate(data);
};

createStore(initialValues);

export default function Home() {
  return (
    <StateMachineProvider>
      <Wrapper>
        <Router>
          <Link to="/step1">Nhập thông tin bên A</Link>
          <Link to="/step2">Nhập thông tin bên B</Link>
          <Link to="/step3">GCN</Link>
          <Link to="/step4">Nhập thông tin biến động</Link>
          <Link to="/step5">Nhập thông tin hợp đồng</Link>
          <Link to="/step6">Nhập thông tin tiền</Link>
          <Link to="/step7">Nhập thông tin phụ</Link>
          <Route exact path="/step1" render={() => <Side sideName="A" />} />
          <Route exact path="/step2" render={() => <Side sideName="B" />} />
          <Route exact path="/step3" component={GCN} />
          <Route exact path="/step4" component={Changes} />
          <Route exact path="/step5" component={ContractInfo} />
          <Route exact path="/step6" component={Money} />
          <Route exact path="/step7" component={Misc} />
        </Router>
      </Wrapper>
    </StateMachineProvider>
  );
}

const Wrapper = styled.main`
  padding: 30px 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const Sep = styled.div`
  height: 50px;
`;
