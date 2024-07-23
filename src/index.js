import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Cards from './Cards';
import BookReceived from './BookReceived';
import Reports from './Reports';
import PublishedBook from './PublishedBook';
import AddCard from './AddCard';
import Card from './Card';
import Vacations from './Vacations';
import AddBook from './AddBook';
import AddBookPublished from './AddBookPublished';
import Login from './Login';
import Registration from './Registration';
import BookRec from './BookRec';
import Divisions from './Divisions';
import AddExtension from './AddExtension';
import CardInfo from './CardInfo';
import AddMural from './AddMural';
import AddVacation from './AddVacation';
import BookPublish from './BookPublish';
import AttachedBook from './AttachInfo';
import QrInfo from './QrInfo';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Home",
    element: <App />,
  },
  {
    path: "Cards",
    element: <Cards />,
  },
  {
    path: "BookReceived",
    element: <BookReceived />,
  },
  {
    path: "PublishedBook",
    element: <PublishedBook />,
  },
  {
    path: "Reports",
    element: <Reports />,
  },
  {
    path: "AddCard",
    element: <AddCard />,
  },
  {
    path: "Card/:id",
    element: <Card />,
  },
  {
    path: "Vacations",
    element: <Vacations />,
  },
  {
    path: "AddBook",
    element: <AddBook />,
  },
  {
    path: "AddBook/:id",
    element: <AddBook />,
  },
  {
    path: "AddBookPublished",
    element: <AddBookPublished />,
  },
  {
    path: "AddBookPublished/:id",
    element: <AddBookPublished />,
  },
  {
    path: "Registration",
    element: <Registration />,
  },
  {
    path: "BookRec/:id",
    element: <BookRec />,
  },
  {
    path: "Divisions",
    element: <Divisions />,
  },
  {
    path: "AddExtension/:id",
    element: <AddExtension />,
  },
  {
    path: "CardInfo/:id",
    element: <CardInfo />,
  },
  {
    path: "AddMural/:id",
    element: <AddMural />,
  },
  {
    path: "AddVacation",
    element: <AddVacation />,
  },
  {
    path: "AddVacation/:id",
    element: <AddVacation />,
  },
  {
    path: "BookPublish/:id",
    element: <BookPublish />,
  },
  {
    path: "AttachedBook/:id",
    element: <AttachedBook />,
  },
  {
    path: "QrInfo/:id",
    element: <QrInfo />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
