const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
 
function validateID (request, response, next){
  const { id } = request.params

  const index = repositories.findIndex(object => object.id == id)

  if(index < 0){
    return response.sendStatus(400).json({ message: "Invalid project id 😥"})
  }
  return next()
}

app.use('/repositories/:id', validateID)
app.use('/repositories/:id/like', validateID)


app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body
  const body = { id: uuid(), title, url, techs, likes: 0}
  
  repositories.push(body)

  return response.json(body)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs, likes} = request.body
      
  const index = repositories.findIndex(object => object.id == id)

  const repo = {
    id,
    title,
    url,
    techs,
    likes: 0
  }

  repositories[index] = repo
  return response.json(repo)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params
      
  const index = repositories.findIndex(body => body.id == id)

  repositories.splice(index, 1)
  return response.sendStatus(204)
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const index = repositories.findIndex(object => object.id == id)

  const data = repositories[index]
  const like = data.likes + 1
  const repo = {
    id,
    likes : like
  }

  repositories[index] = repo

  return response.json(repo)

});

module.exports = app;
