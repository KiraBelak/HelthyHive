import MainLayout from "@/components/layouts/MainLayout";
import clientPromise from "@/lib/mongodb";
import OfflineButton from "@/components/common/OfflineButton";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faRunning, faBullseye, faHeartbeat, faUsersCog, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Post from "../components/Post";
import Carousel from "../components/carousel";
import "material-icons/iconfont/material-icons.css";





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


  return (
    <MainLayout>
      <div >
        <div className="flex justify-center space-x-4 mt-2">
   <Carousel />


        </div>
        <br></br>
        <Post ></Post>
        <br></br>
        <OfflineButton />

      </div>
    </MainLayout>
  );
}
