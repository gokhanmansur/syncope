import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './song-book.reducer';
import { ISongBook } from 'app/shared/model/song-book.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISongBookDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SongBookDetail = (props: ISongBookDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { songBookEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="syncopeApp.songBook.detail.title">SongBook</Translate> [<b>{songBookEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="syncopeApp.songBook.name">Name</Translate>
            </span>
          </dt>
          <dd>{songBookEntity.name}</dd>
        </dl>
        <Button tag={Link} to="/song-book" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/song-book/${songBookEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ songBook }: IRootState) => ({
  songBookEntity: songBook.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SongBookDetail);
