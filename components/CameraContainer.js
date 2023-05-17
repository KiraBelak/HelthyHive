import React, { useState, useEffect, useRef } from 'react';
import CameraPage from './Camera';
import Camarita from './Camarita';
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { stringify } from 'querystring';
import { useRouter } from 'next/router';





const CameraContainer = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedImage2, setCapturedImage2] = useState(null);
  const { data: session } = useSession();
  const [fotos, setFotos] = useState([]);
  const cameraRef = useRef(null);
  const imgRef = useRef(null);
  const [imageBuffer, setImageBuffer] = useState(null);
  const [imageBuffer2, setImageBuffer2] = useState(null);
  const [url1, setUrl1] = useState(null);
  const router = useRouter();

  //hacewr un get para traer las publicaciones
  
  useEffect(() => {
    console.log("useEffect")
    console.log("fotos", fotos)
  }, [fotos]);

    //funcion asincrona para mandar la foto a la api
    async function toma(dataUri, camara) {
      console.log("toma")
      //cambiar el dataUri a un blob
      const blob = await (await fetch(dataUri)).blob();
      //mostrar la imagen en el navegador
      setCapturedImage(URL.createObjectURL(blob));
      //guardar la imagen en el estado
      await takePicture(blob);


      // console.log("dataUri", dataUri)
      // console.log("camara", camara)
      


      // const res = await axios.post('/api/publicaciones',{
      //   dataUri,
      //   camara
      // });
      // console.log('res', res);

    //   const owner = session.user.email;
    //   const tiempo = new Date();
    //   const name = session.user.name;
    //   const img = session.user.image;


 
    // //añade la foto a la lista de fotos
    // setFotos([...fotos, dataUri]);

  

      // crea un objeto FormData para enviar el archivo
     
    
      // envía la solicitud POST con FormData
      // const res = await axios.post('/api/publicaciones',{
      //   owner,
      //   tiempo,
      //   name,
      //   img,
      //   imageBuffer
      // });
    
      // console.log('res', res);
      // toast.success('Foto tomada');
      // router.push('/');
    }
    

    const takePicture = (mario) => {
      console.log("takePicture")
      cameraRef.current.capture()
        .then(blob => {
          imgRef.current.src = URL.createObjectURL(blob);
          imgRef.current.onload = () => { URL.revokeObjectURL(imgRef.current.src);
          console.log("blob", imgRef.current.onload)
          //guardar la imagen en el estado
          setImageBuffer2(blob);
          setCapturedImage2(URL.createObjectURL(blob));
          setImageBuffer(mario);
          console.log("capturedImage", capturedImage)
          }
        })
    }

    //funcion para subir la foto a cloudinary
    const uploadImage = async () => {
      
      const data = new FormData();
      data.append('file', capturedImage);
      //mandar la imagen a cloudinary
      const res = await axios.post('/api/cloudinary', data);
      console.log('res', res);
      //guardar la url de la imagen en el estado
      // setUrl1(res.data.secure_url);

    }
    //publicar la foto
    const publicar = async () => {
    }

 
  


  
  return (
    <div className="relative h-screen">
      <Toaster />
      {imageBuffer ? (
        <section className="h-screen">
        <div className="relative h-full">
  <img src={capturedImage} alt="Captured" className="w-full h-full object-cover"/>
  <img src={capturedImage2} alt="Captured" className="absolute top-0 left-0 w-1/4 h-1/4 object-cover"/>
      <div className='absolute bottom-0'>
      <div className="flex flex-row w-screen box-border justify-around mb-10">
      <button
       className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
       onClick={() => {
         setCapturedImage(null);
         setImageBuffer(null);
       }}
     >
       Cancelar
     </button>
     <button
       className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
       onClick={() => {
        toast.loading("Funcion en construccion");
        //despues de 5 segundos redirecciona a la pagina principal
        setTimeout(() => {
          router.push('/');
        }, 5000);
         // setCapturedImage(null);
         // setImageBuffer(null);
        //  console.log("capturedImage", capturedImage)
        //  console.log("imageBuffer", imageBuffer)
        //  console.log("imageBuffer2", imageBuffer2)
        //  uploadImage();
        // //  const owner = session.user.email;
        //  const tiempo = new Date();
        //  const name = session.user.name;
        //  const img = session.user.image;
        //  const dataUri = capturedImage;
        //  const camara = imageBuffer2;
        //  // const camara = imageBuffer;
       }
       }
     >
       Publicar
     </button>
     </div>
     </div>
</div>
        </section>
      ) : (
        <>
          <section>
            <div className="absolute top-0 right-0">
              <Camarita toma={toma} />
            </div>
            <div className="absolute top-0 left-0 w-1/4 h-1/4">
              <CameraPage  toma={toma} takePicture={takePicture} cameraRef={cameraRef} imgRef={imgRef} />
            </div>
          </section>
      
        </>
      )}
    </div>
  );
};

export default CameraContainer;
