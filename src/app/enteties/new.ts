import { Comment } from '../enteties/comment';

interface NewPropsCheck{
  date : string;
}

export class New implements NewPropsCheck {
  date = '';

  constructor(
    public id : number,
    public headline : string,
    public author : string,
    public description : string,
    public rate : number,
    public dateTimeStamp : string,
    public commentsList : Comment[]
  ) {
    let dayStr : string;
    let monthStr : string = '';

    let dateTemp = new Date(dateTimeStamp);
    let day = dateTemp.getDate();
    let year = dateTemp.getFullYear();
    let month = dateTemp.getMonth()+1;

    if (day < 10) {
      dayStr = '0' + String(day);
    }
    else {
      dayStr = String(day);
    }

    if (month < 10) {
      monthStr = '0' + String(month);
    }
    else {
      monthStr = String(month);
    }

    let dateStr = dayStr + "." + monthStr + "." + year;

    this.date = dateStr;
  }
}
