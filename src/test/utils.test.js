import utils from "../utils";

describe("utils package ", () => {
    it("function fn give the correct result", () => {
        const ret = utils.fn();
        expect(ret).toBe("hello world");
    });
});