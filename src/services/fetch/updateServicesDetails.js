import axios from "axios";
const url = import.meta.env.VITE_HOST;
const port = import.meta.env.VITE_PORT;

export default function updateServicesDetails() {
    const body = {
    cronUpdate: true,
  };
    axios.put(`${url}:${port}/serviceConsumptions/serviceConsumptions`, body)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};