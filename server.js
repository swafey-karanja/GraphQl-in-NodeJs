var { graphql, buildSchema } = require("graphql")
 
var schema = buildSchema(`
  type Query {
    hello: String
    age: Int
    death: Boolean
  }
`)
 
var rootValue = { hello: () => "Hello world!", age: () => 30, death: false }
 
var source = "{ hello, age, death}"
 
graphql({ schema, source, rootValue }).then(response => {
  console.log(response)
})