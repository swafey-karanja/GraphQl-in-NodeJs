import { buildSchema } from "graphql";
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
 

// exclamation mark makes the scalar non-nullable(cannot be null)
// hobbies: [String!]! this defines a required array of required string values
var schema = buildSchema(`
  type Query {
    hello(word: String!): String
    age: Int
    death: Boolean
    weight: Float!
    hobbies(hobby1: String!, hobby2: String!, hobby3: String!): [String]!
  }
`)


 
var rootValue = { 
  hello: (args) => "Hello " + args.word, 
  age: () => 30, 
  death: false,
  weight: 70.5,  // weight is non-nullable
  hobbies: ({ hobby1, hobby2, hobby3 }) => [hobby1, hobby2, hobby3]
}
 
const app = express();

app.all('/graphql', createHandler({ schema, rootValue }));

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
})

app.listen(4000);

console.log("App is running on localhost port 4000")
