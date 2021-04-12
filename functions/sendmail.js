const client = require('@sendgrid/mail')
const {
  SENDGRID_API_KEY,
  SENDGRID_TO_EMAIL,
  SENDGRID_FROM_EMAIL
} = process.env

exports.handler = async function (event) {
  const { name, email, message } = JSON.parse(event.body)
  client.setApiKey(SENDGRID_API_KEY)

  const data = {
    to: SENDGRID_TO_EMAIL,
    from: SENDGRID_FROM_EMAIL,
    subject: `Nuovo messaggio da ${name} (${email})`,
    html: message
  }

  try {
    await client.send(data)
    return {
      statusCode: 200
    }
  } catch (err) {
    return {
      statusCode: err.code,
      body: JSON.stringify({ msg: err.message })
    }
  }
}
