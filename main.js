/*
  Module used to format and send out web requests.
  * @param  {string} baseURL - URL used throughout the module for a formatted request.
  * @return {any}            - Returns any value based off the web request and functions.
*/
var Formatter = function(baseURL) {
  // The base URL at the start.
  this.URL = baseURL;
  // The end-result URL after formation.
  this.formattedURL = '';
  
  // The current argument string saved in the formatter.
  this.argumentString = '';
  // Argument array used to store all inputted arguments. 
  this.args = {};
  
  /*
    Returns what the base URL is.
    * @return {string} - Returns a string of the base URL inputted to the URL formatter.
  */
  this.baseUrl = function(){
    return this.URL;
  };
  
  /*
    Added a specific argument with a certain value. 
    * @param  {string} argumentName  - The name of the argument that is going to be added. 
    * @param  {string} argumentValue - The value of the argument. 
    * @return {string}               - Returns a string to notify the value was added with {x} value.
  */
  this.addArgument = function(argumentName, argumentValue){
    if (this.args[argumentName]) {
      return 'ERROR: Argument Already Exists';
    }
    
    this.args[argumentName] = argumentValue;
    return 'Added: ' + argumentName + ' With value: ' + argumentValue;
  };
  
  /*
    Removes a specific argument. 
    * @param  {string} argumentName  - The name of the argument that is going to be removed. 
    * @return {string}               - Returns a string to notify the value was removed.
  */
  this.removeArgument = function(argumentName){
    if (this.args[argumentName]) {
      delete this.args[argumentName];
      return 'Removed: ' + argumentName;
    } else {
      return 'ERROR: Argument Does Not Exist';
    }
  };
  
  /*
    Edits a specific argument with a value.
    * @param  {string} argumentName  - The name of the argument that is going to be edited. 
    * @param  {string} argumentValue - The new value of the argument. 
    * @return {string}               - Returns a string to notify the value was updated with {x} value.
  */
  this.editArgument = function(argumentName, argumentValue){
    if (this.args[argumentName]) {
      this.args[argumentName] = argumentValue;
      return 'Edited: ' + argumentName + ' With value: ' + argumentValue;
    } else {
      return 'ERROR: Argument Does Not Exist';
    }
  };
  
  /*
    Clears all arguments. 
    * @return {string} - Returns a string to notify the arguments were cleared. 
  */
  this.clearArguments = function(){
    this.args = {};
    return 'Cleared Arguments';
  };
  
  /*
    Returns all the arguments.
    * @return {array} - Returns the args inputted to the web formatting module.
  */
  this.returnArgs = function(){
    return this.args;
  };
  
  /*
    Fix the text in the arguments so they can be sent properly.
    * @param  {string} argumentText - String that is unformmated for web URLs.
    * @return {string}              - Returns a formatted string for web URLs.
  */
  this.fixText = function(argumentText){
    return encodeURI(argumentText);
  };
  
  /*
    Compile the arguments of the request so it can be sent properly. 
    * @param  {array} argumentList - Array containing all the arguments used for formatting the URL.
    * @return {string}             - Returns arguments ready to be attatched to a URL.
  */
  this.compileArguments = function(argumentList){
    var argString = '';
    argumentList = this.args;
    
    for (var argument in argumentList) {
      var currentArgValue = argumentList[argument];
      var fixedArg = this.fixText(currentArgValue);
      
      argString = argString + argument + '=' + fixedArg + '&';
    }
    
    this.argumentString = argString;
    
    return argString;
  };
  
  /*
    Format a URL and get it ready to haev a request sent out. 
    * @param  {string} requestedUrl       - Base url like https://google.com/search.
    * @param  {string} requestedArguments - The arguments that were inputted or now decided on. Must be formatted.
    * @return {string}                    - Returns a formatted URL ready for sending out an api request.
  */
  this.compileUrl = function(requestedUrl, requestedArguments){
    requestedUrl = this.URL;
    requestedArguments = this.argumentString;
    this.formattedURL = requestedUrl + '?' + requestedArguments;
    return requestedUrl + '?' + requestedArguments;
  };
  
  /*
    Send a web request out and wait for a response before continuing the code. 
    * @param  {func} callback - Function used to run code after a response is gathered.
    * @return {array}         - Returns an array based off what the web request returns.
  */
  this.sendRequest = function(callback){
    var requestedUrl = this.formattedURL;
    
    var response = 'NONE/NO-CONTENT-' + randomNumber(1, 99999);
    var firstResponse = response;
    
    try {
      startWebRequest(requestedUrl, function(status, type, content){
        response = {
          'Status': status,
          'Type': type,
          'Content': content
        };
      });
    } catch (error) {
      return error;
    }
    
    var checkLoop = setInterval(function(){
      if (response != firstResponse) {
        clearInterval(checkLoop);
        callback(response);
      }
    },10);
  };
};
