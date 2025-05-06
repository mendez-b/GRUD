//Controller/authController

import bcrypt from 'bcrypt';
import * as authModel from '../models/authModel.js';
import jwt from 'jsonwebtoken';
import validator from 'validator';

// controlador para registar un nuevo usuario
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validación de email
        if(!validator.isEmail(email)){
            return res.status(400).json({ message : 'Formato de email inválido' });
        }

        // Validación de contraseña
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password)) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 1 mayúscula, 1 minúscula, 1 número, 1 carácter especial y mínimo 8 caracteres" });
        }
        

        // Hash de la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        await authModel.registerUser({ username, email, password });
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        return res.status(500).json({ 
            message: 'Error al registrar el usuario', 
            error: error.message 
        });
    }
};

export const loginUser = async (req, res) =>{
    try {
        const { username, email, password} = req.body;

         // validamos el formato del email
        if(!validator.isEmail(email)){
            return res.status(400).json({ message : 'Formato de Correo Invalido'});
        }

        const user = await authModel.loginUser(email, password);

        // generar el token de autentificacion
        const token = jwt.sign({ userId: user.Id, email: user.email }, 'secret_key');
        // asignar el token a una cookie
        res.cookie('token', token, {httpOnly: true });

        res.json({ message: 'Inicio de Sesion Exitoso'})

    } catch (error) {
        return res.status(401).json({ message : error.message});
    }
}