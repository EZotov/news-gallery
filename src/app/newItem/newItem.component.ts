import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { newsSelector } from '../store/newsgallery.selectors'
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { New } from '../enteties/new';


@Component(
  {
    selector : 'new-item',
    templateUrl : './newItem.component.html',
    styleUrls : ['./newItem.component.scss']
  }
)
export class NewItem implements OnInit, OnDestroy {
  id : number = 0;
  allNews$ : Observable<New[]> = this.store.select(newsSelector);
  currentNew : any;

  constructor(
    private activateRoute : ActivatedRoute,
    private store : Store
  ) { }

  ngOnInit() : void {
    this.id = Number(this.activateRoute.snapshot.params['id']);
    this.allNews$.pipe(
      map(news => news.filter(newItem => newItem.id === this.id))
    )
    .subscribe(
      (news) => {
        this.currentNew = news[0];
      }
    );
    //Disable Scroll
    const bodyElem : any = document.querySelector('BODY');
    let pagePosition = window.scrollY;
    bodyElem.classList.add('disable-scroll');
    bodyElem.dataset.position = pagePosition;
    bodyElem.style.top = -pagePosition + 'px';
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
