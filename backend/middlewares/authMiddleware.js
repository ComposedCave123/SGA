const jwt = require("jsonwebtoken")

const verificarToken = (req, res, next) => { // Middleware para verificar el token JWT
    try {
        const authHeader = req.headers.authorization // Obtener el encabezado de autorización
        if (!authHeader || !authHeader.startsWith("Bearer ")) { // Verificar si el encabezado existe y tiene el formato correcto
            return res.status(401).json({
                mensaje: "Acceso no autorizado"
            })
        }
        const token = authHeader.split(" ")[1] // Extraer el token del encabezado

        const usuario = jwt.verify( // Verificar el token usando la clave secreta
            token,
            process.env.JWT_SECRET
        )
        req.usuario = usuario // Guardar la información del usuario en la solicitud para usarla en los controladores
        next()
    } catch (error) {
        return res.status(401).json({
            mensaje: "Token inválido o expirado"
        })
    }
}

module.exports = { verificarToken }