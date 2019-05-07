import TimePlugin from "../plugins/TimePlugin";
import chai = require("chai");

const expect = chai.expect;

describe("Time Plugin", () => {
  it("works", async () => {
    const result = await TimePlugin.processInput("");
    expect(result).to.not.be.null;
  });
});
