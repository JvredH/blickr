import UserNav from "../UserNav";
import { useParams } from "react-router-dom";
import { useState } from "react";

const UserAlbumsPage = () => {
  const {userId} = useParams();
  const [isLoaded, setIsLoaded] = useState(false)
  

  return (
  <div>
    <UserNav userId={userId} />
    <div>Hello from Users Albums Page</div>
  </div>
  )
}

export default UserAlbumsPage;
