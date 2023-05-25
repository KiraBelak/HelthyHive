import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { method, body, query } = req;
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const dietas= db.collection("dietas");
    switch (method) {
        case "GET":
            //obtener todos los contratos por mail
            {const {email} = query;
            const dieta = await dietas.find({email:email}).toArray();
            // console.log('contrato', contrato);
            res.status(200).json({ dieta: dieta });}
            break;
        case "POST":
            //crear una dieta
            console.log('body', body);
            const date = new Date();
            const newDieta = {
                ...body,
                createdAt: date,
                updatedAt: date,
            };
            const result = await dietas.insertOne(newDieta);
            res.status(201).json({ message: "Dieta creada", dieta: result.ops });
            break;
    }
    client.close();
}

