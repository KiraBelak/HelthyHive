/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition, Menu } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import DefAvatar from "../users/avatar";

//HEADER SETUP
const logoUrl = "/logo.png";
const navigation = {
  categories: [],
  pages: [{ name: "Creadores", href: "/owners" }],
};

const Header = () => {
  const { data: session } = useSession();
  //this is the random avatar generator

  console.log(session);
  return (
    <Popover className="relative bg-salud-primary">
      <div
        className="absolute inset-0 shadow z-20 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative h-[150px] z-20">
        {/* DESKTOP */}
        <div className="max-w-7xl mx-auto flex justify-around items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
          {session ? (
            <>
              <DefAvatar
                nombre={session.user.name}
                image={
                  session.user.image
                    ? session.user.image
                    : `https://avatars.dicebear.com/api/micah/${session.user.email}.svg?background=%23ffffff`
                }
              />
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-extrabold text-salud-white mb-4" style={{ fontFamily: "Roboto" }}>
                  Hola {session.user.name ? session.user.name : "sin nombre"}!
                </h2>
                <h2 className="text-lg font-bold text-salud-white" style={{ fontFamily: "Roboto" }}>
                  Puedes obtener estrellas
                </h2>
              </div>


              <Link href="/">
                <a className="absolute left-4 top-4 p-2 bg-white rounded-full shadow-md">

                  <svg
                    className="h-6 w-6 text-salud-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/signin">
                <a>
                  <DefAvatar invitado />
                </a>
              </Link>
              <div className="flex justify-center items-center">
                <h2
                  className="text-2xl font-extrabold text-salud-white"
                  style={{ fontFamily: "Roboto" }}
                >
                  Hola Invitado!
                </h2>
                <Link href="/auth/signin">
                  <a
                    className="text-xl stroke-black hover:text-salud-accent2 text-salud-accent2 mt-16 absolute font-bold"
                    style={{ fontFamily: "Roboto" }}
                  >
                    Inicia sesión
                  </a>
                </Link>
                {/* <h2 className="mt-16 absolute" style={{fontFamily:'Roboto'}} > Puedes obtener estrellas</h2>
                <h2 className="mt-28 absolute" style={{fontFamily:'Roboto'}} > y canjearlas por productos</h2> */}
              </div>
            </>
          )}

        </div>
      </div>
    </Popover>
  );
};

export default Header;

// <Menu as="div" className="ml-3 relative">
//   <div>
//     <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-offset-2  focus:ring-white">
//       <span className="sr-only">Open user menu</span>
//       {session.user.image ? (
//         <img
//           className="h-8 w-8 rounded-full"
//           src={session.user.image}
//           alt=""
//         />
//       ) : (
//         <img
//           className="h-8 w-8 rounded-full"
//           src={`https://avatars.dicebear.com/api/micah/${session.user.email}.svg?background=%23ffffff`}
//           alt=""
//         />
//       )}
//     </Menu.Button>
//   </div>
//   <Transition
//     as={Fragment}
//     enter="transition ease-out duration-100"
//     enterFrom="transform opacity-0 scale-95"
//     enterTo="transform opacity-100 scale-100"
//     leave="transition ease-in duration-75"
//     leaveFrom="transform opacity-100 scale-100"
//     leaveTo="transform opacity-0 scale-95"
//   >
//     <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40">
//       <Menu.Item>
//         {({ active }) => (
//           <Link href="/user/profile">
//             <a
//               className={classNames(
//                 active ? "bg-gray-100" : "",
//                 "block px-4 py-2 text-sm text-white"
//               )}
//             >
//               Mi Cuenta
//             </a>
//           </Link>
//         )}
//       </Menu.Item>

//       {session.user.roles.includes("admin") && (
//         <Menu.Item>
//           {({ active }) => (
//             <Link href="/admin/dashboard">
//               <a
//                 className={classNames(
//                   active ? "bg-gray-100" : "",
//                   "block px-4 py-2 text-sm text-gray-700"
//                 )}
//               >
//                 Admin Dashboard
//               </a>
//             </Link>
//           )}
//         </Menu.Item>
//       )}

//       <Menu.Item>
//         {({ active }) => (
//           <div
//             className={classNames(
//               active ? "bg-gray-100" : "",
//               "block px-4 py-2 text-sm text-white cursor-pointer"
//             )}
//             onClick={() => signOut()}
//           >
//             Salir
//           </div>
//         )}
//       </Menu.Item>
//     </Menu.Items>
//   </Transition>
// </Menu>
