import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  };

  function deleteToDo(toDoId: string) {
    client.models.Todo.delete({ id: toDoId });
  };

  function updateToDo(toDoId: string, content: string|null) {
    client.models.Todo.update({ id: toDoId, content: content });
  };



  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}
            <button style={{ "backgroundColor": "red", "float": "right", "width": "20px", "fontSize": "10px", "padding": "2px" }} onClick={() => deleteToDo(todo.id)}>X</button>
            <button style={{"backgroundColor": "blue", "float": "right", "width": "40px", "fontSize": "10px", "padding": "2px", "marginRight": "2px"}} onClick={()=>updateToDo(todo.id, window.prompt("Todo content"))}>edit</button>
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;
