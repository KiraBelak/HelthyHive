
import axios from "axios";
import { useEffect } from "react";

export default  function demo(){

    

    async function postProfile() {
        const data = {
            email: "linux34@live.com",
            age: 30,
            weight: 70,
            height: 170,
            imc: 24.2,
            disease: "none",
            regimen: "balanced",
            sedentary: true
        };
        
        const resp = await axios.post("/api/profile", data).then( response => {
            console.log("EXITO!" , response);

        }).catch(error => {

            console.error(error);
        })
        
        console.log(resp);
        
    }

    async function getProfiles(){
        const email = "linux34@live.com"
        const resp = await axios.get(`/api/profile?email=${email}`);
        console.log(resp);
    }

    async function editProfiles(){
        const email = "linux34@live.com";
        const data2 = {
            email: email,
            age: 8888888,
            weight: 70,
            height: 77,
            imc: 77,
            disease: ["none","alterado"],
            regimen: "balanced",
            sedentary: false
        };
        //const resp = await axios.put(`/api/profile${email}`,data2);
        const resp = await axios.put(`/api/profile?email=${email}`, data2);
        console.log(resp);

    }
 
    useEffect(() => {
       
        postProfile();
        
        //editProfiles();
        //getProfiles();
    }, []);

    return(
        <div>
        hola fraga
        </div>
    )
}