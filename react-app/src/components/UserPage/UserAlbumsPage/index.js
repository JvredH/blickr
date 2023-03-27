// import UserNav from "../UserNav";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPageHeader from "..";
import { getUsersAlbumsThunk } from "../../../store/albumsReducer";

const UserAlbumsPage = () => {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const allUserAlbums = useSelector(state => state.albums.usersAlbums)
  const [isLoaded, setIsLoaded] = useState(false);


  console.log('user albums here fam', allUserAlbums)

  useEffect(() => {
    dispatch(getUsersAlbumsThunk(userId))
      .then(() => setIsLoaded(true))

      return () => setIsLoaded(false)
  }, [dispatch, userId])


  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
  <div>
    <UserPageHeader userId={userId}/>
    {/* <UserNav userId={userId} /> */}
    <div>Hello from Users Albums Page</div>
  </div>
  )
}

export default UserAlbumsPage;
