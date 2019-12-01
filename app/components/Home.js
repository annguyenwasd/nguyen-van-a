import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import {
  Button,
  Step,
  Stepper,
  StepButton,
  Typography
} from '@material-ui/core';
import { assocPath, compose, map, prop, assoc } from 'ramda';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Person from '../classes/Person';
import InputChanges from './InputChanges';
import InputContractInfo from './InputContractInfo';
import InputMisc from './InputMisc';
import { generate } from '../classes/Generator';
import GCN from './GCN';
import Side from './Side';
import Money from './Money';
import { moveSyntheticComments } from 'typescript';

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
      approveDate: new Date(),
      location: ''
    },
    before: {
      square: 0,
      number: 0,
      mapNumber: 0,
      purpose: ''
    },
    after: {
      square: 0,
      number: 0,
      mapNumber: 0,
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
      number: 0,
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

  data.year = toString(data.year);

  data.sideB.names = data.sideB.people
    .map(
      p =>
        `${p.fullName}, sinh năm ${p.yearOfBirth}, CMND số: ${p.idenfitier} cấp ngày: ${p.idDate} tại ${p.idLocation}`
    )
    .join(' và ');

  generate(data);
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  button: {
    marginRight: theme.spacing(1)
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  completed: {
    display: 'inline-block'
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));
function getSteps() {
  return [
    'Nhập thông tin bên A',
    'Nhập thông tin bên B',
    'GCN',
    'Nhập thông tin biến động',
    'Nhập thông tin hợp đồng',
    'Nhập thông tin tiền',
    'Nhập thông tin phụ'
  ];
}
function getStepContent(step) {
  switch (step) {
    case 0:
      return <Side sideName="A" />;
    case 1:
      return <Side sideName="B" />;
    case 2:
      return <GCN />;
    case 3:
      return <InputChanges />;
    case 4:
      return <InputContractInfo />;
    case 5:
      return <Money />;
    case 6:
      return <InputMisc />;
    default:
      return 'Unknown step';
  }
}
export default function() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const totalSteps = () => {
    return getSteps().length;
  };
  const isStepOptional = step => {
    return step === -1;
  };
  const skippedSteps = () => {
    return skipped.size;
  };
  const completedSteps = () => {
    return completed.size;
  };
  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps();
  };
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted() // It's the last step, but not all steps have been completed
        ? // find the first step that has been completed
          steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  const handleStep = step => () => {
    setActiveStep(step);
  };
  const isStepSkipped = step => {
    return skipped.has(step);
  };
  function isStepComplete(step) {
    return completed.has(step);
  }
  return (
    <Wrapper>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <div className={classes.root}>
              <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const buttonProps = {};
                  if (isStepOptional(index)) {
                    buttonProps.optional = (
                      <Typography variant="caption">Optional</Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepButton
                        onClick={handleStep(index)}
                        completed={isStepComplete(index)}
                        {...buttonProps}
                      >
                        {label}
                      </StepButton>
                    </Step>
                  );
                })}
              </Stepper>
              <div>
                <div className={classes.instructions}>
                  {getStepContent(activeStep)}
                </div>
                <div>
                  <Sep />
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Bước trước đó
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Bước kế tiếp
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Wrapper>
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
