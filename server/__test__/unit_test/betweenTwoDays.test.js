import "regenerator-runtime/runtime";
import betweenTwoDays from "../../utils/betweenTwoDays";

// @Test betweenTwoDays function
describe("betweenTwoDays function test Case", () => {
  it("test case with start date and end date", (done) => {
    const ANSWER = [
      "10-Jul-2020",
      "11-Jul-2020",
      "12-Jul-2020",
      "13-Jul-2020",
      "14-Jul-2020",
      "15-Jul-2020",
    ];
    const res = betweenTwoDays("07-10-2020", "07-15-2020");
    expect(res).toEqual(ANSWER);
    done();
  });
});

// @Test betweenTwoDays function
describe("betweenTwoDays function test Case", () => {
  it("test case with error start date and end date", (done) => {
    const ANSWER = [];
    const res = betweenTwoDays("07-15-2020", "07-10-2020");
    expect(res).toEqual(ANSWER);
    done();
  });
});

// @Test betweenTwoDays function
describe("betweenTwoDays function test Case", () => {
  it("test case with empty start date", (done) => {
    const ANSWER = [];
    const res = betweenTwoDays("", "07-15-2020");
    expect(res).toEqual(ANSWER);
    done();
  });
});

// @Test betweenTwoDays function
describe("betweenTwoDays function test Case", () => {
  it("test case with empty end date", (done) => {
    const ANSWER = [];
    const res = betweenTwoDays("07-15-2020", "");
    expect(res).toEqual(ANSWER);
    done();
  });
});
