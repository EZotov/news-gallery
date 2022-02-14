import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { NewsGalleryService } from '../newsgallery/newsgallery.service';


@Component(
  {
    selector : 'new-item',
    templateUrl : './newItem.component.html',
    styleUrls : ['./newItem.component.scss']
  }
)
export class NewItem implements OnInit, OnDestroy, DoCheck{
  id : number = 0;
  currentNew : any;

  constructor(
    private activateRoute : ActivatedRoute,
    private galleryData : NewsGalleryService
  ) { }

  ngOnInit() : void {
    this.id = Number(this.activateRoute.snapshot.params['id']);
    //Disable Scroll
    const bodyElem : any = document.querySelector('BODY');
    let pagePosition = window.scrollY;
    bodyElem.classList.add('disable-scroll');
    bodyElem.dataset.position = pagePosition;
    bodyElem.style.top = -pagePosition + 'px';
  }

  ngDoCheck() : void {
    if (!this.currentNew && this.galleryData.newsListFull.length) {
      this.currentNew = this.galleryData.newsListFull.find(item => item.id === this.id);
    }
  }

  ngOnDestroy() : void {
    //Enable Scroll
    const bodyElem : any = document.querySelector('BODY');
    let pagePosition = parseInt(bodyElem.dataset.position, 10);
    bodyElem.style.top = 'auto';
    bodyElem.classList.remove('disable-scroll');
    window.scroll({top: pagePosition, left: 0});
    bodyElem.removeAttribute('data-position');
  }
}
