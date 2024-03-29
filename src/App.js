import "./App.css";

import { createContext, useEffect, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 } from "uuid";

import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./components/Styles/Theme";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      newState = [action.data, ...state];
      break;
    case "EDIT":
      newState = state.map((item) =>
        item.id === action.editId ? { ...action.editedTodo } : item
      );
      break;
    case "DELETE":
      newState = state.filter((item) => item.id !== action.deleteId);
      break;
    default:
      return state;
  }
  localStorage.setItem("todos", JSON.stringify(newState));
  return newState;
};

export const TodosContext = createContext();
export const DispatchesContext = createContext();

function App() {
  const [todos, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const initialData = JSON.parse(localStorage.getItem("todos"));

    if (initialData) {
      dispatch({ type: "INIT", data: initialData });
    }
  }, []);

  const onCreate = (name, title) => {
    dispatch({
      type: "CREATE",
      data: {
        id: v4(),
        name,
        title,
      },
    });
  };

  const onEdit = (editId, editedTodo) => {
    dispatch({ type: "EDIT", editId, editedTodo });
  };

  const onDelete = (deleteId) => {
    dispatch({ type: "DELETE", deleteId });
  };

  return (
    <div className="App">
      <TodosContext.Provider value={todos}>
        <DispatchesContext.Provider value={{ onCreate, onEdit, onDelete }}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Routes>
                <Route index element={<Home />}></Route>
                <Route path={"/new"} element={<New />}></Route>
                <Route path={"/edit/:id"} element={<Edit />}></Route>
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </DispatchesContext.Provider>
      </TodosContext.Provider>
    </div>
  );
}

export default App;
