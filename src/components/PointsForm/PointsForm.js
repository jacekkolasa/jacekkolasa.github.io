// @flow
import React from 'react';

import { Formik, Field, FieldArray } from 'formik';
import DatePicker from 'react-datepicker';
import { Form, Table } from 'react-bootstrap';

import FormikObserver from 'utils/FormikObserver';

import styles from './PointsForm.css';

type Points = Array<{| value: number, measurementDate: Date |}>
type Props = {|
  points: Points,
  onChange: (Points) => void,
|}
const PointsForm = ({
  points,
  onChange,
}: Props) => (
  <div>
    <Formik
      initialValues={{ points }}
      render={({ values }) => (
        <>
          <FormikObserver
            value={values.points}
            onChange={(value) => {
              if (value) { // prevent firing when the points are undefined on init
                onChange(value);
              }
            }}
          />
          <FieldArray
            name="points"
            render={arrayHelpers => (
              <Table striped bordered hover size="sm" className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.weightCol}>Weight</th>
                    <th className={styles.measurementCol}>Measurement Date</th>
                  </tr>
                </thead>
                <tbody>
                  {values.points && values.points.length > 0
                    && values.points.map((_, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <tr key={index}>
                        <td>
                          <Field
                            name={`points.${index}.value`}
                            render={({ field }) => (
                              <Form.Control
                                name={`points.${index}.value`}
                                {...field}
                                max="99999"
                                min="1"
                                type="number"
                              />
                            )}
                          />
                        </td>
                        <td>
                          <Field
                            name={`points.${index}.measurementDate`}
                            render={({ field, form }) => (
                              <DatePicker
                                selected={field.value}
                                onChange={(newDate) => {
                                  form.setFieldValue(`points.${index}.measurementDate`, newDate);
                                }}
                                maxDate={new Date()}
                                showYearDropdown
                                className={styles.datePicker}
                                customInput={<Form.Control />}
                              />
                            )}
                          />
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            )}
          />
        </>
      )}
    />
  </div>
);

export default PointsForm;
