import "regenerator-runtime/runtime";
import checkEmailValidation from "../utils/checkEmailValidation";
import admin from "../config/firebase.config";

// @Test CheckEmailValidation function;
describe("CheckEmailValidation function", () => {
    it("CheckEmailValidation", async (done) => {
        admin
        const ANSWER = "true";
        var retVal = await checkEmailValidation("test@gmail.com");
        expect(retVal).toEqual(ANSWER);
        done();
    });
});

// @Test CheckEmailValidation function;
describe("CheckEmailValidation function", () => {
    it("Invaild Email / The email not save inside Database", async (done) => {
        admin
        const ANSWER = "false";
        var retVal = await checkEmailValidation("tes@gmail.com");
        expect(retVal).toEqual(ANSWER);
        done();
    });
});
