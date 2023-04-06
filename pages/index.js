import MainLayout from "@/components/layouts/MainLayout";
import clientPromise from "@/lib/mongodb";
import OfflineButton from "@/components/common/OfflineButton";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faRunning, faBullseye, faHeartbeat, faUsersCog, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

//SERVER EXAMPLE OF MONGODB CONNECTION
export async function getServerSideProps(context) {
  try {
    // client.db() will be the default database passed in the MONGODB_URI
    // You can change the database by calling the client.db() function and specifying a database like:
    // const db = client.db("myDatabase");
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    // hola bb
    await clientPromise;
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}



export default function Home({ isConnected }) {
  console.log("isConnected", isConnected);
  const beneficios = [
    {
      title: 'Personalización de rutinas',
      description: 'Cree y personalice sus propias rutinas de entrenamiento.',
      icon: faUsers,
      imageAlt: 'Icono de personalización'
    },
    {
      title: 'Seguimiento del progreso',
      description: 'Haga un seguimiento de su progreso a lo largo del tiempo.',
      icon: faRunning,
      imageAlt: 'Icono de seguimiento'
    },
    {
      title: 'Planificación de objetivos',
      description: 'Establezca objetivos realistas y específicos.',
      icon: faBullseye,
      imageAlt: 'Icono de planificación'
    },
    {
      title: 'Monitorización de la salud',
      description: 'Realice un seguimiento de su salud y estado físico.',
      icon: faHeartbeat,
      imageAlt: 'Icono de monitorización'
    },
    {
      title: 'Comunidad',
      description: 'Conecte con otros usuarios a través de redes sociales y chats.',
      icon: faUsersCog,
      imageAlt: 'Icono de comunidad'
    },
    {
      title: 'Facilidad de uso',
      description: 'Diseñado para ser fácil de usar y accesible para todos los usuarios.',
      icon: faThumbsUp,
      imageAlt: 'Icono de facilidad de uso'
    }
  ];

  return (
    <MainLayout>
          <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-6 sm:px-2 text-center text-white">
        
        <h1 className="text-4xl font-bold sm:text-6xl">
          Bienvenido a nuestra plataforma de entrenamiento
        </h1>
        <p className="mt-3 text-lg sm:text-xl">
          Maximiza tus entrenamientos y alcanza tus objetivos con nuestra aplicación.
        </p>
        <div className="flex flex-wrap items-center justify-center mt-10">
        {beneficios.map((beneficio) => (
    <div key={beneficio.title} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-6">
      <div className="flex items-center justify-center h-32">
        <FontAwesomeIcon icon={beneficio.icon} size="3x" />
      </div>
      <h3 className="mt-4 text-lg font-medium">{beneficio.title}</h3>
      <p className="mt-2 text-md">{beneficio.description}</p>
    </div>
))}

        </div>
        <div className="mt-10">
          <Link href="/registro">
            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Regístrate ahora
            </a>
          </Link>
        </div>
      </main>
    </div>
       <OfflineButton />
    </MainLayout>
  );
}
