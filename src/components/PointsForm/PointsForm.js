// @flow
import React from 'react';

import { Formik, Field, FieldArray } from 'formik';
import DatePicker from 'react-datepicker';
import { Form, Table } from 'react-bootstrap';

import FormikObserver from 'utils/FormikObserver';

import styles from './PointsForm.css';

type Props = {|

|}
const PointsForm = ({

}: Props) => {
  const points = [
    {
      value: 4000,
      measurementDate: new Date('2019-01-01T08:00:00'),
    }, {
      value: 5000,
      measurementDate: new Date('2019-01-10T08:00:00'),
    }];
  return (
    <div>
      <Formik
        initialValues={{ points }}
        render={({ values }) => (
          <>
            <FormikObserver value={values} onChange={value => console.log({ value })} />
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
};

export default PointsForm;
