import { Component, OnInit} from '@angular/core';
import { New } from '../enteties/new';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { newsSelector } from '../store/newsgallery.selectors';
import { loadNews } from '../store/newsgallery.actions';


@Component(
  {
    selector: 'newsGallery',
    templateUrl: './newsgallery.component.html',
    styleUrls: ['./newsgallery.component.scss']
  }
)

export class NewsGallery implements OnInit {
  //Properties
  viewNews : New[] = [];
  allnews$ : Observable<New[]> = this.store.select(newsSelector);
  news : New[] = [];
  moreNewsBtnEnable : boolean = true;
  searchText : string = '';
  maxRate : number = 5;
  inputPlaceholder : string = 'Нажмите Enter для поиска';
  startIndex : number = 0;

  constructor(
    private store : Store,
  ) { }

  ngOnInit() : void {
    this.store.dispatch(loadNews());
    this.allnews$.subscribe((news) => {
      this.news = news;
      this.getInitialNews();
    });
  }

  onKeyBoardPress(event : KeyboardEvent, text : string) : void {
    if (event.keyCode === 13) {
      if (this.searchText !== '') {
        text = text.toLowerCase();
        let filteredNews = this.news.filter((newItem) => newItem.headline.toLowerCase().includes(text) || newItem.date.includes(text));
        this.viewNews = filteredNews;
        this.searchText = '';
        this.inputPlaceholder = 'Нажмите Enter для возврата';
      }
      else {
        this.getInitialNews();
        this.moreNewsBtnEnable = true;
        this.inputPlaceholder = 'Нажмите Enter для поиска';
      }
    }
  }

  onMoreNewsButtonClick(value : number) : void {
    this.news.slice(this.startIndex, this.startIndex + value).forEach((newItem) => {
      this.viewNews.push(newItem);
    });

    if (this.viewNews.length === this.news.length) {
      this.moreNewsBtnEnable = false;
    }
    else {
      this.moreNewsBtnEnable = true;
    }
  }

  getInitialNews() : void {
    const countInitialNews = 20;
    this.viewNews = this.news.slice(0, countInitialNews);
    this.startIndex = countInitialNews;
  }
}
