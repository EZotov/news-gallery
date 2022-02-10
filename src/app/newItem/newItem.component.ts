import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { NewsGalleryService } from '../newsgallery/newsgallery.service';


@Component(
  {
    selector : 'new-item',
    templateUrl : './newItem.component.html',
    styleUrls : ['./newItem.component.scss']
  }
)
export class NewItem implements OnInit {
  //Service
  galleryData : NewsGalleryService;

  id : number;
  currentNew : any;

  constructor(activateRoute : ActivatedRoute, data : NewsGalleryService) {
    this.galleryData = data;
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit() : void {
    this.currentNew = this.galleryData.newsListFull.filter(item => item.id == this.id)[0];
  }

  onRoutingToMain() : void {
    //Enable Scroll
    const bodyElem : any = document.querySelector('BODY');
    let pagePosition = parseInt(bodyElem.dataset.position, 10);
		bodyElem.style.top = 'auto';
		bodyElem.classList.remove('disable-scroll');
		window.scroll({top: pagePosition, left: 0});
	  bodyElem.removeAttribute('data-position');
  }
}
