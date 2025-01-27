const {google}=require("googleapis");


const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID;
const GOOGLE_SECRET_ID=process.env.GOOGLE_SECRET_ID;
exports.oauth2client=new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_SECRET_ID,
    'postmessage'
)
