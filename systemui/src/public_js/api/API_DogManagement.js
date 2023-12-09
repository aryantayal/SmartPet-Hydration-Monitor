import React from "react";
import {server} from "../config/db_config.js";



    /**
     * Calling server to set the given user_id (dog) to inactive
     * @param {*} user_id 
     * @returns 
     */
    export const removeDog = async (data) => {
        const response = await fetch(server+"/removeDogById", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        });
        const body = await response.json();

        if(response.status !== 200){
            console.log(body.message);
        }
        return body;
    }


    /**
     * Creates a new dog, passing its name and suggested consumption amount
     * @param {*} data 
     * @returns 
     */
    export const createNewDog = async (data) => {
        const response = await fetch(server+"/createNewDog", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        });
        const body = await response.json();

        if(response.status !== 200){
            console.log(body.message);
        }
        return body;
    }

/**
     * Calling server to set the given user_id (tag) to inactive
     * @param {*} user_id 
     * @returns 
     */
 export const removeTag = async (data) => {
    const response = await fetch(server+"/removeTagById", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    });
    const body = await response.json();

    if(response.status !== 200){
        console.log(body.message);
    }
    return body;
}

/**
     * Calling server to set the given user_id (tag) to active
     * @param {*} data 
     * @returns 
     */
 export const addTag = async (data) => {
    const response = await fetch(server+"/addTagById", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    });
    const body = await response.json();

    if(response.status !== 200){
        console.log(body.message);
    }
    return body;
}

/**
     * Calling server to get the given user_id (dog) intake
     * @param {*} data
     * @returns 
     */
 export const newIntake = async (data) => {
    const response = await fetch(server+"/newIntakeById", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    });
    const body = await response.json();

    if(response.status !== 200){
        console.log(body.message);
    }
    return body;
}



    export const getDogsTodayInfo = async () => {
        const response = await fetch(server+"/getTodayOverViewData", {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        });
        const body = await response.json();
        if(response.status !== 200){
            console.log(body.message);
        }
        return body;
    }

    export const updateDog = async (data) => {
        const response = await fetch(server+"/updateDog", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        });
        const body = await response.json();
        if(response.status !== 200){
            console.log(body.message);
        }
        return body;
    }

    const APITESTING = async(data) => {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                resolve(data);
            }, 142);
        });
    }

    //TODO Add tag to dog

