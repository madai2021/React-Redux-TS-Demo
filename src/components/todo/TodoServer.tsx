import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { BaseTodoProps } from "./types";

interface TodoServerProps extends BaseTodoProps {}

const TodoServer: React.FC<TodoServerProps> = ({ todos }) => {
  const isLoading = useSelector((state: RootState) => state.todo.isLoading);
  const error = useSelector((state: RootState) => state.todo.error);

  return (
    <div>
      {" "}
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!isLoading && !error && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoServer;
