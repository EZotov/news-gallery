import { New } from '../enteties/new';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class NewsGalleryService {
  http : HttpClient;
  newsListFull : New[] = [];
  startIndex : number = 0;


  constructor(http : HttpClient) {
    this.http = http;
  }

  getData() : Promise<String> {
    return new Promise ((resolve) => {
      let newsTempArray : {[k : string] : any};
      let nextId : number;

      this.http.get('assets/data.json').
        subscribe(
          (data) => {
            newsTempArray = data;
            newsTempArray['value'].forEach((newsItem : any) => {
              nextId = this.newsListFull.length + 1;
              this.newsListFull.push(new New(nextId, newsItem['name'], newsItem['author'], newsItem['description'], newsItem['rate'], newsItem['date']));
            });
            this.sortData(this.newsListFull);
            resolve('Done');
          }
        );
    });
  }

  getInitialData() : New[] {
    let initialNewsList : New[] = [];
    for (let i : number = 0; i < this.newsListFull.length; i++) {
      if (i < 20 && this.newsListFull.length >= 20) {
        initialNewsList.push(this.newsListFull[i]);
      }
      else {
        break;
      }
    };
    this.startIndex = 20;
    return initialNewsList;
  }

  sortData(array : New[]) : void {
    array.sort((a,b)  => {
      return Date.parse(b.dateTimeStamp) - Date.parse(a.dateTimeStamp);
    });
  }

  loadMoreData(value : number) : New[] {
    let newsItems : New[] = [];

    if (this.startIndex !== this.newsListFull.length) {
      for (let i : number = this.startIndex; i < this.startIndex + value; i++) {
        newsItems.push(this.newsListFull[i]);
      }
      this.startIndex+=value;
    }
    else {
      alert('Больше нет новостей.');
    }
    return newsItems;
  }

  getCurrentNew() : New {


    return this.newsListFull[0];
  }
}
