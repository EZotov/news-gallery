import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsGallery } from './newsgallery/newsgallery.component';
import { NewsGalleryService } from './newsgallery/newsgallery.service';
import { NewItem } from './newItem/newItem.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NewsGallery,
    NewItem
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [NewsGalleryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
