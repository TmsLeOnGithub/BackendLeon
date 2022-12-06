export const authUIMiddleware = (req, res, next) => {
	if(req.session?.nombre) {
		next()
	}else {
	    res.render('login')
	}
}