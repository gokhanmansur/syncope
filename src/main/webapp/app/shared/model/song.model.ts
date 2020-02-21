import { ISongBook } from 'app/shared/model/song-book.model';

export interface ISong {
  id?: string;
  name?: string;
  lyrics?: string;
  songBook?: ISongBook;
}

export const defaultValue: Readonly<ISong> = {};
