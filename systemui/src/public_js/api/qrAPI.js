import {server} from "../config/db_config.js";
const getClientIP = async () => {
  const response = await fetch(server + "/getQRURL", {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  const body = await response.json();
  if (response.status !== 200) {
    console.log(body.message);
  }
  return body;
};
//give data like this
const getDoggoStats = async (data) => {
  //passes startDate and endDate
  //Call server, get this data in return
  //Name: name
  //dailyWaterIntakes: An array of the week's consumption by daily summation (NOT TODAY INCLUSIVE)
  //12AM - 11:59PM
  // dailyWaterIntakes[0] = one week ago
  // dailyWaterIntakes[6] = yesterday
  

  
   const response = await fetch(server + "/getDaySummaries", {
     method: "POST",
     body: JSON.stringify(data),
     headers: {
       "Content-Type": "application/json; charset=utf-8",
     },
   });
   const body = await response.json();
   if (response.status !== 200) {
     console.log(body.message);
   }
   return body.results;
   
};

//give data like this
const getTodayStats = async (data) => {
  //
  //server expects start and end being new Date() base formatting
  //
  //for 4AM: 3:30 - 4:29
  //dailyWaterIntakes[0] now - 24 hours
  //dailyWaterIntakes[23] now
  
  const response = await fetch(server + "/getTodaySummary", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
       "Content-Type": "application/json; charset=utf-8",
    },
  });
  const body = await response.json();
  if (response.status !== 200) {
    console.log(body.message);
  }
  return body.results;
  
};

const getFillLimit = async () => {
   const response = await fetch(server + "/getFillLimit", {
     method: "GET",
     headers: {
       "Content-Type": "application/json; charset=utf-8",
     },
   });
   const body = await response.json();
   if (response.status !== 200) {
     console.log(body.message);
   }
   return body;
};
//return the fill limit that is set from the user.
//should be a number

const setFillLimit = async (data) => {
  const response = await fetch(server + "/setFillLimit", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  const body = await response.json();
  if (response.status !== 200) {
    console.log(body.message);
  }
  return body;
};
//TODO set fill limit
//should be a number

const sendZero = async () => {
  const response = await fetch(server + "/zeroCell", {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  const body = await response.json();
  if (response.status !== 200) {
    console.log(body.message);
  }
  return body;
};
//Zeroing call

export const QR_API = {
  getClientIP,
  getDoggoStats,
  getTodayStats,
  setFillLimit,
  getFillLimit,
  sendZero,
};
