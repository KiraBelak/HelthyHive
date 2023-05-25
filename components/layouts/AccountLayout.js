import Link from "next/link";
import Head from "next/head";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import NoAccessErrorPage from "@/components/errors/NoAccessErrorPage";
import LoadingCircle from "@/components/common/LoadingCircle";
import { CogIcon, HeartIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import classNames from "@/utils/classNames";
import { faPeopleLine } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

const AccountLayout = ({ title, children, ...props }) => {
  const [profile , setProfile] = useState(false);//[age, setAge] = useState(0);
  const router = useRouter();
  const { status } = useSession();
  const {data:session}=useSession();
  useEffect(() => {
    if (session) {
        //hacer un get para traer los datos del perfil
        //si no existe el perfil, entonces se omite el get
        //si existe el perfil, entonces se hace un set de los datos del perfil
        const getProfile = async () => {
            const answ = await axios.get("/api/profile", { params: { email: session.user.email } });
            console.log(answ.data);
            if (answ.data.length > 0) {
              setProfile(true);
            }else
            {
              setProfile(null);
            }
        }
        getProfile();
    }
}, [session]);





  const navigation = [

    {
      name: "Mi perfil",
      href: "/user/MyProfile",
      icon: HeartIcon,
      current: false,
    },
    {
      name: "Información de la cuenta",
      href: "/user/info",
      icon: HeartIcon,
      current: false,
    },
    {
      name: "Mis recompensas",
      href: "/rewards",
      icon: HeartIcon,
      current: false,
    },

    {
      name: "Configuración",
      href: "/user/profile",
      icon: CogIcon,
      current: false,
    },


  ];

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingCircle color="#000000" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <NoAccessErrorPage />;
  }

  return (
    <>
      <Head>
        <title>{title ? `Mi Cuenta | ${title}` : "Mi Cuenta"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-full h-full">
        <div className="flex flex-col w-full bg-gray-100 " {...props}>
          <Header />
          {!(profile===null) ? null : <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
            <p className="font-bold">¡Atención!</p>
            <p>Para poder acceder a todas las funcionalidades de la plataforma, es necesario que completes tu perfil.</p>
            <Link href="/profiledata">
              <a className="text-yellow-700 underline">Completar perfil</a>
            </Link>
            </div>
              }
          <div className="w-full max-w-7xl  mx-auto  ">
            <div className="max-w-7xl w-full py-6 sm:px-6  ">
              <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
                  <div className="layouttitle  w-full flex items-center justify-start pb-2">
                    <p className="font-bold">Mi Cuenta</p>
                  </div>
                  
                  <nav className="space-y-1">
                    {navigation.map((item) => {
                      if (item.href === router.pathname) {
                        item.current = true;
                      }
                      return (
                        <Link key={item.name} href={item.href}>
                          <a
                            className={classNames(
                              item.current
                                ? "bg-gray-50 text-indigo-700 hover:text-indigo-700 hover:bg-white"
                                : "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
                              "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-indigo-500 group-hover:text-indigo-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            <span className="truncate">{item.name}</span>
                          </a>
                        </Link>
                      );
                    })}
                  </nav>
                </aside>
               

                <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
                  {children}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AccountLayout;
