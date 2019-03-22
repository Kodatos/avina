import PluginInterface from "./plugins/PluginInterface";
import * as fs from "fs";
import * as path from "path";

function isPlugin(plugin: any): plugin is PluginInterface {
  return (
    plugin.name !== undefined &&
    plugin.keyphrases !== undefined &&
    plugin.isResponsePlainText !== undefined &&
    plugin.processInput !== undefined &&
    typeof plugin.processInput === "function"
  );
}

export function loadPlugins(): PluginInterface[] {
  const plugins: PluginInterface[] = [];
  fs.readdirSync("./plugins/").forEach(async file => {
    if (path.extname(file) !== "ts" || file === "PluginInterface.ts") return;
    let pluginExport = await import(path.resolve("./plugins", file));
    if (isPlugin(pluginExport)) plugins.push(pluginExport);
  });
  return plugins;
}
