import axios from "./apiConnect";

export const getData = () => {
  return axios.get("/steps").then((res) => res.data);
};

export const addSteps = (steps) => {
  return axios
    .post("/steps/add", {
      steps,
    })
    .then((res) => res.data);
};
