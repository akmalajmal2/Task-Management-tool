import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login/Login";
import Task from "./components/Task";
import { AuthProvider } from "./context/AuthContext";
import AuthLoader from "./utils/authLoader";
import { Provider } from "react-redux";
import { store } from "./store/store";
// import TodoForm from "./components/TodoForm";

function App() {
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/", element: <Task />, loader: AuthLoader },
  ]);
  return (
    <AuthProvider>
      <Provider store={store}>
        <div className=" h-screen">
          <RouterProvider router={router} />
        </div>
      </Provider>
    </AuthProvider>
  );
}

export default App;
