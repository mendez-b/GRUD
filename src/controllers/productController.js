

import * as productModel from '../models/productModels.js';

export const getAllproducts = async (req, res)=>{
    try{
        const products = await productModel.getProducts() 
        console.log(products);
        res.status(201).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export const getProductsById = async (req, res)=>{
    try {
        const productId = req.params.id;
        const product = await getProductsById(productId);
        if(product){
            res.status(201).json(product)
        }else{
            res.status(404).json({ message:'Productos no existe'})
        }
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

//crear un nuevo producto
export const createNewProduct = async (req, res) => {
    try {
        const { name , price , description } = req.body;
        if (!name || !price || !description ) {
            return res.status(400).json({ message: "Faltan Datos" });
        
        }
        const productId = await productModel.createProduct({name, price, description});
        res.status(201).json({ id: productId, name, price, description });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }   
}

//actualizar un producto existente
export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name , price, description } = req.body;
        //
        await productModel.updateProduct(productId, { name, price, description});
        res.status(200).json({ message: 'Producto actualizado correctamente'});
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//eliminar un producto
export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await productModel.deleteProduct(productId);
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
