import React from 'react';

function Side({ sideName }) {
  return (
    <Scope scope={`side${sideName}`}>
      <ArrayField field="people">
        {({ add, fields }) => (
          <>
            <h2>Side {sideName}</h2>
            <button onClick={add}>add</button>

            {fields.map(({ field, key, remove, initialValue }) => (
              <PersonDiv key={key}>
                <Input
                  field={`${field}.honorific`}
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
                </Input>
                <Input
                  label="Họ và tên"
                  field={`${field}.fullName`}
                  initialValue={initialValue.fullName}
                  style={{ gridColumnEnd: 'span 3' }}
                />
                {/* <Input
                  label="Sinh năm"
                  type="number"
                  field={`${field}.yearOfBirth`}
                />
                <Input
                  label="CMND số"
                  field={`${field}.identifier`}
                  style={{ gridRow: 2, gridColumn: '1/2' }}
                />
                <Input
                  label="Cấp tại"
                  field={`${field}.idLocation`}
                  style={{ gridRow: 2, gridColumnEnd: 'span 2' }}
                />
                <Input
                  label="Địa chỉ"
                  field={`${field}.address`}
                  style={{ gridRow: 3, gridColumn: '1/6' }}
                /> */}

                <IconButton
                  aria-label="delete"
                  onClick={() => arrayHelpers.remove(idx)}
                  style={{ justifySelf: 'start' }}
                >
                  <DeleteIcon fontSize="large" />
                </IconButton>
              </PersonDiv>
            ))}
          </>
        )}
      </ArrayField>
    </Scope>
  );
}

export default Side;
