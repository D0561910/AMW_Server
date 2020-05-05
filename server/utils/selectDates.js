function selectDates(jsonData) {
  class date {
    constructor() {
      this.event_Date = " ";
    }
  }
  var dateArrays = [];
  for (let i in jsonData) {
    var dateArr = new date();
    if (jsonData[i].empty) {
      dateArr.event_Date = i;
      dateArrays.push(dateArr);
    }
  }
  return dateArrays;
}

export default selectDates;