import { createSelector, createFeatureSelector} from '@ngrx/store';
import { newsGalleryState } from './newsgallery.reducers';

const featureSelector = createFeatureSelector<newsGalleryState>('newsGallery');

export const newsSelector = createSelector(
  featureSelector,
  (state) => state.news
);
