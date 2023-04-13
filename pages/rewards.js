/* eslint-disable @next/next/no-img-element */
import AccountLayout from "@/components/layouts/AccountLayout";
import LoadingCircle from "@/components/common/LoadingCircle";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import classNames from "@/utils/classNames";
import { signOut } from "next-auth/react";
import Table from "../components/table_perfil";
import ProgressBarWithTitleForProfile from "../components/nivel_actividad";
import CheckboxListForProfile from "../components/barraConChecboxes";
import RewardsProgressBarWithTitleForProfile from "../components/rewards/rewardsProgressBarWithTitle";
import RewardsCheckboxListForProfile from "../components/rewards/rewardsCheckbox";
import TitleSubtitle from "../components/rewards/rewardTitle";
import StoriesSliderRewards from "../components/rewards/verMasRecompensas";






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

                setValue("name", data.name);
                setValue("email", data.email);
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
                <div className="relative bg-white w-full">


                    <Table />
                    <RewardsProgressBarWithTitleForProfile></RewardsProgressBarWithTitleForProfile>

                    <RewardsCheckboxListForProfile></RewardsCheckboxListForProfile>
                    <TitleSubtitle title="Tus recompensas" subtitle="Sabemos que no es sencillo, pero lo has logrado y te queremos premiar por tu esfuerzo. ¡Continúa cumpliendo retos y genera un cambio en tu vida!" />
                  <StoriesSliderRewards></StoriesSliderRewards>
                </div>

            </div>

        </AccountLayout>
    );
};

export default ProfilePage;
