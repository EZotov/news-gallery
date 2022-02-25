import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsGallery } from './newsgallery/newsgallery.component';
import { NewsGalleryService } from './newsgallery/newsgallery.service';
import { NewItem } from './newItem/newItem.component';
import { CommentsList } from './comments/comments.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { newsGalleryReducer } from './store/newsgallery.reducers';
import { NewsGalleryEffects } from './store/newsgallery.effects';

@NgModule({
  declarations: [
    AppComponent,
    NewsGallery,
    NewItem,
    CommentsList
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({newsGallery : newsGalleryReducer}),
    EffectsModule.forRoot([NewsGalleryEffects])
  ],
  providers: [NewsGalleryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
