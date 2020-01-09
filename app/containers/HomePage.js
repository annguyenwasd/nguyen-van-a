import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Home from '../components/Home';
import fs from 'fs';

const selections = {
  NEW_FILE: 0,
  IMPORT_FILE: 1
};

export default function HomePage() {
  const [selection, setSelection] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const [file, setFile] = useState(null);
  const input = useRef(null);

  useEffect(() => {
    if (filePath) {
      fs.readFile(
        filePath,
        {
          encoding: 'utf-8'
        },
        (err, data) => {
          if (err) alert(JSON.stringify(err, null, 2));
          const dataObj = JSON.parse(data);
          setFile({ ...dataObj, input: null, output: null });
        }
      );
    }
  }, [filePath]);

  if (selection === selections.NEW_FILE)
    return (
      <>
        <button type="button" onClick={() => setSelection(null)}>
          Back
        </button>
        <Home />
      </>
    );

  if (selection === selections.IMPORT_FILE && file)
    return (
      <>
        <button type="button" onClick={() => setSelection(null)}>
          Back
        </button>
        <Home jsonFile={file} />;
      </>
    );

  return (
    <Wrapper>
      <h1>Chào mừng đến phần mềm xuất file word</h1>
      <button
        type="button"
        onClick={() => {
          input.current.click();
          setSelection(selections.IMPORT_FILE);
        }}
      >
        Chọn file data cũ và chỉnh sửa (file có đuôi là json)
      </button>
      <button type="button" onClick={() => setSelection(selections.NEW_FILE)}>
        Tạo file word mới
      </button>
      <input
        ref={input}
        onChange={e => setFilePath(e.target.files[0].path)}
        id="output"
        type="file"
        accept="application/json"
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  button {
    display: block;
    padding: 10px;
    border-radius: 4px;
    background-color: chocolate;
    color: white;
    border: none;
    font-size: 18px;
    margin: 20px;
  }

  input {
    visibility: hidden;
  }
`;
