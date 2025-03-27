var { graphql, buildSchema } = require("graphql");
var express = require("express");
var { createHandler } = require("graphql-http");
 
var schema = buildSchema(`
  type Query {
    hello: String
    age: Int
    death: Boolean
  }
`)
 
var rootValue = { hello: () => "Hello world!", age: () => 30, death: false }
 
var source = "{ hello, age, death}"
 
const app = express();

app.all('/graphql', createHandler({ schema, rootValue }));

app.listen(4000);

console.log("App is running on localhost port 4000")
