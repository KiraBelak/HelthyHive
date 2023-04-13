import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    const { method, body, query } = req;

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    const reward = db.collection("reward");

    
    switch (method) {
        case "POST":
            const newReward = {
                title:body.title,
                description:body.description,
                img:body.img
            };

            console.log("ESTA AQUI");
            const answer = await reward.insertOne(newReward);
            res.status(201).json({ message: "Se añadio el perfil " });
            break;


        case "GET":
            const rewards = await reward.find({}).toArray();
            res.status(201).json(rewards);
            break;

        case "PUT":
            
            const editReward = {
                title:body.title,
                description:body.description,
                img:body.img
            };

            //console.log("OTS",query);
            //console.log("Objeto : ",editProfile);
            //const resultado = await events.updateOne({ _id: _ido }, update);
            const resp = await reward.updateOne({_id:_ido}, { $set: editReward });       // const resp = await profile.updateOne({ email:query.email},);
            res.status(200).json({ message: "La recompensa se actualizó correctamente" });
            //console.log(resp);

            break;

    }
}