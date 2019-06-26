// @flow
import { useEffect } from 'react';

interface Props<T> {
  onChange: (value: T) => void,
  value: T
}

// eslint-disable-next-line arrow-parens
const FormikObserver = <T: {}>(props: Props<T>) => {
  const { value } = props;
  useEffect(() => {
    props.onChange(props.value);
  }, [Object.values(value).join(', ')]);
  return null;
};

FormikObserver.defaultProps = {
  onChange: () => null,
};

export default FormikObserver;
