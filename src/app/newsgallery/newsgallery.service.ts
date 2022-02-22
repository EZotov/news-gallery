import { New } from '../enteties/new';
import { Comment } from '../enteties/comment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class NewsGalleryService {

  constructor(
    private http : HttpClient
  ) { }

  loadData() : Promise<New[]> {
    return new Promise((resolve) => {
      let newsTempArray : {[k : string] : any};
      let nextId : number;
      let commentsList : Comment[] = [];
      let newsListFull : New[] = [];

      this.http.get('assets/data.json').
        subscribe(
          (data) => {
            newsTempArray = data;
            newsTempArray['value'].forEach((newsItem : any) => {
              nextId = newsListFull.length + 1;
              //Create Comments
              if (newsItem.comments) {
                if (newsItem.comments.length) {
                  newsItem.comments.forEach((comment : Comment) => {
                    commentsList.push(new Comment(comment.username, comment.message, comment.date));
                  });
                }
              }
              this.sortData(commentsList, 'asc');
              //Create New
              newsListFull.push(new New(nextId, newsItem.name, newsItem.author, newsItem.description, newsItem.rate, newsItem.date, commentsList));
              //Clear CommentsArray
              commentsList = [];
            });
            this.sortData(newsListFull, 'desc');
            resolve(newsListFull);
          }
        );
    });
  }

  sortData(source : any[], type : string) : void {
      if (type === 'desc') {
        source.sort((a : any,b : any)  => {
          return Date.parse(b.dateTimeStamp) - Date.parse(a.dateTimeStamp);
        });
      }
      else if (type === 'asc') {
        source.sort((a : any,b : any)  => {
          return Date.parse(a.dateTimeStamp) - Date.parse(b.dateTimeStamp);
        });
      }
    }
}
