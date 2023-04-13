import AccountLayout from "@/components/layouts/AccountLayout";
import LoadingCircle from "@/components/common/LoadingCircle";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Table from "../../components/table_perfil";

const FormProfilePage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [userImageSrc, setUserImageSrc] = useState("");
    const { data: session } = useSession();
    const router = useRouter();

    //get access token from session
    useEffect(() => {
        async function getAccessToken() {
            if (session && session.user) {
                //get user data from db
                setIsInitialLoading(true);
                const { data } = await axios.get(`/api/users/${session.user.id}`);

                //set image src if exists
                data.image ? setUserImageSrc(data.image) : setUserImageSrc("");

                setValue("age", data.age);
                setValue("height", data.height);
                setValue("weight", data.weight);
                setIsInitialLoading(false);
            }
        }

        getAccessToken();
    }, [session, setValue]);

    const handleUserImagePreview = async (e) => {
        //set user profile photo preview
        const reader = new FileReader();
        reader.onload = function (onLoadEvent) {
            setUserImageSrc(onLoadEvent.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const submitHandler = async (data) => {
        // update profile info here
        setIsLoading(true);

        try {
            //parse info to formdata to send to server
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                //append images
                if (key === "userImage") {
                    if (data[key][0]) formData.append(key, data[key][0]); //append image file to formData
                } else {
                    formData.append(key, data[key]); //append regular keys to form data
                }
            });

            //save change of fields in database
            await axios.put(`/api/users/${session.user.id}`, formData, {
                headers: {
                    accept: "application/json",
                    "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                },
            });

            //Refresh page
            router.reload(window.location.pathname);

            toast.success("Profile updated successfully");
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong updating your profile");
        }

        setIsLoading(false);
    };

    return (

        <div className="w-full flex justify-center">
            <div className="relative bg-white w-full">

                <h3 className="text-4xl font-bold text-center text-gray-800 mt-4">
                    Mi información
                </h3>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="shadow sm:rounded-md sm:overflow-hidden">

                        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="nombre"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Nombre completo
                                </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    id="nombre"
                                    readOnly // añadir el atributo readOnly para hacer el campo de sólo lectura
                                    placeholder="Josue G"
                                    autoComplete="nombre"
                                    {...register("nombre", {
                                        required: "nombre es requerido",
                                    })}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                                {errors.height && (
                                    <p className="text-red-500 text-xs italic">
                                        {errors.height.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    readOnly // añadir el atributo readOnly para hacer el campo de sólo lectura
                                    placeholder="josue@prueba.com"
                                    autoComplete="email"
                                    {...register("email", {
                                        required: "email es requerido",
                                    })}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                                {errors.weight && (
                                    <p className="text-red-500 text-xs italic">
                                        {errors.weight.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Telefono
                                </label>
                                <input
                                    type="number"
                                    name="phone"
                                    id="phone"
                                    autoComplete="phone"
                                    {...register("phone", {
                                        required: "Telefono es requerido",
                                    })}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    readOnly // añadir el atributo readOnly para hacer el campo de sólo lectura
                                    placeholder="4446668888"
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-xs italic">{errors.phone.message}</p>
                                )}
                            </div>

                        </div>
                        <h3 className="text-4xl font-bold text-center text-gray-800 mt-4">
                            Datos
                        </h3>
                        <div className="grid grid-cols-6 gap-6 px-4 py-5 bg-white sm:p-6">

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="edad"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Edad
                                </label>
                                <input
                                    type="number"
                                    name="edad"
                                    id="edad"
                                    readOnly // añadir el atributo readOnly para hacer el campo de sólo lectura
                                    placeholder="24"
                                    autoComplete="edad"
                                    {...register("edad", {
                                        required: "edad es requerida",
                                    })}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                                {errors.height && (
                                    <p className="text-red-500 text-xs italic">
                                        {errors.height.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="weight"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Peso
                                </label>
                                <input
                                    type="text"
                                    name="weight"
                                    id="weight"
                                    readOnly // añadir el atributo readOnly para hacer el campo de sólo lectura
                                    placeholder="72 kg"
                                    autoComplete="weight"
                                    {...register("weight", {
                                        required: "Peso es requerido",
                                    })}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                                {errors.weight && (
                                    <p className="text-red-500 text-xs italic">
                                        {errors.weight.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-6 px-4 py-5 bg-white sm:p-6">

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="height"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Altura
                                </label>
                                <input
                                    type="number"
                                    name="height"
                                    id="height"
                                    readOnly // añadir el atributo readOnly para hacer el campo de sólo lectura
                                    placeholder="1.80m"
                                    autoComplete="height"
                                    {...register("height", {
                                        required: "Altura es requerida",
                                    })}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                                {errors.height && (
                                    <p className="text-red-500 text-xs italic">
                                        {errors.height.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="imc"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    IMC
                                </label>
                                <input
                                    type="text"
                                    name="imc"
                                    id="imc"
                                    readOnly // añadir el atributo readOnly para hacer el campo de sólo lectura
                                    placeholder="Fuertote"
                                    autoComplete="imc"
                                    {...register("imc", {
                                        required: "imc es requerido",
                                    })}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                                {errors.weight && (
                                    <p className="text-red-500 text-xs italic">
                                        {errors.weight.message}
                                    </p>
                                )}
                            </div>
                        </div>






                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                          
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default FormProfilePage;




