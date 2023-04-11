import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    const { method, body, query } = req;

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    const profile = db.collection("profile");

    const existingProfile = await profile.findOne({ email: body.email });
    switch (method) {
        case "POST":

            if (existingProfile) {
                return res.status(404).json({ message: "Este email ya está registrado" });
            }

            const newProfile = {
                email: body.email,
                age: body.age,
                weight: body.weight,
                height: body.height,
                imc: body.imc,
                disease: body.disease,
                regimen: body.regimen,
                sedentary: body.sedentary
            };

            console.log("ESTA AQUI");
            const answer = await profile.insertOne(newProfile);
            res.status(201).json({ message: "Se añadio el perfil " });

            //console.log(answer);
            break;


        case "GET":

            if (existingProfile) {
                return res.status(404).json({ message: "Este email no ha sido registrado" });
                
            }
            const profiles = await profile.find({ email: query.email }).toArray();
            res.status(201).json(profiles);

            break;

        case "PUT":
            if (existingProfile) {
                return res.status(409).json({ message: "Este email no ha sido registrado" });
            }

            const editProfile = {
                email: body.email,
                age: body.age,
                weight: body.weight,
                height: body.height,
                imc: body.imc,
                disease: body.disease,
                regimen: body.regimen,
                sedentary: body.sedentary
            };

            //console.log("OTS",query);
            //console.log("Objeto : ",editProfile);
            //const resultado = await events.updateOne({ _id: _ido }, update);
            const resp = await profile.updateOne({ email: query.email }, { $set: editProfile });       // const resp = await profile.updateOne({ email:query.email},);
            res.status(200).json({ message: "El perfil se actualizó correctamente" });
            //console.log(resp);

            break;

    }
}