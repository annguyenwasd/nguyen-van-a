import { homedir } from 'os';
import PizZip from 'pizzip';
import fs from 'fs';
import path from 'path';
import Docxtemplater from 'docxtemplater';
import * as expressions from 'angular-expressions';
import { merge } from 'lodash';

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

export const generate = data => {
  fs.readdir(data.input.path, (err, files) => {
    if (err) {
      alert(JSON.stringify(err, null, 2));
      return;
    }
    const docFiles = files.filter(f => f.endsWith('doc') || f.endsWith('docx'));

    docFiles.forEach(doc => generateFile(doc, data));

    alert('Xong ròi đó!!! 😘');
  });
};

const generateFile = (file, data) => {
  try {
    console.log(`${data.input.path}/${file}`);
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
    fs.writeFileSync(
      `${(data.output && data.output.path) || desktop}/${file}`,
      buf
    );
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
