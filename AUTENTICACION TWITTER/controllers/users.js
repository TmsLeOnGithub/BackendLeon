import {get} from '../models/users.js';

const getUserInfo = (req,res) =>{
    if(req.isAuthenticated()) {
        const { user } = req.session.passport;
        const result = get(user);
        res.render('pages/indexUsers',{info:result});
    } else {
        res.status(401).send("get out!");
    }
}