import express, { request } from "express";

// Cria o roteador da API
const routes = express.Router();

routes.get("/", (request, response) => {
  return response.status(200).json({
    status: "running",
    about: "This is the Classiweb server!",
  });
});

export default routes;
