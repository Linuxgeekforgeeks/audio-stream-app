import { StreamVideo } from "@stream-io/video-react-sdk"
import { useUser } from "../../user-context"
import { Navigate } from "react-router-dom"
import "./MainPage.css"


function MainPage() {
    const {user,client}=useUser()
    if(!client) return <Navigate to="/sign-in"/>
  return (
      <StreamVideo client={client}>
      <div className="main">
        <h1>Welcome,{user?.name}</h1>
        <div className="main-room">
            <h2>Create Your Own Room</h2>
            <input placeholder="Room Name...."/>
            <input placeholder="Room Description...."/>
            <button>Create Room</button>
        </div>
      </div>
    </StreamVideo>
  )
}

export default MainPage