import mongoose from "mongoose";
const Schema= mongoose.Schema;

const estudiantesCollection='estudiantes'

const estudiantesSchema= new Schema({
    nombre:{type:String,
        unique:[true,"Ese nombre ya existe,elija otro"],
        require:[true,"Campo obligatorio"],
        trim:true,
        index:true,
    },
    apellido:{type:String, require:[true,"Campo obligatorio"]},
    edad:{type:Number,require:true},
    dni:{type:String,require:true,unique:true},
    curso:{type:String,require:true},
    nota:{type:Number,require:true}
});



const estudiantes= new mongoose.model(estudiantesCollection, estudiantesSchema);

export default estudiantes;

/*userSchema.pre('save',async function (next){
    if (this.password){
        const hash= await bcrypt.hash(this.password,rounds);
        this.password= hash;
    }
    next();
})

const User=mongoose.model("User",userSchema)
export default User;*/