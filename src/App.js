import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title:  `Novo repositório ${Date.now()}`,
      url: "https://github.com/tecnauta/reactstack",
      techs: ["Node", "Express", "TypeScript"]
    })

    const repository = response.data;

    setRepositories([ ...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(
      document.getElementById(id).remove()
    )

    console.log(id);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id} id={repository.id}>
              {repository.title}

              <button key={`btn_${repository.id}`} onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
