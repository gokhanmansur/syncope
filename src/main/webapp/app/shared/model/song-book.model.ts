import { ISong } from 'app/shared/model/song.model';

export interface ISongBook {
  id?: string;
  name?: string;
  songs?: ISong[];
}

export const defaultValue: Readonly<ISongBook> = {};
