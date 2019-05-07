/* All plugins must be a .ts file which exports an implementation of this interface
  - PugJS is already an available dependency for templating 
  - Any dependencies required by the plugin must be installed manually by the server owner 
    at the root package.json. Inform the same
*/
export default interface PluginInterface {
  name: string; //Name of the plugin

  /** An array of keyphrases the plugin should be available for.
    Note that only first 5 of them are considered */
  keyphrases: string[];

  //Whether response is plaintext or html string
  isResponsePlainText: boolean;

  /** Function that returns a string tuple corresponding to "isResponsePlainText"
    If responding with html string, the second tuple element is used for 
    speech output */
  processInput(speechInput: string): Promise<[string, string?]>;
}
