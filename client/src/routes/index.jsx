import LayoutDefault from "../components/Layout/DefaultLayout";
import PrivateRouter from "../components/PrivateRouter";
import Error404 from "../pages/Error404";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AllQuizz from "../pages/Quizz/AllQuizz";
import Quizz from "../pages/Quizz/";
import QuizzItem from "../pages/Quizz/QuizzItem";
import Register from "../pages/Regsiter";
import Result from "../pages/Result";
import ResultDetail from "../pages/Result/ResultDetail";
import Base from "../pages/Result/base";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        element: <PrivateRouter />,
        children: [
          {
            path: "/quizz",
            element: <Quizz />,
            children: [
              {
                index: true,
                element: <AllQuizz />,
              },
              {
                path: ":id",
                element: <QuizzItem />,
              },
            ],
          },
          {
            path: "/result",
            element: <Base />,
            children: [
              {
                index: true,
                element: <Result />,
              },
              {
                path: ":id",
                element: <ResultDetail />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
];
