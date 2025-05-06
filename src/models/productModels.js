//models/producModel.js
//creacion modelo producto


import {dbConfig} from '../config/db.config.js'
import mysql from 'mysql2/promise';

const pool = mysql.createPool(dbConfig);

//Obtener todos los productos

export const getProducts = async () =>{
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
};

export const getProductsById = async(productId) => {
    const [rows] = await pool.query('SELECT products WHERE id=?',[productId]);
    return rows[0];
}

export const createProduct = async (productData) => {
    const {name, price, description } = productData;
    const [result] = await pool.query('INSERT INTO products(name, price, description) VALUES (?,?,?)',
        [name,price,description]);
    return result.insertId;
}

export const updateProduct = async (productId, productData) =>{
    const {name, price, descripcion } = productData;
    await pool.query('UPDATE products SET name = ?, price = ?, description = ? WHERE Id'
        [name, price, descrition, productId]);
};

export const deleteProduct = async (productId) => {
    await pool.query('DELETE FROM products WHERE id = ?'[productId])

}