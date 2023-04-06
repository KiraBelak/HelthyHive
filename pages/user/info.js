import AccountLayout from "@/components/layouts/AccountLayout";
import LoadingCircle from "@/components/common/LoadingCircle";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ProfilePage = () => {
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
    <AccountLayout>
      <Toaster position="bottom-center" />
      <div className="w-full flex justify-center">
        <div className="relative bg-white w-full ">
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Información Personal
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Use a permanent address where you can receive mail.
                  </p>
                </div>
                </div>
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
                    htmlFor="weight"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Peso
                  </label>
                  <input
                    type="number"
                    name="weight"
                    id="weight"
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
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  ) : (
                    ""
                  )}
                  Guardar
                </button>
              </div>
          </form>
            </div>
        </div>
      
    </AccountLayout>
  );
};

export default ProfilePage;




