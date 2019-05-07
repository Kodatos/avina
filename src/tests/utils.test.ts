import * as Utils from "../utils";

import chai = require("chai");
import PluginInterface from "../plugins/PluginInterface";

chai.use(require("chai-things"));

const expect = chai.expect;

describe("Plugin Typeguard", () => {
  it("Invalidates wrong interface", () => {
    expect(Utils.isPlugin({ name: "hello" })).to.be.false;
  });
});

describe("Plugin Loading", () => {
  let plugins: PluginInterface[];
  before(async () => {
    plugins = await Utils.loadPlugins();
  });

  it("Isn't empty", () => {
    expect(plugins).to.not.be.empty;
  });

  it("Loads TimePLugin", () => {
    expect(plugins).to.contain.something.with.property("name", "TimePlugin");
  });
});
