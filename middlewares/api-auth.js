export const authApiMiddleware = (req, res, next) => {
    console.log("la session", req.session.passport)
    if (req.session?.passport?.user) {
        console.log('entro');
        return next();
    } else {
        return res.status(401).send('error de autorizacion')
    }
}