import { New } from '../enteties/new';
import { Comment } from '../enteties/comment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class NewsGalleryService {
  newsListFull : New[] = [];
  startIndex : number = 0;


  constructor(
    private http : HttpClient) {
  }

  getData() : Promise<String> {
    return new Promise ((resolve) => {
      let newsTempArray : {[k : string] : any};
      let nextId : number;
      let commentsList : Comment[] = [];

      this.http.get('assets/data.json').
        subscribe(
          (data) => {
            newsTempArray = data;
            newsTempArray['value'].forEach((newsItem : any) => {
              nextId = this.newsListFull.length + 1;
              //Create Comments
              if (newsItem.comments) {
                if (newsItem.comments.length) {
                  newsItem.comments.forEach((comment : any) => {
                    commentsList.push(new Comment(comment.username, comment.message, comment.date));
                  });
                }
              }
              this.sortData(commentsList, 'asc');
              //Create New
              this.newsListFull.push(new New(nextId, newsItem.name, newsItem.author, newsItem.description, newsItem.rate, newsItem.date, commentsList));
              //Clear CommentsArray
              commentsList = [];
            });
            this.sortData(this.newsListFull, 'desc');
            resolve('Done');
          }
        );
    });
  }

  getInitialData() : New[] {
    let initialNewsList : New[] = [];

    this.newsListFull.forEach((newItem, i) => {
      if (i < 20 && this.newsListFull.length >= 20) {
        initialNewsList.push(this.newsListFull[i]);
      }
      else {
        return;
      }
    });
    this.startIndex = 20;
    return initialNewsList;
  }

  sortData(array : any[], type : string) : void {
    if (type === 'desc') {
      array.sort((a : any,b : any)  => {
        return Date.parse(b.dateTimeStamp) - Date.parse(a.dateTimeStamp);
      });
    }
    else if (type === 'asc') {
      array.sort((a : any,b : any)  => {
        return Date.parse(a.dateTimeStamp) - Date.parse(b.dateTimeStamp);
      });
    }
  }

  loadMoreData(value : number) : New[] {
    let newsItems : New[] = [];

    for (let i : number = this.startIndex; i < this.startIndex + value; i++) {
      newsItems.push(this.newsListFull[i]);
    }
    this.startIndex+=value;
    return newsItems;
  }
}
