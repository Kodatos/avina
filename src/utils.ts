import PluginInterface from "./plugins/PluginInterface";

import * as fs from "fs";
import * as path from "path";

export function isPlugin(plugin: any): plugin is PluginInterface {
  return (
    plugin.name !== undefined &&
    plugin.keyphrases !== undefined &&
    plugin.isResponsePlainText !== undefined &&
    plugin.processInput !== undefined
  );
}

export async function loadPlugins(): Promise<PluginInterface[]> {
  const plugins: PluginInterface[] = [];
  const files: string[] = fs.readdirSync(path.resolve(__dirname, "./plugins"));
  const ext = process.env.NODE_ENV === "dev" ? ".ts" : ".js";
  for (let file of files) {
    if (!(path.extname(file) === ext) || file === "PluginInterface" + ext) {
      continue;
    }
    try {
      let pluginExport = await import(path.resolve(__dirname, "./plugins", file));
      if (isPlugin(pluginExport.default)) {
        plugins.push(pluginExport.default);
      }
    } catch (err) {
      console.error("Couldn't load " + file);
      console.error(err);
    }
  }
  return plugins;
}
