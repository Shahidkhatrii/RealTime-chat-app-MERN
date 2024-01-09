import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import MainContainer from "./Components/MainContainer";
import "./Styles/App.css";
import Welcome from "./Components/Welcome";
import ChatArea from "./Components/ChatArea";
import Users from "./Components/Users";
import Groups from "./Components/Groups";
import CreateGroup from "./Components/CreateGroup";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const lightTheme = useSelector((state) => state.themeKey);
  return (
    <>
      <div className={"App" + (lightTheme ? "" : " dark-container")}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="app" element={<MainContainer />}>
            <Route path="welcome" element={<Welcome />}></Route>
            <Route path="chat/:_id" element={<ChatArea />}></Route>
            <Route path="users" element={<Users />}></Route>
            <Route path="groups" element={<Groups />}></Route>
            <Route path="create-groups" element={<CreateGroup />}></Route>
          </Route>
        </Routes>
        <div className="background-div"></div>
        {/* <MainContainer /> */}
        {/* <Users /> */}
        {/* <Groups /> */}
        {/* <CreateGroup /> */}
        {/* <Welcome /> */}
        {/* <ChatArea {...conversations[0]} /> */}
      </div>
    </>
  );
}

export default App;
