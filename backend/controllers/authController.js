const Usuario = require("../models/Usuario")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                mensaje: "Debés ingresar email y contraseña"
            })
        }
        const usuario = await Usuario
        .findOne({ email: email.trim().toLowerCase()})
        .select("+password")

        if (!usuario) {
            return res.status(401).json({
                mensaje: "Email o contraseña incorrectos"
            })
        }
        const coincide = await bcrypt.compare(
            password, usuario.password
        )

        if (!coincide) {
            return res.status(401).json({
                mensaje: "Email o contraseña incorrectos"
            })
        }

        const token = jwt.sign({ // Generar un token JWT con la información del usuario
            id: usuario._id,
            rol: usuario.rol
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "2h"
        }
    )
        return res.status(200).json({ // Devolver el token y la información del usuario al cliente
            mensaje: "Login correcto",
            token,
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        })
    } catch (error) {
        console.error("Error en login: ", error)
        return res.status(500).json({
            mensaje: "Error interno del servidor"
        })
    }
}

module.exports = { login }