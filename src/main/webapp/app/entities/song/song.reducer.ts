import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISong, defaultValue } from 'app/shared/model/song.model';

export const ACTION_TYPES = {
  FETCH_SONG_LIST: 'song/FETCH_SONG_LIST',
  FETCH_SONG: 'song/FETCH_SONG',
  CREATE_SONG: 'song/CREATE_SONG',
  UPDATE_SONG: 'song/UPDATE_SONG',
  DELETE_SONG: 'song/DELETE_SONG',
  RESET: 'song/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISong>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type SongState = Readonly<typeof initialState>;

// Reducer

export default (state: SongState = initialState, action): SongState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SONG_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SONG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SONG):
    case REQUEST(ACTION_TYPES.UPDATE_SONG):
    case REQUEST(ACTION_TYPES.DELETE_SONG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SONG_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SONG):
    case FAILURE(ACTION_TYPES.CREATE_SONG):
    case FAILURE(ACTION_TYPES.UPDATE_SONG):
    case FAILURE(ACTION_TYPES.DELETE_SONG):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SONG_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_SONG):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SONG):
    case SUCCESS(ACTION_TYPES.UPDATE_SONG):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SONG):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/songs';

// Actions

export const getEntities: ICrudGetAllAction<ISong> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SONG_LIST,
    payload: axios.get<ISong>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ISong> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SONG,
    payload: axios.get<ISong>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISong> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SONG,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISong> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SONG,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISong> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SONG,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
