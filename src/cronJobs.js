import cron from "node-cron";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.VITE_HOST;
const port = process.env.VITE_PORT;
console.log(url);
console.log(port);
console.log("Cron Job is running...");

export const scheduleUpdateDetails = async () => {
  cron.schedule("* * * * *", () => {
    console.log("cron tick");
    const date = new Date();
    if (date.getMinutes() === 30) {
      console.log("update services details");
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

export const scheduleFirstDayOfMonth = async () => {
  cron.schedule('0 0 * * *', () => {
    console.log("cron tick");
    const date = new Date();
    if (date.getDate() === 1) {
      console.log("It is the first day of the month");
      const body = {
        cronUpdate: true,
      };
      axios.put(`${url}:${port}/api/employeepayrolls/employeepayrolls`, body);
      axios.put(`${url}:${port}/api/misc/studentsubjectmensuality/studentsubjectmensuality`, body);
    } else {
      console.log("It is not the first day of the month");
    }
  });
};

try {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  await axios.get(`${url}:${port}/api/misc/ping/ping`);
  scheduleUpdateDetails();
  scheduleFirstDayOfMonth();
} catch (error) {
  console.error("Error in cron job", error);
}