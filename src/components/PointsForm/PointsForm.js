// @flow
import React from 'react';
import { get } from 'lodash/fp';

import { Formik, Field, FieldArray } from 'formik';
import DatePicker from 'react-datepicker';
import { Button, Form, Table } from 'react-bootstrap';

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
      enableReinitialize
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
              <>
                {!!get('points.length', values) && (
                  <Table striped bordered hover size="sm" className={styles.table}>
                    <thead>
                      <tr>
                        <th className={styles.weightCol}>Weight</th>
                        <th className={styles.measurementCol}>Measurement Date</th>
                        <th className={styles.buttonCol} />
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
                          <td>
                            <div>
                              <Button
                                variant="danger"
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                }}
                              >
                              -
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                    </tbody>
                  </Table>
                )}
                <Button
                  variant="primary"
                  onClick={() => {
                    arrayHelpers.push({
                      value: 0,
                      measurementDate: new Date(),
                    });
                  }}
                >
                  Add measurement point
                </Button>
              </>
            )}
          />
        </>
      )}
    />
  </div>
);

export default PointsForm;
