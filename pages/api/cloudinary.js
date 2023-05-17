import getCloudinary from "@/config/cloudinary";

export default async function handler(req, res) {
    const { method, body, query } = req;
    const cloudinary = getCloudinary();

    switch (method) {
        case "POST":
            console.log("picado")
            //el blob de la imagen 
            //guardar la imagen en cloudinary
            //generar un id para la imagen
            // const id = Math.random().toString(36).substr(2, 9);
           //subir el blob a cloudinary
            const result = await cloudinary.uploader.upload(body.dataUri, {
                upload_preset: "fotos",
            })
            console.log("result", result);

            res.status(200).json(message="ok", result);
            break;
        default:
            res.status(400).end("Method not allowed");
    }  
}
