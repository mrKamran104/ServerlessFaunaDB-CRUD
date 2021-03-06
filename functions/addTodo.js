// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const faunadb = require('faunadb')
const q = faunadb.query
const dotenv = require("dotenv");
dotenv.config();

const handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const client = new faunadb.Client({
      secret: process.env.FAUNADB_ADMIN_SECRET
    })

    const data = JSON.parse(event.body)
    // console.log('Function `todo-create` invoked', data)
    const todoItem = {
      data: data
    }

    const res = await client.query(q.Create(q.Collection('todos'), todoItem))

    return {
      statusCode: 200,
      body: JSON.stringify(res),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
