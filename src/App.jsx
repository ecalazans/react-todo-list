import React, { useState, useEffect } from "react";
import api from './api/index.js';



import { Container, ToDoList, Input, Button, ListItem, Trash, Check, H3 } from "./styles.js";

function App() {
  const [list, setList] = useState([]);
  const [inputTask, setInputTask] = useState("");

  async function pegarTodasAsTarefas(){
    //consumindos os dados da API
    const {data} = await api.get('/todos');
    console.log(data);
    setList(data);
  };

  function inputMudou(event) {
    setInputTask(event.target.value);
  };

  async function cliqueiNoBotao() {
    if (inputTask) {
      await api.post('/todos', {task: inputTask});
      pegarTodasAsTarefas();
      setInputTask("");
    };
  };

  async function finalizarTarefa(id, finished) {
    await api.patch(`/todos/${id}`, {
      finished: !finished
    });
    pegarTodasAsTarefas();
  };

  async function deletarItem(id) {
    await api.delete(`/todos/${id}`);

    pegarTodasAsTarefas();
  }

  useEffect(() => {
    pegarTodasAsTarefas();

  }, []);

  return (
    <Container>
      <ToDoList>
        <Input onChange={inputMudou} placeholder="O que tenho que fazer..." value={inputTask} />
        <Button onClick={cliqueiNoBotao}>Adicionar</Button>

        <ul>
          {list.length > 0 ? (
          list.map((item) => (
            <ListItem key={item._id} isFinished={item.finished}>
              <Check onClick={() => finalizarTarefa(item._id, item.finished)} />
              <li>{item.task}</li>
              <Trash onClick={() => deletarItem(item._id)} />
            </ListItem>
          ))
          ) : (
            <H3>Não há itens na lista</H3>
          )}
        </ul>
      </ToDoList>
    </Container>
  );
}

export default App;
