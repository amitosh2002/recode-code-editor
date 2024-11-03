export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  node: "15.10.0",
  bash: "5.1.0",
};
export const BOILER_PLATE = {
  javascript: `
      function greet(name) {
        console.log("Hello, " + name + "!");
      }
      
      greet("Paul");
      `,
  typescript: `
      type Params = {
        name: string;
      };
      
      function greet(data: Params) {
        console.log("Hello, " + data.name + "!");
      }
      
      greet({ name: "Paul" });
      `,
  python: `
    def greet(name):
        print("Hello, " + name + "!")
      
    greet("Paul")
      `,
  node: `var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors())
app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})`,
  bash: `
echo "Hello World";
`,
};
