import { Component, OnInit} from '@angular/core';
import { New } from '../enteties/new';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import { newsSelector } from '../store/newsgallery.selectors';
import { loadNews } from '../store/newsgallery.actions';
import { NewsGalleryService } from './newsgallery.service';


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
  moreBtnEnable : boolean = true;
  searchText : string = '';
  maxRate : number = 5;
  inputPlaceholder : string = 'Нажмите Enter для поиска';
  startIndex : number = 0;
  allNewsCount : number = 0;

  constructor(
    private store : Store,
    private gallaryData : NewsGalleryService
  ) { }

  ngOnInit() : void {
    this.gallaryData.loadData()
      .then((newsList) => {
        this.allNewsCount = newsList.length;
        this.store.dispatch(loadNews({news : newsList}));
        this.getInitialData()
      });
  }

  onKeyBoardPress(event : KeyboardEvent, text : string) : void {
    if (event.keyCode == 13) {
      if (this.searchText !== '') {
        text = text.toLowerCase();
        this.allnews$.pipe(
          map(news => news.filter((newItem) => newItem.headline.toLowerCase().includes(text) ||  newItem.date.includes(text)))
        )
        .subscribe(
          (filteredNews) => {
          this.viewNews = filteredNews;
          this.moreBtnEnable = false;
          this.searchText = '';
          this.inputPlaceholder = 'Нажмите Enter для возврата';
        })
      }
      else {
        this.getInitialData();
        this.moreBtnEnable = true;
        this.inputPlaceholder = 'Нажмите Enter для поиска'
      }
    }
  }

  onMoreNewsButtonClick(value : number) : void {
    this.allnews$.pipe(
      map(news => news.slice(this.startIndex, this.startIndex+value))
    )
    .subscribe((additionalNews) => {
      additionalNews.forEach((newItem) => {
        this.viewNews.push(newItem);
      });
      if (this.viewNews.length === this.allNewsCount) {
        this.moreBtnEnable = false;
      }
      else {
        this.moreBtnEnable = true;
      }
    });
  }

  getInitialData() : void {
    const countInitialNews = 20;
    this.allnews$.pipe(
      map(news => news.slice(0,countInitialNews))
    )
    .subscribe((news) => {
      this.viewNews = news;
      this.startIndex = countInitialNews;
    });
  }

}
