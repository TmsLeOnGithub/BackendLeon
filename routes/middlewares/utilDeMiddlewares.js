const checkAuthentication= (req,res,next)=>{
    if(req.isAuthenticated()) return next();
    res.redirect('/session/login');
};

export default checkAuthentication;