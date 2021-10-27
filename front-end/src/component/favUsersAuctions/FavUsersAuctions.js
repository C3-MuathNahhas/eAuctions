import React, { useEffect, useState, useRef } from "react";
import "../allAuctions/AllAuctions.css";
import { setAuction } from "../../actions/auctionAction";
import axios from "axios";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "primereact/toast";

function FavUsersAuctions() {
  const [allAuctions, setAllAuctions] = useState([]);
  const [allAuctions2, setAllAuctions2] = useState([]);
  const [favorietesIds, setFavorietesIds] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const toast = useRef(null);

  const tokenHolder = useSelector((state) => {
    return {
      token: state.tokenReducer.token,
      userName: state.tokenReducer.userName,
    };
  });
  const config = {
    headers: { Authorization: `Bearer ${tokenHolder.token}` },
  };
  const search = (e) => {
    e.preventDefault();
    setAllAuctions(
      allAuctions2.filter((item) => {
        return item.title.toLowerCase().includes(e.target.value.toLowerCase());
      })
    );
  };
  const filter = (e) => {
    e.preventDefault();

    setAllAuctions(
      allAuctions2.filter((item) => {
        return item.user_id == e.target.value;
      })
    );
  };

  const showMsg = (msgNumber) => {
    switch (msgNumber) {
      case 6:
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "your session has expired you have to logIn first",
          life: 5000,
        });
        break;
      case 7:
        toast.current.show({
          severity: "success",
          summary: "Success Message",
          detail: "the user has bean on your favorites list",
          life: 5000,
        });
        break;
      case 8:
        toast.current.show({
          severity: "info",
          summary: "info Message",
          detail: "the user already on your favorites list",
          life: 5000,
        });
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/favUsers`, config)
      .then((res) => {
        for (let index in res.data.users) {
          favorietesIds.push(res.data.users[index]["fav_user_id"]);
        }

        axios.get(`http://localhost:5000/auctions`, {}, config).then((res) => {
          setAllAuctions2(
            res.data.result.filter((auction) => {
              return favorietesIds.includes(auction.user_id);
            })
          );

          setAllAuctions(
            res.data.result.filter((auction) => {
              return favorietesIds.includes(auction.user_id);
            })
          );
        });
      })

      .catch((error) => {
        if (error.message == "Request failed with status code 403");
        showMsg(6);
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="word">
        <div className="sec title-page">
          <h2>
            <span>favoriets users Auctions</span>
          </h2>{" "}
          <input type="search" placeholder="search" onChange={search}></input>
        </div>
        <form>
          {favorietesIds &&
            favorietesIds.map((element, index) => {
              return (
                <>
                  {" "}
                  <input
                    type="radio"
                    value={element}
                    onChange={filter}
                    name="fav"
                  ></input>{" "}
                  <label for="choice">{element}</label>
                </>
              );
            })}
        </form>
      </div>
      <div className="container-card">
        {allAuctions &&
          allAuctions.map((element, index) => {
            return (
              <div>
                <div className="cards">
                  <img src={`${element.image}`} alt="" className="img" />
                  <div className="content">
                    <h6 className="name">{element.title}</h6>
                    <div className="des">
                      <h3>start Bid: {element.starter_bid} $</h3>
                    </div>
                    <div className="button-container">
                      <div>
                        <button
                          className="btn"
                          onClick={async function (e) {
                            e.preventDefault();

                            try {
                              await dispatch(setAuction(element));
                            } catch (error) {
                              console.log(error);
                            }
                            history.push(`/live-auction/${element.auction_id}`);
                          }}
                        >
                          Show Auction . . . .
                        </button>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        <Toast ref={toast} />
      </div>
    </>
  );
}
export default FavUsersAuctions;
