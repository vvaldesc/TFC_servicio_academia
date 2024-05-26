import cron from "node-cron";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.VITE_HOST;
const port = process.env.VITE_PORT;
console.log(url);
console.log(port);
//import laboralDate from './services/utils/laboralDate';
// import updateServicesDetails from './updateServicesDetails';
console.log("Cron Job is running...");

export const scheduleJobs = () => {
  cron.schedule("* * * * *", () => {
    console.log("cron tick");
    const date = new Date();
    if (date.getMinutes() === 30) {
      console.log("update services details");
      //updateServicesDetails();
      const body = {
        cronUpdate: true,
      };
      console.log(`${url}:${port}/api/serviceConsumptions/serviceConsumptions`);
      axios
        .put(`${url}:${port}/api/serviceConsumptions/serviceConsumptions`, body)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
};

try {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  await axios.get(`${url}:${port}/api/misc/ping/ping`);
  scheduleJobs();
} catch (error) {
  console.error("Error in cron job", error);
}

// async function checkServer() {
//   try {
//     const response = await axios.get(`${url}:${port}/api/misc/ping/ping`);
//     if (response.status === 404) {
//       return true;
//     }
//     return true;
//   } catch (error) {
//     console.error('Server is not running', error);
//     return false;
//   }
// }

// async function runJobs() {
//   await new Promise(resolve => setTimeout(resolve, 5000));
//   const serverIsActive = await checkServer();
//   if (serverIsActive) {
//     console.log('Server is running');
//     scheduleJobs();
//   } else {
//     console.log('Cannot run jobs. Server is not running.');
//   }
// }

// runJobs();
