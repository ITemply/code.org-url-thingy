simple code.org thingy i made in like a day for school

this was built for JS ES5

its better than the natural code.org stuff and makes requesting stuff easy. this also allows for the request to be sent many times without others getting in the way unlike code.org smh

# example:
```js
// creating object thingy
var ApiMethod = new Formatter ('https://www.random.org/integers')

// web url stuff
console.log(ApiMethod.addArgument('format', 'plain'))
console.log(ApiMethod.addArgument('num', 10))
console.log(ApiMethod.addArgument('min', 1))
console.log(ApiMethod.addArgument('max', 100))
console.log(ApiMethod.addArgument('base', 10))
console.log(ApiMethod.addArgument('col', 1))
console.log(ApiMethod.compileArguments())
console.log(ApiMethod.compileUrl())

// sending request
ApiMethod.sendRequest(function(response){
  console.log(response)
})
```
`console.log` is not needed at all idk y i have it, tbh it was to test the code but you can do it anyway u like with or without. the `console.log` just gives you examples on how stuff is going and errors sometimes
