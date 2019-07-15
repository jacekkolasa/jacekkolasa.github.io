import React, { FC } from 'react';
import { get } from 'lodash/fp';

import {
  Formik, Field, FieldArray, FieldProps,
} from 'formik';
import DatePicker from 'react-datepicker';
import { Button, Form, Table } from 'react-bootstrap';

import FormikObserver from 'utils/FormikObserver';

const styles = require('./PointsForm.css');

type Points = { value: number; measurementDate: Date }[]
interface Props {
  points: Points;
  onChange: (Points: Points) => void;
}
const PointsForm: FC<Props> = ({
  points,
  onChange,
}: Props) => (
  <div>
    <Formik
      initialValues={{ points }}
      enableReinitialize
      onSubmit={() => null} // just for ts
      render={({ values }) => (
        <>
          <FormikObserver
            value={values.points}
            onChange={(value: Points) => {
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
                              render={({ field }: FieldProps) => (
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
                              render={({ field, form }: FieldProps) => (
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
