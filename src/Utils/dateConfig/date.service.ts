import { Injectable } from "@angular/core"

@Injectable()
export class DateService{

  /**
   * map day with appropriate suffice 
   * 
   */
  mapDayWithSuffix(chosenDay:number):string{
      // putting the date suffix         
      let day = chosenDay + 'th';
      if (chosenDay == 1 || chosenDay == 21 || chosenDay == 31) {
        day = chosenDay + 'st';
      } else if (chosenDay == 2 || chosenDay == 22) {
        day = chosenDay + 'nd';
      } else if (chosenDay == 3 || chosenDay == 23) {
        day = chosenDay + 'rd';
      } else {
        day = chosenDay + 'th';
      }
      return day;
  }


/**
 * map month 
 */
  mapMonth(chosenMonth : number){
      // setting month
      let month = '';
      if (chosenMonth == 0) {
        month = 'January';
      } else if (chosenMonth == 1) {
        month = 'February';
      } else if (chosenMonth == 2) {
        month = 'March';
      } else if (chosenMonth == 3) {
        month = 'April';
      } else if (chosenMonth == 4) {
        month = 'May';
      } else if (chosenMonth == 5) {
        month = 'June';
      } else if (chosenMonth == 6) {
        month = 'July';
      } else if (chosenMonth == 7) {
        month = 'August';
      } else if (chosenMonth == 8) {
        month = 'September';
      } else if (chosenMonth == 9) {
        month = 'October';
      } else if (chosenMonth == 10) {
        month = 'November';
      } else if (chosenMonth == 11) {
        month = 'December';
      }

      return month;
  }

  getCurrentDaYNumber() {
    let year = new Date().getFullYear();
    // getting the current day of the year in number.
    return Math.round(
      (new Date().setHours(23) - Number(new Date(year, 0, 1, 0, 0, 0))) /
        1000 /
        60 /
        60 /
        24
    );
  }


  
}

export const getDateDifference = (startDate:Date, endDate:Date)=>{
  var startTime = new Date(startDate); 
  var endTime = new Date(endDate);
  var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
  return Math.round(difference / 60000);
}
