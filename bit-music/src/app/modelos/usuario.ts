export class Usuario{
    constructor(
        public nombre: String,
        public edad: Number,
        public correo: String,
        public password: String,
        public role:String,
        public imagen?:String,
        public _id?: String,
    ){}

}