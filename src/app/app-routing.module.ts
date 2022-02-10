import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsGallery } from './newsgallery/newsgallery.component';
import { NewItem } from './newItem/newItem.component';



const routes: Routes = [
  {path : '', component : NewsGallery,
    children : [
      {path : 'new/:id', component : NewItem}
    ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
