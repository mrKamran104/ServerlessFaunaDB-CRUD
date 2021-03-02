// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const faunadb = require('faunadb')
const q = faunadb.query
const dotenv = require("dotenv");
dotenv.config();

const handler = async () => {
  try {
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_ADMIN_SECRET
    })

    const res = await client.query(q.Map(
      q.Paginate(q.Documents(q.Collection("todos"))),
      q.Lambda((x) => q.Get(x))
    ))

    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
