import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { NewsGalleryService } from '../newsgallery/newsgallery.service';
import { loadNews, loadSuccess } from './newsgallery.actions';
import { mergeMap, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';



@Injectable()
export class NewsGalleryEffects {
  constructor(
    private actions$ : Actions,
    private galleryService : NewsGalleryService
  ) { }

  LoadNews$ : Observable<Action> = createEffect(() => this.actions$.pipe(
      ofType(loadNews),
      mergeMap(action =>
        this.galleryService.loadData()
          .pipe(
            map(news => loadSuccess({news : news}))
          )
        )
      )
    )
}
