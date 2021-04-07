import "regenerator-runtime/runtime";
import findUser from "../../utils/findUser";
import admin from "../../config/firebase.config";

// admin;

// @Test findUser function
describe("findUser function test Case", () => {
  it("test case with new email", async (done) => {
    const ANSWER = true;
    const res = await findUser("test@gmail.com", "123456")
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
    expect(res).toEqual(ANSWER);
    done();
  });
});

// @Test findUser function
describe("findUser function test Case", () => {
  it("test case with new email", async (done) => {
    const ANSWER = false;
    const res = await findUser("Hello@gmail.com", "123456")
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
    expect(res).toEqual(ANSWER);
    done();
  });
});

// @Test findUser function
describe("findUser function test Case", () => {
  it("test case with new email", async (done) => {
    const ANSWER = false;
    const res = await findUser("test@gmail.com", "0123456")
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
    expect(res).toEqual(ANSWER);
    done();
  });
});
