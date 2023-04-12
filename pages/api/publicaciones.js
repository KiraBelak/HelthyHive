import {MongoClient} from "mongodb"
import { ObjectId } from "mongodb";


export default async function handler (req, res){
    const {method, body, query} = req;
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const events = db.collection("publi");
    switch (method){
             //crear una publicacion nueva para el usuario especificado y la fecha y hora actual
        case "POST":
            console.log(body);
            const {owner,title,txt,tiempo,name,img} = body;
            const result = await events.insertOne({
                owner,
                title,
                txt,
                tiempo,
                name,
                img
            });
            res.status(200).json(result);
            break;
        //obtener todas las publicaciones de todos los usuarios
        case "GET":
            const result2 = await events.find().toArray();
            res.status(200).json(result2);
            break;
        //obtener todas las publicaciones de un usuario especifico
        case "PUT":
            const {owner2} = body;
            const result3 = await events.find({owner:owner2}).toArray();
            res.status(200).json(result3);
            break;
        //eliminar una publicacion especifica
        case "DELETE":
            const {id} = query;
            const result4 = await events.deleteOne({_id: ObjectId(id)});
            res.status(200).json(result4);
            break;
        default:
            res.status(400).json({message: "No se pudo realizar la operacion"});
            break;
        }
}
