import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ISongBook } from 'app/shared/model/song-book.model';
import { getEntities as getSongBooks } from 'app/entities/song-book/song-book.reducer';
import { getEntity, updateEntity, createEntity, reset } from './song.reducer';
import { ISong } from 'app/shared/model/song.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISongUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SongUpdate = (props: ISongUpdateProps) => {
  const [songBookId, setSongBookId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { songEntity, songBooks, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/song' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getSongBooks();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...songEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="syncopeApp.song.home.createOrEditLabel">
            <Translate contentKey="syncopeApp.song.home.createOrEditLabel">Create or edit a Song</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : songEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="song-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="song-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="song-name">
                  <Translate contentKey="syncopeApp.song.name">Name</Translate>
                </Label>
                <AvField
                  id="song-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lyricsLabel" for="song-lyrics">
                  <Translate contentKey="syncopeApp.song.lyrics">Lyrics</Translate>
                </Label>
                <AvField id="song-lyrics" type="text" name="lyrics" />
              </AvGroup>
              <AvGroup>
                <Label for="song-songBook">
                  <Translate contentKey="syncopeApp.song.songBook">Song Book</Translate>
                </Label>
                <AvInput id="song-songBook" type="select" className="form-control" name="songBook.id">
                  <option value="" key="0" />
                  {songBooks
                    ? songBooks.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/song" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  songBooks: storeState.songBook.entities,
  songEntity: storeState.song.entity,
  loading: storeState.song.loading,
  updating: storeState.song.updating,
  updateSuccess: storeState.song.updateSuccess
});

const mapDispatchToProps = {
  getSongBooks,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SongUpdate);
