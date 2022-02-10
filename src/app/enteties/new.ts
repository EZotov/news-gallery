interface NewPropsCheck{
  id : number;
  headline : string;
  date : string;
  author : string;
  description : string;
  rate : number;
  dateTimeStamp : string;
}

export class New implements NewPropsCheck {
  id = 0;
  headline = '';
  date = '';
  author = '';
  description = '';
  rate = 0;
  dateTimeStamp = '';

  constructor(id : number, headline : string, author : string, description : string, rate : number, dateTimeStamp : string) {
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

    this.id = id;
    this.headline = headline;
    this.date = dateStr;
    this.author = author;
    this.description = description;
    this.rate = rate;
    this.dateTimeStamp = dateTimeStamp;
  }

}
