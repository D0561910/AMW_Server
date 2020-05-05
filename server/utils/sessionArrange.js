function sessionArrange(jsonData) {
  class session {
    constructor() {
      this.event_session = " ";
    }
  }

  var numArrays = [];
  for (let i in jsonData) {
    var timeArrays = [];
    for (let j in jsonData[i]) {
      if (jsonData[i][j].empty) {
        var sessArr = new session();
        sessArr.event_session = `${i} ${jsonData[i][j].starttime} - ${jsonData[i][j].endtime}`;
        timeArrays.push(sessArr);
      }
    }
    if (timeArrays.length > 0) {
      numArrays.push(timeArrays);
    }
  }
  return numArrays;
}

export default sessionArrange;
