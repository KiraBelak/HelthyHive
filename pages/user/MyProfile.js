import AccountLayout from "@/components/layouts/AccountLayout";
import LoadingCircle from "@/components/common/LoadingCircle";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Table from "../../components/table_perfil";
import SubtitleAndButtons from "../../components/subtitulo_botones";
import ProgressiveBar from "../../components/nivel_actividad";
import ProgressBarWithTitle from "../../components/reto";
import CheckboxList from "../../components/lista_reto";
import ProgressBarWithTitleForProfile from "../../components/nivel_actividad";
import CheckboxListForProfile from "../../components/barraConChecboxes";
import DownloadButton from "../../components/regimenAlimenticio";
import FormProfilePage from "../../components/formMyProfile";

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
            <div className="w-full flex  ">
                <div className="relative bg-white w-full">
                    <Table />
                    <h3 className="text-4xl font-bold text-gray-800 mt-4 text-left p-4">
                        Mi perfil
                    </h3>

                    <SubtitleAndButtons></SubtitleAndButtons>

                    <ProgressBarWithTitleForProfile></ProgressBarWithTitleForProfile>

                    <CheckboxListForProfile></CheckboxListForProfile>

                    <DownloadButton></DownloadButton>

                    <FormProfilePage></FormProfilePage>























                </div>

            </div>

        </AccountLayout>
    );
};

export default ProfilePage;




