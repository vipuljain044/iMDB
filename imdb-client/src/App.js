import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import AuthContext from './common/context/authContext';
import MovieContext from './common/context/movieContext';

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/layout/header/header.component";
import Footer from "./components/layout/footer/footer.component";
import Spinner from "./common/spinner/spinner.component";

import useMovieService from './common/service/movie.service';
import useAuthService from './common/service/auth.service';

const Home = lazy(() => import("./components/home/home.component"));
const SignUpPage = lazy(() => import("./components/auth/sign-up/sign-up.component"));
const SignInPage = lazy(() => import("./components/auth/sign-in/sign-in.component"));


toast.configure({
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  transition: Slide,
});

function App() {
console.log('ENV')
  console.log(process && process.env ? process.env.NODE_ENV : '');
console.log(process && process.env ? process.env.REACT_APP_API_BASE_URL : '');
  console.log(process && process.env ? process.env : '');
  const movieServices = useMovieService();
  const {login, user, signup, logout} = useAuthService();

  return (
    <AuthContext.Provider value={{user, login, signup, logout}}>
      <MovieContext.Provider value={movieServices}>
      <Header />
      <Suspense fallback={<Spinner />}>
      <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/sign-in"
              render={() =>
                 (
                  <SignInPage />
                )
              }
            />
            <Route
              path="/sign-up"
              render={() =>
                 (
                  <SignUpPage />
                )
              }
            />
          </Switch>
      </Suspense>
      <Footer />
      </MovieContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
