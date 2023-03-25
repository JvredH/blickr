import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllPhotos from "./components/PhotosAll";
import PhotoDetails from "./components/PhotoDetails";
import CreatePhotoForm from "./components/photoCreateForm";
import EditPhotoForm from "./components/PhotoEditForm";
import SplashPage from "./components/SplashPage";
import Error from "./components/404Page";
import UserPhotosPage from "./components/UserPage/UserPhotosPage";
import UserAlbumsPage from "./components/UserPage/UserAlbumsPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/' exact>
            <SplashPage />
          </Route>
          <Route path='/photos' exact>
            <AllPhotos />
          </Route>
          <Route path='/photos/new' exact>
            <CreatePhotoForm />
          </Route>
          <Route path='/photos/:photoId/edit' exact>
            <EditPhotoForm />
          </Route>
          <Route path='/photos/:photoId' exact>
            <PhotoDetails />
          </Route>
          <Route path='/user/:userId/photos'>
            <UserPhotosPage />
          </Route>
          <Route path='/user/:userId/albums'>
            <UserAlbumsPage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
      )}
      {/* <Footer /> */}
    </>
  );
}

export default App;
