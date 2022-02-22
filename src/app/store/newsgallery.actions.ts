import { createAction, props } from '@ngrx/store';
import { New } from '../enteties/new';

export const loadNews = createAction(
  '[News Gallery] Load News',
  props<{news : New[]}>()
);
