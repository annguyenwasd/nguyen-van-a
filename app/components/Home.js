import 'date-fns';
import React, { Component } from 'react';
import styled from 'styled-components';
import { homedir } from 'os';
import PizZip from 'pizzip';
import fs from 'fs';
import path from 'path';
import Docxtemplater from 'docxtemplater';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  Input
} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import * as expressions from 'angular-expressions';
import { merge } from 'lodash';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { assocPath, compose } from 'ramda';
import moment from 'moment';

import routes from '../constants/routes';
import Person from './Person';
import LandType from './LandType';

const files = [
  'don_dang_ky_bien_dong.docx',
  'hdcn.docx',
  'thue_tncn_moi.docx',
  'tptb.docx'
];

const honorifics = ['Ông', 'Bà'];
const desktop = path.resolve(homedir(), `Desktop`);

function angularParser(tag) {
  if (tag === '.') {
    return {
      get: function(s) {
        return s;
      }
    };
  }
  const expr = expressions.compile(tag.replace(/(’|“|”|‘)/g, "'"));
  return {
    get: function(scope, context) {
      let obj = {};
      const scopeList = context.scopeList;
      const num = context.num;
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
              assocPath(['output'], values.output.path || desktop)
            )(values);

            files.forEach(file => this.generate(file, data));
          }}
        >
          {({ values: { sideA, sideB, changes, contract }, setFieldValue }) => (
            <Form>
              <FieldArray
                name="sideA.people"
                render={arrayHelpers => {
                  return (
                    <People>
                      <h2>
                        Bên A &nbsp;
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => arrayHelpers.push(new Person())}
                        >
                          Thêm bên A
                        </Button>
                      </h2>

                      {sideA.people.map((person, idx) => {
                        const nthPerson = `sideA.people.${idx}`;
                        return (
                          <PersonDiv key={`${idx}${person.id}${person.name}`}>
                            <Field
                              name={`${nthPerson}.honorific`}
                              as={TextField}
                              select
                              label="Ông/Bà"
                              id="honorific-selector"
                            >
                              {honorifics.map(h => (
                                <MenuItem value={h} key={h}>
                                  {h}
                                </MenuItem>
                              ))}
                            </Field>
                            <Field
                              label="Họ và tên"
                              name={`${nthPerson}.fullName`}
                              as={TextField}
                              style={{ gridColumnEnd: 'span 3' }}
                            />
                            <Field
                              label="Sinh năm"
                              type="number"
                              name={`${nthPerson}.yearOfBirth`}
                              as={TextField}
                            />
                            <Field
                              type="text"
                              label="CMND số"
                              name={`${nthPerson}.id`}
                              as={TextField}
                              style={{ gridRow: 2, gridColumn: '1/3' }}
                            />
                            <Field
                              label="Cấp ngày"
                              name={`${nthPerson}.idDate`}
                              as={TextField}
                              style={{ gridRow: 2 }}
                            />
                            <Field
                              label="Cấp tại"
                              name={`${nthPerson}.idLocation`}
                              as={TextField}
                              style={{ gridRow: 2, gridColumnEnd: 'span 2' }}
                            />
                            <Field
                              label="Địa chỉ"
                              name={`${nthPerson}.address`}
                              as={TextField}
                              style={{ gridRow: 3, gridColumn: '1/6' }}
                            />

                            <IconButton
                              aria-label="delete"
                              disabled={sideA.people.length < 2}
                              onClick={() => arrayHelpers.remove(idx)}
                              style={{ justifySelf: 'start' }}
                            >
                              <DeleteIcon fontSize="large" />
                            </IconButton>
                          </PersonDiv>
                        );
                      })}
                    </People>
                  );
                }}
              />

              <Sep />

              <FieldArray
                name="sideB.people"
                render={arrayHelpers => {
                  return (
                    <People>
                      <h2>
                        Bên B &nbsp;
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => arrayHelpers.push(new Person())}
                        >
                          Thêm bên B
                        </Button>
                      </h2>

                      {sideB.people.map((person, idx) => {
                        const nthPerson = `sideB.people.${idx}`;
                        return (
                          <PersonDiv key={`${idx}${person.id}${person.name}`}>
                            <Field
                              name={`${nthPerson}.honorific`}
                              as={TextField}
                              select
                              label="Ông/Bà"
                              id="honorific-selector"
                            >
                              {honorifics.map(h => (
                                <MenuItem value={h} key={h}>
                                  {h}
                                </MenuItem>
                              ))}
                            </Field>
                            <Field
                              label="Họ và tên"
                              name={`${nthPerson}.fullName`}
                              as={TextField}
                              style={{ gridColumnEnd: 'span 3' }}
                            />
                            <Field
                              label="Sinh năm"
                              type="number"
                              name={`${nthPerson}.yearOfBirth`}
                              as={TextField}
                            />
                            <Field
                              label="CMND số"
                              name={`${nthPerson}.id`}
                              as={TextField}
                              style={{ gridRow: 2, gridColumn: '1/3' }}
                            />
                            <Field
                              label="Cấp ngày"
                              name={`${nthPerson}.idDate`}
                              as={TextField}
                              style={{ gridRow: 2 }}
                            />
                            <Field
                              label="Cấp tại"
                              name={`${nthPerson}.idLocation`}
                              as={TextField}
                              style={{ gridRow: 2, gridColumnEnd: 'span 2' }}
                            />
                            <Field
                              label="Địa chỉ"
                              name={`${nthPerson}.address`}
                              as={TextField}
                              style={{ gridRow: 3, gridColumn: '1/6' }}
                            />
                            <IconButton
                              aria-label="delete"
                              disabled={sideB.people.length < 2}
                              onClick={() => arrayHelpers.remove(idx)}
                              style={{ justifySelf: 'start' }}
                            >
                              <DeleteIcon fontSize="large" />
                            </IconButton>
                          </PersonDiv>
                        );
                      })}
                    </People>
                  );
                }}
              />

              <Sep />
              <h2>Thông tin đăng kí biến động</h2>
              <h3>GCN</h3>

              <GCN>
                <Field
                  label="Số vào sổ cấp GCN"
                  name="changes.gcn.number"
                  as={TextField}
                />
                <Field
                  label="Số phát hành GCN"
                  name="changes.gcn.publish"
                  as={TextField}
                />

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    id="date-picker-inline"
                    label="Ngày cấp GCN"
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    value={changes.gcn.approveDate}
                    onChange={date => {
                      setFieldValue('changes.gcn.approveDate', date);
                    }}
                  />
                </MuiPickersUtilsProvider>
                <Field
                  style={{
                    gridColumnEnd: 'span 3'
                  }}
                  label="Nơi cấp"
                  name="changes.gcn.location"
                  as={TextField}
                />
              </GCN>

              <Sep />
              <h3>Thông tin đất</h3>

              <Land>
                <h4>Trước biến động</h4>
                <h4>Sau biến động</h4>

                <Field
                  label="Thửa đất số"
                  type="number"
                  name="changes.before.number"
                  as={TextField}
                />
                <Field
                  label="Thửa đất số"
                  type="number"
                  name="changes.after.number"
                  as={TextField}
                />

                <Field
                  label="Tờ bản đồ số"
                  type="number"
                  name="changes.before.mapNumber"
                  as={TextField}
                />
                <Field
                  label="Tờ bản đồ số"
                  type="number"
                  name="changes.after.mapNumber"
                  as={TextField}
                />

                <Field
                  label="Mục đích sử dụng (kí hiệu)"
                  type="text"
                  name="changes.before.purpose"
                  as={TextField}
                />
                <Field
                  label="Mục đích sử dụng (kí hiệu)"
                  type="text"
                  name="changes.after.purpose"
                  as={TextField}
                />

                <Field
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
                  as={TextField}
                />
                <Field
                  label="Diện tích"
                  type="number"
                  name="changes.after.square"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <span>
                          m<sup>2</sup>
                        </span>
                      </InputAdornment>
                    )
                  }}
                  as={TextField}
                />

                <Field
                  label="Lý do biến động"
                  type="text"
                  name="changes.reason"
                  style={{
                    gridColumnEnd: 'span 2'
                  }}
                  as={TextField}
                />
              </Land>

              <Sep />
              <h3>Thông tin chuyển nhượng</h3>
              <Transfer>
                <Field
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
                  as={TextField}
                />

                <Field
                  label="Diện tích bằng chữ"
                  type="text"
                  name="contract.land.squareText"
                  as={TextField}
                />
                <Field
                  label="Địa chỉ đất"
                  style={{
                    gridColumnEnd: 'span 2'
                  }}
                  type="text"
                  name="contract.land.address"
                  as={TextField}
                />
                <Field
                  style={{
                    gridColumnEnd: 'span 2'
                  }}
                  label="Mục đích sử dụng (bằng chữ)"
                  type="text"
                  name="contract.land.purposeText"
                  as={TextField}
                />

                <Field
                  label="Thời hạn sử dụng"
                  type="text"
                  name="contract.land.duration"
                  as={TextField}
                />
                <Field
                  label="Nguồn gốc sử dụng"
                  type="text"
                  name="contract.land.source"
                  as={TextField}
                />
                <Field
                  style={{
                    gridColumnEnd: 'span 2'
                  }}
                  label="Những hạn chế về quyền sử dụng đất"
                  type="text"
                  name="contract.land.limitation"
                  as={TextField}
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
                            <LandTypeDiv
                              key={`${idx}${type.name}${type.square}`}
                            >
                              <Field
                                label="Tên loại đất"
                                name={`${nthType}.name`}
                                as={TextField}
                              />
                              <Field
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
                                as={TextField}
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

                <Field
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
                  as={TextField}
                />
                <Field
                  label="Giá (bằng chữ)"
                  type="text"
                  name="contract.price.text"
                  as={TextField}
                />

                <Field
                  style={{
                    gridColumnEnd: 'span 2'
                  }}
                  label="Nơi chứng thực"
                  type="text"
                  name="contract.land.authenticateLocation"
                  as={TextField}
                />
              </Transfer>

              <Sep />
              <Misc>
                <Field
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

const PersonDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 100px);
  grid-gap: 30px;
  margin-bottom: 30px;
`;

const People = styled.div``;

const Side = styled.div``;

const Wrapper = styled.main`
  padding: 30px 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;
