import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-form';
import { Button, Step, Stepper, StepButton } from '@material-ui/core';
import { assocPath, compose } from 'ramda';
import moment from 'moment';
import Person from '../classes/Person';
import Changes from './Changes';
import ContractInfo from './ContractInfo';
import Misc from './Misc';
import { generate, writeJson } from '../utils/generator';
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
      number: '',
      publish: '',
      approveDate: now,
      location: ''
    },
    before: {
      square: 0,
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
    address: `${p.houseNumber}, ${p.districtType} ${p.district}, ${p.cityType} ${p.city}`,
    fullNameCap: p.fullName.toUpperCase()
  }));

const handleSubmit = values => {
  writeJson(values);
  const data = compose(
    assocPath(
      ['changes', 'gcn', 'approveDate'],
      toString(values.changes.gcn.approveDate)
    )
  )(values);

  data.sideA.people = formatPeople(values.sideA.people);

  data.sideB.people = formatPeople(values.sideB.people);

  data.sideB.peopleInfo = data.sideB.people
    .map(
      p =>
        `${p.honorific} ${p.fullNameCap}, sinh năm ${p.yearOfBirth}, CMND số: ${p.identifier} cấp ngày: ${p.idDate} tại ${p.idLocation}`
    )
    .join(' và ');

  data.sideA.names = data.sideA.people
    .map(p => `${p.honorific} ${p.fullName}`)
    .join(' và ');

  data.sideB.names = data.sideB.people
    .map(p => `${p.honorific} ${p.fullName}`)
    .join(' và ');

  generate(data);
};

const steps = [
  'Nhập thông tin bên A',
  'Nhập thông tin bên B',
  'GCN',
  'Nhập thông tin biến động',
  'Nhập thông tin hợp đồng',
  'Nhập thông tin tiền',
  'Nhập thông tin phụ'
];

export default function Home({ jsonFile = initialValues }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const { Form } = useForm({
    defaultValues: jsonFile,
    onSubmit: values => {
      handleSubmit(values);
    }
  });

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <Side sideName="A" />;
      case 1:
        return <Side sideName="B" />;
      case 2:
        return <GCN />;
      case 3:
        return <Changes />;
      case 4:
        return <ContractInfo />;
      case 5:
        return <Money />;
      case 6:
        return <Misc />;
      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <Form>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((label, idx) => (
            <Step key={label}>
              <StepButton onClick={() => setActiveStep(idx)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        {getStepContent(activeStep)}
        <Actions>
          <Button
            variant="contained"
            disabled={activeStep === 0}
            onClick={() => setActiveStep(activeStep === 0 ? 0 : activeStep - 1)}
          >
            Bước trước đó
          </Button>
          <Button
            variant="contained"
            disabled={activeStep === steps.length - 1}
            onClick={() =>
              setActiveStep(
                activeStep < steps.length - 1 ? activeStep + 1 : activeStep
              )
            }
          >
            Bước kế tiếp
          </Button>
        </Actions>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  padding: 30px 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const Actions = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
