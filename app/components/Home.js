import 'date-fns';
import React, { Component } from 'react';
import styled from 'styled-components';
import { homedir } from 'os';
import PizZip from 'pizzip';
import fs from 'fs';
import path from 'path';
import Docxtemplater from 'docxtemplater';
import { Formik, Form, FieldArray } from 'formik';
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Input
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import * as expressions from 'angular-expressions';
import { merge } from 'lodash';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { assocPath, compose, map, prop, assoc } from 'ramda';
import moment from 'moment';

import Person from '../classes/Person';
import LandType from '../classes/LandType';
import MyInput from './MyInput';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

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

export default class Home extends Component<Props> {
  props: Props;

  generate = (file, data) => {
    const content = fs.readFileSync(
      path.resolve(__dirname, `assets/${file}`),
      'binary'
    );
    const zip = new PizZip(content);

    const doc = new Docxtemplater();
    doc.loadZip(zip).setOptions({ parser: angularParser });

    doc.setData(data);

    try {
      // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
      doc.render();
    } catch (error) {
      const e = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        properties: error.properties
      };
      console.log(JSON.stringify({ error: e }));
      // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
      throw error;
    }

    const buf = doc.getZip().generate({ type: 'nodebuffer' });

    // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
    fs.writeFileSync(`${data.output}/${file}`, buf);
  };

  render() {
    return (
      <Wrapper>
        <Formik
          initialValues={{
            sideA: {
              people: [new Person()]
            },
            sideB: {
              people: [new Person()]
            },
            year: new Date().getFullYear(),
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
                types: [new LandType()]
              },
              price: {
                number: 0,
                text: ''
              },
              authenticateLocation: '',
              output: null
            }
          }}
          onSubmit={values => {
            const sideBNames = values.sideA.people
              .map(
                p =>
                  `${p.fullName}, sinh năm ${p.yearOfBirth}, CMND số: ${p.id} cấp ngày: ${p.idDate} tại ${p.idLocation}`
              )
              .join(' và ');

            const data = compose(
              assocPath(
                ['changes', 'gcn', 'approveDate'],
                moment(values.changes.gcn.approveDate).format('DD/MM/YYYY')
              ),
              assocPath(['sideB', 'names'], sideBNames),
              assocPath(['output'], values.output.path || desktop),
              map(assoc('id', prop('identifier')))
            )(values);

            files.forEach(file => this.generate(file, data));
          }}
        >
          {({ values: { sideA, sideB, changes, contract }, setFieldValue }) => (
            <Form>
              {/* <Step1 /> */}
              {/* <Step2 /> */}
              {/* <Step3 /> */}

              <Sep />
              <Misc>
                <MyInput
                  label="Năm làm hồ sơ"
                  type="number"
                  name="year"
                  as={TextField}
                />

                <Output>
                  <label htmlFor="output">Thư mục xuất</label>
                  <input
                    onChange={e => {
                      setFieldValue('output', e.target.files[0]);
                    }}
                    id="output"
                    type="file"
                    webkitdirectory="true"
                    directory="true"
                  />
                </Output>
              </Misc>

              <Sep />
              <Button variant="contained" color="primary" type="submit">
                Generate
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    );
  }
}

const Output = styled.div`
  grid-column-end: 2;

  label {
    margin-right: 20px;
  }
`;

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
