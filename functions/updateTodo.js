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

    let client = new faunadb.Client({
      secret: process.env.FAUNADB_ADMIN_SECRET
    });

    const reqData = JSON.parse(event.body);
    const res = await client.query(
      q.Update(q.Ref(q.Collection("todos"), reqData.id), {
        data: { title: reqData.title },
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(res),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
