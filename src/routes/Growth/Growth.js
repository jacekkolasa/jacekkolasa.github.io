// @flow
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Chart from 'components/Chart';
import { useSettings } from 'routes/Settings/SettingsContext';

const Growth = () => {
  const [{ birthDate, points }] = useSettings();
  const isNecessaryDataEntered = !!birthDate && !!points.length;

  return (
    <div>
      {!isNecessaryDataEntered && (
        <div>
          <Button variant="link">
            <Link to="/settings">
              Add necessary data to get started.
            </Link>
          </Button>
        </div>
      )}
      <Chart
        points={points}
        birthDate={birthDate}
      />
    </div>
  );
};

export default Growth;
