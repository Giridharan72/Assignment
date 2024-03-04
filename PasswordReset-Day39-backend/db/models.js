import mongoose from "mongoose";

export const loginSchema = mongoose.Schema({
    loginId: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
  });
  
  export const loginModel = mongoose.model("logins", loginSchema);
  
  
  export const registerSchema = mongoose.Schema({
    registerId: {
      type: "string",
      required: true,
    },
    userName : {
      type : 'string',
      required : true,
    },
    email: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
  });
  
  export const registerModel = mongoose.model("registers", registerSchema);


  export const urlShortenerSchema = mongoose.Schema({
    urlId : {
      type : 'string',
      required : true
    },
    longUrl : {
      type : 'string',
      required : true
    },
    shortUrl : {
      type : 'string',
      required : true
    },
    visited : {
      type : 'array',
      required : true
    }
  })

  export const urlShortenerModel = mongoose.model('urls', urlShortenerSchema);