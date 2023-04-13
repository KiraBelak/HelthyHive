import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    const { method, body, query } = req;

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    const challenge = db.collection("challenge");

    //const existingChallenge = await profile.findOne({ email: body.email });
    switch (method) {
        case "POST":

            const newChallenge = {
                title:body.title,
                subtitle:body.subtitle,
                description:body.description,
                status:body.status,
                tasks:body.tasks
            };

            console.log("ESTA AQUI");
            const answer = await challenge.insertOne(newChallenge);
            res.status(201).json({ message: "Se añadio el desafio " });

            console.log(answer);
            break;


        case "GET":

        /*
            if (existingProfile) {
                return res.status(404).json({ message: "Este email no ha sido registrado" });
                
            }
            */
            const challenges = await challenge.find({}).toArray();
            console.log(challenges);
            res.status(201).json(challenges);

            break;

        case "PUT":
            /*
            if (existingProfile) {
                return res.status(409).json({ message: "Este email no ha sido registrado" });
            }
            */

            const editChallenge = {
                title:body.title,
                subtitle:body.subtitle,
                description:body.description,
                status:body.status,
                tasks:body.tasks
            };

            //console.log("OTS",query);
            //console.log("Objeto : ",editProfile);
            //const resultado = await events.updateOne({ _id: _ido }, update);
            const resp = await challenge.updateOne({ }, { $set: editChallenge });       // const resp = await profile.updateOne({ email:query.email},);
            res.status(200).json({ message: "El desafio se actualizó correctamente" });
            //console.log(resp);

            break;

    }
}