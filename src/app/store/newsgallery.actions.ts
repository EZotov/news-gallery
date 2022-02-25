import { createAction, props } from '@ngrx/store';
import { New } from '../enteties/new';

export const loadNews = createAction(
  '[News Gallery] Load News',
);

export const loadSuccess = createAction(
  '[NewsGallery] Success Load',
  props<{news : New[]}>()
);
