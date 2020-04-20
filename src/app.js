const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

const body = {
  title,
  url,
  techs
}

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body
  let body = { id: uuid(), title, url, techs, likes: 0 }
  
  repositories.push(body)

  return response.json(body)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs} = request.body
      
  const found = repositories.findIndex((body) => body.id == id)

  if(found < 0){
    return repositories.status(400).json({ error: 'Repository not found :('})
  }

  let body = {
    title,
    url,
    techs
  }

  repositories[found] = body

  return repositories.json(body)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params
      
  const found = repositories.findIndex(body => body.id == id)

  if(found < 0){
    return repositories.status(400).json({ error: 'Repository not found :('})
  }

  repositories.splice(found, 1)

  return repositories.status(200)
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const found = repositories.findIndex(body => body.id == id)

  if(found < 0){
    return repositories.status(400).json({ error: 'Repository not found :('})
  }
  
  const like = like + 1
  repositories[found] = body.like

  return repositories.json(body)

});

module.exports = app;
