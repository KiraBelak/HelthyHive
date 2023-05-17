/* eslint-disable @next/next/no-img-element */
import AdminLayout from "@/components/layouts/AdminLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingCircle from "@/components/common/LoadingCircle";
import axios from "axios";
import { useRouter } from "next/router";
import { unixToFormat } from "@/utils/dates";
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";


const AdminUsersShowPage = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [user, setUser] = useState(undefined);
  const router = useRouter();
  const [response, setResponse] = useState(null);
  const [response2, setResponse2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [activity, setActivity] = useState("");
  const [goal, setGoal] = useState("");
  const[alergic, setAlergic] = useState("");
  
  useEffect(() => {
    const { id } = router.query;
    async function getUser() {
      setIsInitialLoading(true);
      try {
        const { data } = await axios.get(`/api/admin/users/${id}`);
        setUser(data);
        setFetchError(false);
      } catch (err) {
        setFetchError(true);
      }
      setIsInitialLoading(false);
    }
    getUser();
  }, [router.query]);

//traer de las variables de entorno la api key de openai

  

  const handleGenerate = async () => {
    setLoading(true);
  const prompt = `Genera una dieta para mí durante 2 días. Soy una mujer de 30 años, peso 60 kg, mido 1.60 m, soy sedentaria, quiero perder peso y soy alérgica a la lactosa. Me regresas la dieta en un formato de Json por dia y que sea por dia.`;
  const maxTokens = 1000;
  const temperature = 0.9;
  const topP = 1;

  const n = 1;
 

  const data = {
    prompt,
    maxTokens,
    n,
    temperature,
    topP,
  }
    try {
      toast.loading("Generando dieta...");
      const response = await axios.post(
        `/api/openai`,
        data
      );
      console.log("response", response);
      setResponse(response.data);
      toast.dismiss();
      toast.success("Dieta generada");
    } catch (err) {
      console.log("err", err);
      // setError(err);
    }

   
    setLoading(false);
  };

  const handleGenerate2 = async () => {
    setLoading(true);
    const prompt = `Genera una rutina de ejercicio para mí durante 2 días. Soy una mujer de 30 años, peso 60 kg, mido 1.60 m, soy sedentaria, quiero perder peso. Me regresas la rutina en un formato de Json por dia y que sea por dia.`;
    const maxTokens = 1000;
    const temperature = 0.9;
    const topP = 1;

    const n = 1;

    const data = {
      prompt,
      maxTokens,
      n,
      temperature,
      topP,
    }
    try {
      toast.loading("Generando rutina...");
      const response = await axios.post(
        `/api/openai`,
        data
      );
      console.log("response", response);
      setResponse2(response.data);
      //limpiar el toast
      toast.dismiss();
      toast.success("Rutina generada");
    } catch (err) {
      console.log("err", err);
      // setError(err);
    }
  };

  return (
    <AdminLayout title="Usuarios">
      <Toaster />
      <div className="w-full flex justify-center">
        <div className="relative bg-white w-full ">
          <div>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 space-y-6 ">
                <div className="flex justify-between px-8 w-full items-center ">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Detalle de Usuario
                  </h3>

                  <Link href="/admin/users" passHref>
                    <button
                      type="button"
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Volver a Usuarios
                    </button>
                  </Link>
                </div>
                <div className="flex flex-col px-4">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      {isInitialLoading ? (
                        <div className="py-24">
                          <LoadingCircle color="#000000" />
                        </div>
                      ) : fetchError ? (
                        <div className="py-24 text-center">
                          <p className="bold text-red-500">
                            Ocurrio un error trayendo el usuario 😢
                          </p>
                        </div>
                      ) : user ? (
                        <div className="mx-4 p-2 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg ">
                          <div className="topsectioncontainer flex justify-between items-center">
                            <div className="usertopinfo flex items-center mt-2 mb-4">
                              <div className="flex-shrink-0 h-20 w-20">
                                <img
                                  className="h-20 w-20 rounded-full"
                                  src={
                                    user.image ||
                                    `https://avatars.dicebear.com/api/micah/${user.email}.svg?background=%23ffffff`
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-md font-medium text-gray-900 capitalize">
                                  {user.name ? user.name : "nombre no asignado"}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                            <div className="rolecontainer"></div>
                          </div>
                          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                            <dl className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-3">
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">
                                  Creado en
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {unixToFormat(
                                    user.createdAt,
                                    "dd/mm/yyyy hh:mm aaa"
                                  )}
                                </dd>
                              </div>
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">
                                  Actualizado en
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {unixToFormat(
                                    user.updatedAt,
                                    "dd/mm/yyyy hh:mm aaa"
                                  )}
                                </dd>
                              </div>
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">
                                  Último acceso
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {unixToFormat(
                                    user.lastLogin,
                                    "dd/mm/yyyy hh:mm aaa"
                                  )}
                                </dd>
                              </div>
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">
                                  Roles
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {user.roles.map((role) => (
                                    <span key={role} className="capitalize">
                                      {role}
                                      <br />
                                    </span>
                                  ))}
                                </dd>
                              </div>
                            </dl>
                          </div>
                          <div className="border-t border-gray-400 px-4 py-5 sm:px-6">
                            {/* Boton para dispara handleGenerate */}
                                  <div className="flex flex-col flex-wrap">
                                  <TextField
                              id="filled-basic" variant="filled"
                              label="Edad"
                              type="number"
                              value={age}
                              margin="normal"
                              onChange={(e) => setAge(e.target.value)}
                            />
                            <TextField
                              id="filled-basic" variant="filled"
                              type="number"
                              label="Peso (kg)"
                              value={weight}
                              margin="normal"
                              onChange={(e) => setWeight(e.target.value)}
                            />
                            <TextField
                              id="filled-basic" variant="filled"
                              type="number"
                              label="Altura (cm)"
                              value={height}
                              margin="normal"
                              onChange={(e) => setHeight(e.target.value)}
                            />
                            <FormControl>
  <FormLabel id="demo-controlled-radio-buttons-group">Genero</FormLabel>
  <RadioGroup
    aria-labelledby="demo-controlled-radio-buttons-group"
    name="controlled-radio-buttons-group"
    value={gender}
    onChange={(e) => setGender(e.target.value)}
  >
    <FormControlLabel value="Mujer" control={<Radio />} label="Mujer" />
    <FormControlLabel value="Hombre" control={<Radio />} label="Hombre" />
  </RadioGroup>
</FormControl>
                            


                            <button
                              onClick={handleGenerate}
                              type="button"
                              className="inline-flex items-center mt-2 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
                            >
                              Generar Dieta
                            </button>
                              {/* mostrar texto generado */}
                            <div className="text-sm text-gray-900">
                              {response}
                              </div>

                              <button
                              onClick={handleGenerate2}
                              type="button"
                              className="inline-flex items-center mt-2 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
                            >
                              Generar Rutina
                            </button>
                              {/* mostrar texto generado */}
                            <div className="text-sm text-gray-900">
                              {response2}
                              </div>

                                  </div>

                          </div>
                        </div>
                      ) : (
                        <div className="py-24 text-center">
                          <p className="bold text-red-500">
                            Theres no info about the user 😢
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsersShowPage;
