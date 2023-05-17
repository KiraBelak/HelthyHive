import {MongoClient} from "mongodb"
import { ObjectId } from "mongodb";
import getCloudinary from "@/config/cloudinary";



export default async function handler (req, res){
    const {method, body, query} = req;
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const events = db.collection("publi");
    switch (method){
             //crear una publicacion nueva para el usuario especificado y la fecha y hora actual
        case "POST":
            const {owner,title,txt,tiempo,name} = body;
            console.log("body", body)

            var {img} = body;
            if (!img){
                 img = `https://avatars.dicebear.com/api/micah/${owner}.svg?background=%23ffffff`
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
            }else{
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
            }

           
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
