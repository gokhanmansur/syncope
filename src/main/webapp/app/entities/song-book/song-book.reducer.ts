import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISongBook, defaultValue } from 'app/shared/model/song-book.model';

export const ACTION_TYPES = {
  FETCH_SONGBOOK_LIST: 'songBook/FETCH_SONGBOOK_LIST',
  FETCH_SONGBOOK: 'songBook/FETCH_SONGBOOK',
  CREATE_SONGBOOK: 'songBook/CREATE_SONGBOOK',
  UPDATE_SONGBOOK: 'songBook/UPDATE_SONGBOOK',
  DELETE_SONGBOOK: 'songBook/DELETE_SONGBOOK',
  RESET: 'songBook/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISongBook>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type SongBookState = Readonly<typeof initialState>;

// Reducer

export default (state: SongBookState = initialState, action): SongBookState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SONGBOOK_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SONGBOOK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SONGBOOK):
    case REQUEST(ACTION_TYPES.UPDATE_SONGBOOK):
    case REQUEST(ACTION_TYPES.DELETE_SONGBOOK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SONGBOOK_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SONGBOOK):
    case FAILURE(ACTION_TYPES.CREATE_SONGBOOK):
    case FAILURE(ACTION_TYPES.UPDATE_SONGBOOK):
    case FAILURE(ACTION_TYPES.DELETE_SONGBOOK):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SONGBOOK_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SONGBOOK):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SONGBOOK):
    case SUCCESS(ACTION_TYPES.UPDATE_SONGBOOK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SONGBOOK):
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

const apiUrl = 'api/song-books';

// Actions

export const getEntities: ICrudGetAllAction<ISongBook> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SONGBOOK_LIST,
  payload: axios.get<ISongBook>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ISongBook> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SONGBOOK,
    payload: axios.get<ISongBook>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISongBook> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SONGBOOK,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISongBook> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SONGBOOK,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISongBook> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SONGBOOK,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
