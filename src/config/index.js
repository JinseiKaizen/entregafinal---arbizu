require('dotenv').config();
const config = {
    port: process.env.PORT,
    cookie_key: process.env.COOKIE_KEY,
    session_key: process.env.SESSION_KEY,
    jwt_secret: process.env.JWT_SECRET,
    jwt_algorithm: process.env.HS256,
    persistence: process.env.PERSISTENCIA,
    nodemailer_user: process.env.NODE_MAILER_USER,
    nodemailer_pass: process.env.NODE_MAILER_PASSWORD,
    twilio_sid: process.env.TWILIO_ACC_SID,
    twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
    twilio_phone_number: '+542314489197',
    dns_frontend: process.env.DNS_FRONTEND,
}

const mongo = {
    mongo_local: process.env.MONGO_LOCAL,
    mongo_atlas: process.env.MONGO_ATLAS
  }
  
  module.exports = { config, mongo };