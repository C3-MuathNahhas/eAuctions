import "./App.css";
import { Route, Switch } from "react-router-dom";
import SideBar from "./component/sideBar/SideBar";
import { Footer } from "./component/footer/footer";
import NavBar from "./component/navBar/NavBar";
import AllAuctions from "./component/allAuctions/AllAuctions";
import Login from "./component/login";
import StripeContainer from "./component/stripe/StripeContainer";
import CreateAuction from "./component/createAuction/CreateAuction";
import { MyAuction } from "./component/myAuctions/MyAuction";
import CreateItem from "./component/createItem/CreateItem";
import LiveAuction from "./component/liveAuction/liveAuction";
import { Component404NotFound } from "./component/component404NotFound/Component404NotFound";
import { Admin } from "./component/admin/Admin";
import Calendar from "./component/calendar";
import { MyItem } from "./component/myItem/MyItem";
import Home from "./component/home/Home";
import ContactUs from "./component/contactUs/ContactUs";
import orgchart from "./component/organization chart/orgchart";
import FavUsersAuctions from "./component/favUsersAuctions/FavUsersAuctions";
import Profile from "./component/profile/Profile";
import SignUp from "./component/register";
import OurTeam from "./component/ourTeam/OurTeam";

function App() {
  return (
    <div>
      <NavBar />
      <div className="Perent">
        <SideBar />

        <Switch>
          <Route exact path="/about" component={OurTeam} />
          <Route exact path="/payment" component={StripeContainer} />
          <Route exact path="/Admin" component={Admin} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/AllAuctions" component={AllAuctions} />
          <Route exact path="/MyFavorites" component={FavUsersAuctions} />
          <Route exact path="/CreateAuction" component={CreateAuction} />
          <Route exact path="/MyItem" component={MyItem} />
          <Route exact path="/MyAuction" component={MyAuction} />
          <Route exact path="/CreateItem" component={CreateItem} />
          <Route path="/live-auction/:auctionId" component={LiveAuction} />
          <Route path="/calender" component={Calendar} />
          <Route path="/Home" component={Home} />
          <Route path="/MyProfile" component={Profile} />
          <Route path="/ContactUs" component={ContactUs} />
          <Route path="/OrgChart" component={orgchart} />
          <Route path="*" component={Component404NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
