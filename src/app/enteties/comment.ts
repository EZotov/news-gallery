interface CommentTypeCheck {
  date : string;
}

export class Comment implements CommentTypeCheck {
  date = '';

  constructor(
    public username : string,
    public message : string,
    public dateTimeStamp : string
  ) {
    this.date = new Date(dateTimeStamp).toLocaleString('ru-RU').substring(0, 17);
  }
 }
