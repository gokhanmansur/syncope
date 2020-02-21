import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Song from './song';
import SongDetail from './song-detail';
import SongUpdate from './song-update';
import SongDeleteDialog from './song-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SongDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SongUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SongUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SongDetail} />
      <ErrorBoundaryRoute path={match.url} component={Song} />
    </Switch>
  </>
);

export default Routes;
