import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SongBook from './song-book';
import SongBookDetail from './song-book-detail';
import SongBookUpdate from './song-book-update';
import SongBookDeleteDialog from './song-book-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SongBookDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SongBookUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SongBookUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SongBookDetail} />
      <ErrorBoundaryRoute path={match.url} component={SongBook} />
    </Switch>
  </>
);

export default Routes;
