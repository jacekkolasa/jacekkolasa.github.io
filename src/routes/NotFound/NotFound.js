// @flow
import React, { useEffect, useState } from 'react';

const NotFound = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  // hack from
  // https://github.com/nozzle/react-static/blob/master/docs/guides/dynamic-routes-react-router.md
  return ready ? (
    <div>
      <h1>404 - Oh no's! We couldn't find that page :(</h1>
    </div>
  ) : null;
};

export default NotFound;
