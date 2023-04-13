import MainLayout from "@/components/layouts/MainLayout";
import clientPromise from "@/lib/mongodb";
import OfflineButton from "@/components/common/OfflineButton";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faReceipt, faCamera, faBasketball, faUser } from '@fortawesome/free-solid-svg-icons';
import Post from "../components/Post";
import Carousel from "../components/carousel";
import "material-icons/iconfont/material-icons.css";
import { useState } from 'react';
import ProgressBarWithTitle from "../components/reto";
import CheckboxList from "../components/lista_reto";

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
    const [abre, setAbre] = useState(true);
    const menu = [{
        title: 'Feed',
        icon: faMagnifyingGlass,
        link: ""
    },
    {
        title: 'Foro',
        icon: faReceipt,
        link: ""
    },
    {
        title: 'Tomar foto',
        icon: faCamera,
        link: ""
    },
    {
        title: 'Retos',
        icon: faBasketball,
        link: "/reto"
    },
    {
        title: 'Perfil',
        icon: faUser,
        link: "/user/profile"
    },
    ]

    const handleOpen = () => {
        setAbre(!abre);
    };


    return (
        <MainLayout>
            {abre ? (
                <div onClick={handleOpen} className="flex min-h-[15px] justify-center bg-salud-primary rounded-b-3xl space-x-4 text-white">
                    <svg width="24" className="w-1/6" height="50" viewBox="0 0 24 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0001 12.17C11.3431 12.1712 10.6922 12.0429 10.0848 11.7923C9.4774 11.5418 8.92531 11.174 8.46012 10.71L0.290124 2.54002C0.101821 2.35172 -0.00396729 2.09632 -0.00396729 1.83002C-0.00396729 1.56372 0.101821 1.30832 0.290124 1.12002C0.478428 0.931716 0.733823 0.825928 1.00012 0.825928C1.26643 0.825928 1.52182 0.931716 1.71012 1.12002L9.88012 9.29002C10.4426 9.85182 11.2051 10.1674 12.0001 10.1674C12.7951 10.1674 13.5576 9.85182 14.1201 9.29002L22.2901 1.12002C22.4784 0.931716 22.7338 0.825928 23.0001 0.825928C23.2664 0.825928 23.5218 0.931716 23.7101 1.12002C23.8984 1.30832 24.0042 1.56372 24.0042 1.83002C24.0042 2.09632 23.8984 2.35172 23.7101 2.54002L15.5401 10.71C15.0749 11.174 14.5228 11.5418 13.9154 11.7923C13.308 12.0429 12.6572 12.1712 12.0001 12.17Z" fill="#fff" />
                    </svg>

                </div>

            ) : (
                <div className="flex justify-center bg-salud-primary rounded-b-3xl space-x-4 text-white">
                    {menu.map((item, index) => {
                        return (
                            <div key={index} className="flex my-2 flex-col items-center space-y-1 text-white cursor-pointer group">
                                <div className="w-12 h-12 my-2 p-1 text-white">
                                    {item.icon === faCamera ? (
                                        <Link href={item.link}>
                                            <a>
                                                <FontAwesomeIcon icon={item.icon} style={{ color: '#E5B54B' }} className="w-full h-full text-gray-500 group-hover:text-blue-500" />
                                            </a>
                                        </Link>
                                    ) : (
                                        <Link href={item.link}>
                                            <a>
                                                <FontAwesomeIcon icon={item.icon} style={{ color: '#fff' }} className="w-full h-full text-gray-500 group-hover:text-blue-500" />
                                            </a>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            )}

            <div >
                <div className="flex justify-center p-4">
                    <div className="w-full max-w-2xl">
                        <ProgressBarWithTitle></ProgressBarWithTitle>
                        <CheckboxList></CheckboxList>
                    </div>
                </div>

                <div className="flex justify-center items-center">

                    <button className="button-link">
                        <Link href="/rewards">
                            Ir a mis recompensas
                        </Link>
                    </button>


                </div>


            </div>
            <OfflineButton />
        </MainLayout>
    );
}
