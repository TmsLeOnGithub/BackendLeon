import { add, get } from '../models/users.js'
import { config } from "dotenv";
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as TwitterStrategy } from "passport-twitter";
import config from '../CONFIG/config.js'

passport.use ('login', new LocalStrategy ({
    passReqToCallback:true,
},function(req,username,password,next){
    let user=get(username);

    if(user && user.username === username &&user.password){
        return next(null,user);
    }else{
        return next (null,false);
    }
})
);

passport.use('registrer', new LocalStrategy({
    passReqToCallback:true,
},function(req,username,password,next){
    let usuario=get(username);
    if(usuario) return(null,false);

    const { address } = req.body;
    let user = add(username,password,address);
    return next (null,user);
}));

passport.use('loginTwitter', new TwitterStrategy({
    consumerKey: config.twitter.APIKEY,
    secretKey: config.twitter.APISECRETKEY,
    callbackURL: "http://localhost:8000/auth/twitter/callback"
}, function (token,tokenSecret,profile,next){
    //console.log(profile);
    const user = add(profile.username,profile.id,profile.provider);
    return next(null,user);
}))

passport.serializeUser(function(user,next){
    console.log(user);
    next(null,user.username);
});

passport.deserializeUser(function(username,next){
    console.log(username);
    let usuario=get(username);
    next(null,usuario)
});