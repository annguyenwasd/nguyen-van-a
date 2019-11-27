import React from 'react';
import styled from 'styled-components';
import { homedir } from 'os';
import PizZip from 'pizzip';
import fs from 'fs';
import path from 'path';
import Docxtemplater from 'docxtemplater';
import { Formik, Form } from 'formik';
import {
  Button,
  Step,
  Stepper,
  StepButton,
  Typography
} from '@material-ui/core';
import * as expressions from 'angular-expressions';
import { merge } from 'lodash';
import { assocPath, compose, map, prop, assoc } from 'ramda';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Person from '../classes/Person';
import InputSideB from './InputSideB';
import InputSideA from './InputSideA';
import InputChanges from './InputChanges';
import InputContractInfo from './InputContractInfo';
import InputMisc from './InputMisc';

const files = [
  'don_dang_ky_bien_dong.docx',
  'hdcn.docx',
  'thue_tncn_moi.docx',
  'tptb.docx'
];

const desktop = path.resolve(homedir(), `Desktop`);

function angularParser(tag) {
  if (tag === '.') {
    return {
      get(s) {
        return s;
      }
    };
  }
  const expr = expressions.compile(tag.replace(/(’|“|”|‘)/g, "'"));
  return {
    get(scope, context) {
      let obj = {};
      const { scopeList } = context;
      const { num } = context;
      for (let i = 0, len = num + 1; i < len; i++) {
        obj = merge(obj, scopeList[i]);
      }
      return expr(scope, obj);
    }
  };
}

const generate = (file, data) => {
  try {
    console.log(data);
    const content = fs.readFileSync(
      path.resolve(`${data.input.path}/${file}`),
      'binary'
    );
    const zip = new PizZip(content);

    const doc = new Docxtemplater();
    doc.loadZip(zip).setOptions({ parser: angularParser });

    doc.setData(data);

    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render();

    const buf = doc.getZip().generate({ type: 'nodebuffer' });
    // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
    fs.writeFileSync(`${data.output}/${file}`, buf);
  } catch (error) {
    const e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties
    };
    alert(JSON.stringify(e, null, 2));
    throw error;
  }
};

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

const handleSubmit = values => {
  const data = compose(
    assocPath(
      ['changes', 'gcn', 'approveDate'],
      moment(values.changes.gcn.approveDate).format('DD/MM/YYYY')
    ),
    assocPath(['output'], values.output.path || desktop),
    map(assoc('id', prop('identifier')))
  )(values);

  data.sideA.people = values.sideA.people.map(p => ({
    ...p,
    idDate: moment(p.idDate).format('DD/MM/YYYY')
  }));

  data.sideB.people = values.sideB.people.map(p => ({
    ...p,
    idDate: moment(p.idDate).format('DD/MM/YYYY')
  }));

  data.year = moment(data.year).format('YYYY');

  const sideANames = data.sideA.people
    .map(
      p =>
        `${p.fullName}, sinh năm ${p.yearOfBirth}, CMND số: ${p.id} cấp ngày: ${p.idDate} tại ${p.idLocation}`
    )
    .join(' và ');

  data.sideA.names = sideANames;

  files.forEach(file => generate(file, data));

  alert('Xong ròi đó!!! 😘');
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
    'Nhập thông tin biến động',
    'Nhập thông tin hợp đồng',
    'Nhập thông tin phụ'
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <InputSideA />;
    case 1:
      return <InputSideB />;
    case 2:
      return <InputChanges />;
    case 3:
      return <InputContractInfo />;
    case 4:
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
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
          // find the first step that has been completed
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
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>
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
