import { createReducer, on } from '@ngrx/store';
import { loadNews } from './newsgallery.actions';
import { New } from '../enteties/new';

export interface newsGalleryState {
  news : New[]
}

export interface State {
  newsGallery : newsGalleryState
}

const initialState : newsGalleryState = {
  news : []
};


export const newsGalleryReducer = createReducer(
  initialState,
  on(loadNews, (state, action) => {
    return {
      news : [...state.news, ...action.news]
    };
  })
);
