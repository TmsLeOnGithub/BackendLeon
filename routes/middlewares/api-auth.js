export const authApiMiddleware = (req, res, next) => {
    if (req.session?.passport?.user) {
        return next();
    } else {
        return res.status(401).send('error de autorizacion')
    }
}