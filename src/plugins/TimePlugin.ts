import PluginInterface from "./PluginInterface";

async function returnTimeString(_input: string): Promise<[string, string?]> {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return [`It is ${hour}:${minutes} right now`];
}

const TimePlugin: PluginInterface = {
  name: "TimePlugin",
  keyphrases: ["what time is it", "what is the time right now"],
  isResponsePlainText: true,
  processInput: returnTimeString
};

export default TimePlugin;
