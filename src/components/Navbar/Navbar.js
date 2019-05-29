// @flow
import React from 'react';
import { Link, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const Navbar = () => {
  return (
    <div>
      <AppBar position="static">
        <Route
          path="/"
          render={({ location }) => (
            <>
              <Tabs value={location.pathname}>
                <Tab label="Growth Charts" component={Link} to="/growth-charts" value="/growth-charts" />
                <Tab label="Settings" component={Link} to="/settings" value="/settings" />
              </Tabs>
            </>
          )}
        />
        <Toolbar>
          <Typography variant="title" color="inherit">
            Parental Toolse
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default Navbar;
