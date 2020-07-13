import "regenerator-runtime/runtime";
import betweenTwoDays from "../utils/betweenTwoDays";

// @Test Between Two Days;
describe("Between Two Day function", () => {
    it("check two day", async (done) => {
        const ANSWER = ["28-Jun-2020", "29-Jun-2020", "30-Jun-2020"]
        expect(betweenTwoDays("06-28-2020", "06-30-2020")).toEqual(ANSWER);
        done();
    });
});

// @Test Between Two Days;
describe("Between Two Day function", () => {
    it("Invaild End Date", async (done) => {
        const ANSWER = []
        expect(betweenTwoDays("06-28-2020", "06-31-2020")).toEqual(ANSWER);
        done();
    });
});

// @Test Between Two Days;
describe("Between Two Day function", () => {
    it("Invaild Start Date", async (done) => {
        const ANSWER = []
        expect(betweenTwoDays("06-00-2020", "06-30-2020")).toEqual(ANSWER);
        done();
    });
});
