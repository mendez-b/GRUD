// models/suthmodel/js
import { dbConfig } from '../config/db.config.js'
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

const pool = mysql.createPool(dbConfig);

// esta es la funcion para registrar los usuarios
export const registerUser = async(userData) => {
    const { username, email, password} = userData
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO user (username, email, password) values (?,?,?)', [username, email, hashedPassword]);
};

// funcion para inicio de sesion
export const loginUser = async (email, password) => {
    const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
    //if(rows.leght === 0)
    if (!rows.length){
        throw new Error('Contraseña Incorrecta');
    }

    return user;
}