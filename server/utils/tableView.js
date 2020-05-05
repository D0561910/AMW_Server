function tableView(jsonData) {
  class date {
    constructor() {
      this.event_Date = " ";
      this.event_Arr = [];
    }
  }
  class listview {
    constructor() {
      this.location = " ";
      this.key = " ";
      this.time = " ";
      this.title = " ";
    }
  }

  var tableViewArr = [];
  for (let i in jsonData) {
    var dateArr = new date();
    var listArr = [];
    if (!jsonData[i].empty) {
      dateArr.event_Date = i;
      for (let j in jsonData[i]) {
        if (j != "empty") {
          // here i no need check empty is true or false.
          // this is root key.
          // var dataList = new listview();
          var data = jsonData[i][j].empty;
          var dataTittle = jsonData[i][j].title;
          let len = jsonData[i][j].program;
          if (len != null) {
            for (let k in len) {
              // this is for mutli program and program not equal null
              // this is program key.
              var multdataList = new listview();
              multdataList.location = len[k].location;
              multdataList.key = `${i}/${j}/program/${k}`;
              multdataList.time = `${jsonData[i][j].starttime} - ${jsonData[i][j].endtime}`;
              multdataList.title = len[k].title;
              listArr.push(multdataList);
            }
          } else {
            if (
              jsonData[i][j].starttime != null &&
              jsonData[i][j].endtime != null
            ) {
              var dataList = new listview();
              dataList.location = jsonData[i][j].location;
              dataList.key = `${i}/${j}`;
              dataList.time = `${jsonData[i][j].starttime} - ${jsonData[i][j].endtime}`;
              dataList.title = jsonData[i][j].title;
              listArr.push(dataList);
            }
          }
        }
        dateArr.event_Arr = listArr;
      }
      tableViewArr.push(dateArr);
    }
  }
  return tableViewArr;
}

export default tableView;