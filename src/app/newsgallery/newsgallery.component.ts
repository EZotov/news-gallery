import { Component, OnInit, Input} from '@angular/core';
import { NewsGalleryService } from './newsgallery.service';
import { New } from '../enteties/new';
import { Router } from '@angular/router';

@Component(
  {
    selector: 'newsGallery',
    templateUrl: './newsgallery.component.html',
    styleUrls: ['./newsgallery.component.scss']
  }
)

export class NewsGallery implements OnInit {
  //Service
  galleryData : NewsGalleryService;

  //Properties
  news : New[] = [];
  moreBtnEnable : boolean = true;
  searchText : string = '';
  maxRate : number = 5;
  inputPlaceholder : string = 'Нажмите Enter для поиска';
  //Router
  router : Router;

  constructor(data : NewsGalleryService, router : Router) {
    this.galleryData = data;
    this.router = router;
  }

  ngOnInit() : void {
    if (this.galleryData.newsListFull.length == 0) {
      this.galleryData.getData()
        .then(() => {
          this.news = this.galleryData.getInitialData();
        });
    }
    else {
      this.news = this.galleryData.getInitialData();
    }

  }

  onKeyBoardPress(event : KeyboardEvent, text : string) : void {
    if (event.keyCode == 13) {
      if (this.searchText !== '') {
        text = text.toLowerCase();
        let filteredNews = this.galleryData.newsListFull.filter(newItem => newItem.headline.toLowerCase().includes(text) ||  newItem.date.includes(text));
        this.news = [...filteredNews];
        this.moreBtnEnable = false;
        this.searchText = '';
        this.inputPlaceholder = 'Нажмите Enter для возврата';
      }
      else {
        this.news = this.galleryData.getInitialData();
        this.moreBtnEnable = true;
        this.inputPlaceholder = 'Нажмите Enter для поиска'
      }
    }
  }

  onRoutingToNewsItem() : void {
    //Disable Scroll
    const bodyElem : any = document.querySelector('BODY');
    let pagePosition = window.scrollY;
		bodyElem.classList.add('disable-scroll');
		bodyElem.dataset.position = pagePosition;
		bodyElem.style.top = -pagePosition + 'px';
  }

  // onChangeSearchText (text : string) : void {
  //   if (this.searchText !== '') {
  //     let filteredNews = this.galleryData.newsListFull.filter(newItem => newItem.headline.includes(text) ||  newItem.date.includes(text));
  //     this.news = [...filteredNews];
  //   }
  //   else {
  //     this.news = this.galleryData.getInitialData();
  //   }
  // }

  moreNews(value : number) : void {
    let additionalNews : New[] = this.galleryData.loadMoreData(value);

    if (additionalNews.length !== 0) {
      additionalNews.forEach((newItem) => {
        this.news.push(newItem);
      });
    }

    if (this.news.length == this.galleryData.newsListFull.length) {
      this.moreBtnEnable = false;
    }
    else {
      this.moreBtnEnable = true;
    }
  }
}
