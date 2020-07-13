import "regenerator-runtime/runtime";
import checkEmailValidation from "../../utils/betweenTwoDays";

// @Test betweenTwoDays function
describe("checkEmailValidation function test Case", () => {
  it("test case with checkEmailValidation", (done) => {
    const ANSWER = false;
    const res = checkEmailValidation("Hello@gmail.com");
    expect(res).toEqual(ANSWER);
    done();
  });
});
