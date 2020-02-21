import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './song.reducer';
import { ISong } from 'app/shared/model/song.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISongDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SongDetail = (props: ISongDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { songEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="syncopeApp.song.detail.title">Song</Translate> [<b>{songEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="syncopeApp.song.name">Name</Translate>
            </span>
          </dt>
          <dd>{songEntity.name}</dd>
          <dt>
            <span id="lyrics">
              <Translate contentKey="syncopeApp.song.lyrics">Lyrics</Translate>
            </span>
          </dt>
          <dd>{songEntity.lyrics}</dd>
          <dt>
            <Translate contentKey="syncopeApp.song.songBook">Song Book</Translate>
          </dt>
          <dd>{songEntity.songBook ? songEntity.songBook.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/song" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/song/${songEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ song }: IRootState) => ({
  songEntity: song.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SongDetail);
