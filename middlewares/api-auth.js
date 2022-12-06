export const authApiMiddleware = (req, res, next) => {
    if (req.session?.nombre) {
        return next();
    } else {
        return res.status(401).send('error de autorizacion')
    }
}