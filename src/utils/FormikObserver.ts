import { useEffect } from 'react';

interface Props<T> {
  onChange: (value: T) => void;
  value: T;
}

// eslint-disable-next-line arrow-parens
const FormikObserver = <T = {}, >(props: Props<T>): null => {
  const { value } = props;
  useEffect(() => {
    props.onChange(props.value);
  }, [JSON.stringify(value)]);
  return null;
};

FormikObserver.defaultProps = {
  onChange: () => null,
};

export default FormikObserver;
