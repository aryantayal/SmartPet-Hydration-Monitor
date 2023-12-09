import {server} from "../config/db_config.js";
export class DOG_API {

    getDogConsumption = async (param) => {
    const response = await fetch(server+'/getDogConsumption', {
        method: 'POST',
        body: JSON.stringify(param),
        credentials: "include",
        headers: {
            'Content-Type': 'applicatoin/json; charset=utf-8'
        }
    });
    const body = await response.json();

    if(response.status !== 200){
        console.log(body.message);
    }
    return body;
}

}