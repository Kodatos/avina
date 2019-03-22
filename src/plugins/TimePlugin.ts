import PluginInterface from "./PluginInterface";

function returnTimeString(_input: string): [string, string?] {
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
