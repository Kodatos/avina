import Plugin from "../plugins/PluginInterface";
import * as similarity from "string-similarity";

interface Response {
  isPlainText: boolean;
  response: [string, string?];
}

export function getResponse(input: string, plugins: Plugin[]): Response {
  const similarityThreshold = 0.6;
  let matchedIndex = 0;
  let maxMatch = 0.0;
  plugins.forEach((plugin, index) => {
    let currentMatch = similarity.findBestMatch(
      input,
      plugin.keyphrases.slice(4)
    ).bestMatch.rating;
    if (currentMatch > similarityThreshold && currentMatch > maxMatch) {
      maxMatch = currentMatch;
      matchedIndex = index;
    }
  });
  if (maxMatch < 0.2)
    return {
      isPlainText: true,
      response: ["Sorry, Could not understand that."]
    };
  return {
    isPlainText: plugins[matchedIndex].isResponsePlainText,
    response: plugins[matchedIndex].processInput(input)
  };
}
