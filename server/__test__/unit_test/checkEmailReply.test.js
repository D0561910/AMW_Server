import "regenerator-runtime/runtime";
import checkEmailReply from "../../utils/checkEmailReply";
import admin from "../../config/firebase.config";

// admin;

// @Test checkEmailValidation function
describe("checkEmailValidation function test Case", () => {
  it("test case with new email", async (done) => {
    const ANSWER = "false";
    const res = await checkEmailReply("Hello@gmail.com");
    expect(res).toEqual(ANSWER);
    done();
  });
});

// @Test checkEmailValidation function
describe("checkEmailValidation function test Case", () => {
  it("test case with reply email", async (done) => {
    const ANSWER = "true";
    const res = await checkEmailReply("test@gmail.com");
    expect(res).toEqual(ANSWER);
    done();
  });
});
