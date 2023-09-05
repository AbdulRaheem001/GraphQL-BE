const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql"); // Use graphqlHTTP from express-graphql
const { buildSchema } = require("graphql");
const mongoose= require("mongoose");
const dbConnection =require("./Db/db");
const Event =require("./Model/Event_Model")
const app = express();

app.use(bodyParser.json());

app.use(
  "/api",
  graphqlHTTP({
    schema: buildSchema(`
    type Event{
        _id:ID!
        title:String!
        description: String!
        price:Float!
        date:String!

    }
    input EventInput{
        title:String!
        description: String!
        price:Float!
        date:String!
    }
        type RootQuery {
            events: [Event!]!
        }
        type RootMutation {
            creatEvent(eventinput : EventInput): Event
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return events;
      },
      creatEvent: (args) => {

        // const event={
        //     _id: Math.random().toString(),
        // title:args.eventinput.title,
        // description: args.eventinput.description,
        // price:+args.eventinput.price,
        // date:args.eventinput.date
        // }
        // console.log(args);
        const event =new Event({
            title:args.eventinput.title,
            description: args.eventinput.description,
            price:+args.eventinput.price,
            date:new Date(args.eventinput.date)
        })
        return event.save().then((result)=>{
            console.log("Data Save")
        return {...result._doc};
    })
        .catch(()=>{console.log("Data Not Save")});
        
      },
    },
    graphiql: true,
  })
);

//DB connection

dbConnection()
.then(()=>{
    console.log("DB connect");
    app.listen(3000);
}).catch(()=>{
    console.log("DB not connect");
});

