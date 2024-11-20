import mongoose from "mongoose";
import {createHash} from "../utils.js";

const {Schema} = mongoose;

//Definimos el esquema usuario
const userSchema = new Schema({
    first_name: { type: String, required: true }, // Nombre del usuario
    last_name: { type: String, required: true }, // Apellido del usuario
    email: { type: String, required: true, unique: true }, // Correo electrónico del usuario (único)
    age: { type: Number, required: true, unique: true }, //Edad del usuario
    password: { type: String, required: true }, // Contraseña del usuario. Lo hashea en el Middleware  de abajo 
    cart: { type: Number, required: true, unique: true }, //ID del cart. Por ahora lo dejo solo como numer
    role: { type: String, default: 'user' }, // Rol del usuario (por defecto, 'user')
});

//Middleware para hashear la contraseña antes de guardar el usuario. 
// Aca se hace un  Middleware, que antes de salvar hace un hash
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next(); //Si la contraseña no se ha modificado, no se hashea, continua sin hacer nada
    this.password = createHash(this.password); //Hashear la contraseña
    next();
})

const UserModel = mongoose.model('User',userSchema);

export default UserModel;



//cart:Id con referencia a Carts-----> Me falta esta parte, por lo que entiendo debe haber un>
/*
Model de cart
una referencia, como se hacia en Back 01
*/
