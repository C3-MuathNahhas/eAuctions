import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { confirmDialog } from "primereact/confirmdialog"; // To use <ConfirmDialog> tag
import CountDown from "./countDown/CountDown";
import "./style.css";
import { Image } from "primereact/image";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setBid, setAuction } from "../../actions/auctionAction";
import { Toast } from "primereact/toast";
import io from "socket.io-client";
import "../home/about/about.css";

moment.localeData();
function LiveAuction() {
  const { data } = useSelector((state) => {
    return {
      data: state.auctionReducer,
    };
  });

  const tokenHolder = useSelector((state) => {
    return {
      token: state.tokenReducer.token,
      userName: state.tokenReducer.userName,
    };
  });

  const { auctionId } = useParams(); //to get url parameters
  const [myLastBidId, setMyLastBidId] = useState("");
  const [myBid, setMyBid] = useState();
  const [bidJump, setBidJump] = useState(0);
  const [lastBid, setLastBid] = useState("");
  const [lastBidder, setLastBidder] = useState("");
  const [color, setColor] = useState("black");
  const axios = require("axios");
  const [renderedDiv, setRenderedDiv] = useState([data]);
  const [disableBtn, setDisableBtn] = useState(true);

  const dispatch = useDispatch();
  const toast = useRef(null);
  const socketRef = useRef();
  const config = {
    headers: { Authorization: `Bearer ${tokenHolder.token}` },
  };
  const showWarn = (data) => {
    toast.current.show({
      severity: "warn",
      summary: "SomeOne bid",
      detail: `${data.user_name} bid by
        ${data.bid_value} for this item`,
      life: 6000,
    });
  };
  const showMsg = (msgNumber) => {
    switch (msgNumber) {
      case 1:
        toast.current.show({
          severity: "info",
          summary: "info Message",
          detail: "your bid process was canceled",
          life: 5000,
        });
        break;

      case 2:
        toast.current.show({
          severity: "info",
          summary: "info Message",
          detail: "your bid process was canceled",
          life: 5000,
        });
        break;

      case 3:
        toast.current.show({
          severity: "warn",
          summary: "Warn Message",
          detail: "your bid value must be grater than last bid of the auction",
          life: 5000,
        });
        break;
      case 4:
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "you have to logIn first",
          life: 5000,
        });
        break;

      case 5:
        toast.current.show({
          severity: "success",
          summary: "Success Message",
          detail: "you bid has bean placed",
          life: 7000,
        });
        break;
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
  const setReduxAuction = function () {
    if (
      !!typeof renderedDiv[0].auction.image &&
      !!typeof data.auction.bid_jump &&
      !!typeof data.auction.starter_bid &&
      renderedDiv[0].auction !== undefined &&
      data.auction !== undefined
    ) {
      setRenderedDiv([data]);
      setBidJump(data.auction.bid_jump);

      if (data.bid["MAX (bids.bid_value)"]) {
        setMyBid(data.bid["MAX (bids.bid_value)"] + data.auction.bid_jump);
        setLastBid(data.bid["MAX (bids.bid_value)"]);
        setLastBidder(data.bid["user_name"]);
      } else {
        setLastBid(0);
        if (data.auction.starter_bid) {
          setMyBid(data.auction.starter_bid);
        } else {
          setMyBid(0);
        }
      }
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/auctions/${auctionId}`)
      .then((res) => {
        dispatch(setAuction(res.data.auction));

        axios
          .get(`http://localhost:5000/bids/${auctionId}/max`)
          .then((res) => {
            dispatch(setBid(res.data.bid));
          })
          .then(setReduxAuction())
          .catch((error) => {
            console.log(error);
          });
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:5000");
    socketRef.current.on("yourId", (id) => {});
    socketRef.current.on("broadcast", (data) => {
      received(data);
    });
  }, [socketRef]);

  const received = (data) => {
    if (data.auctionId === auctionId)
      if (data.bidId !== myLastBidId) {
        showWarn(data);
      }
    setLastBidder(data.user_name);
    setLastBid(data.bid_value);
  };

  const confirm = (e) => {
    e.preventDefault();
    if (tokenHolder.token.length) {
      if (myBid > lastBid) {
        confirmDialog({
          message: `Are you sure you want to bid by ${myBid}$ ?`,
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            bidNow();
          },
          reject: () => {
            showMsg(2);
          },
        });
      } else {
        showMsg(3);
      }
    } else {
      showMsg(4);
    }
  };

  const bidNow = () => {
    const bodyParameters = {
      auction_id: data.auction.auction_id,
      date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      bid_value: myBid,
    };

    axios
      .post(`http://localhost:5000/bids`, bodyParameters, config)
      .then((res) => {
        if (res.data.success) {
          setLastBidder(tokenHolder.userName);
          setLastBid(myBid);
          setMyLastBidId(res.data.insertId);
        }
      })
      .then(() => {
        const data = {
          user_name: tokenHolder.userName,
          bid_value: myBid,
          bidId: myLastBidId,
          auctionId,
        };
        socketRef.current.emit("bid", data);
        showMsg(5);
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 403");
        showMsg(6);
        console.log(error);
      });
  };
  const addUserToFavorite = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:5000/favUsers`, config)
      .then((res) => {
        if (
          res.data.users.filter((fav) => {
            return fav.fav_user_id == data.auction.user_id;
          }).length
        ) {
          showMsg(8);
          setColor("blue");
        } else {
          axios
            .post(
              `http://localhost:5000/favUsers/${data.auction.user_id}`,
              {},
              config
            )
            .then((res) => {
              if (res.data.success) {
                showMsg(7);
                setColor("blue");
              }
            })
            .catch((error) => {
              console.log(error);
              if (error.message === "Request failed with status code 403");
              showMsg(6);
            });
        }
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 403");
        showMsg(6);
        console.log(error);
      });
  };
  const decrease = (e) => {
    e.preventDefault();
    if (!bidJump) setBidJump(data.auction.bid_jump);
    if (!myBid) setBidJump(data.auction.lastBid);
    if (myBid > lastBid) {
      if (myBid - bidJump > lastBid) setMyBid(myBid - bidJump);
    }
  };
  const increase = (e) => {
    e.preventDefault();
    if (!bidJump) setBidJump(data.auction.bid_jump);
    if (!myBid) setBidJump(data.auction.lastBid);
    if (myBid < lastBid) setMyBid(lastBid + bidJump);
    else setMyBid((myBid || 0) + bidJump);
  };
  const btnDisableHandler = (disable) => {
    setDisableBtn(disable);
  };

  return (
    <div>
      <div key="onlyOne" className="live-body">
        <div className="grid-container">
          <div className="header">
            <CountDown
              btnDisableHandler={btnDisableHandler}
              auctionId={auctionId}
              token={tokenHolder.token}
            ></CountDown>
          </div>

          <section className="abouts" id="about">
            <div className="content">
              <div className="column col-left reveal">
                <div className="img-card">
                  <img src={data.auction.image} alt="" />
                </div>
              </div>

              <div className="column col-right reveal">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginLeft: "200px",
                  }}
                >
                  <button className="button" onClick={addUserToFavorite}>
                    <i className="pi pi-user-plus"> Favorite User </i>
                  </button>
                </div>
                <h2 className="content-title">{data.auction["user_name"]}</h2>
                <div className="Aucation">
                  <h5> START Bid:{data.auction.starter_bid}$</h5>
                  <h5>
                    Auction start:
                    {moment(data.auction.start_date)
                      .utcOffset(0, false)
                      .format("YYYY-MM-DD HH:mm a")}
                  </h5>
                  <h5>
                    Auction end:{" "}
                    {moment(data.auction.end_date)
                      .utcOffset(0, false)
                      .format("YYYY-MM-DD HH:mm a")}
                  </h5>
                  <br />

                  <h5> Price Till Now: {lastBid}$</h5>
                  <h5>{lastBidder}</h5>
                  <br />
                </div>
                <div>
                  <h5>Bid jump:{bidJump}$ ber jumb as minimum</h5>
                  <div className="liveAuctions">
                    <button className="btn1" onClick={decrease}>
                      -
                    </button>
                    <input
                      type="number"
                      id="bidValue"
                      defaultValue={lastBid + bidJump}
                      value={myBid}
                      onChange={(e) => {
                        e.preventDefault();
                        setMyBid(parseInt(e.target.value));
                      }}
                      className="liveAuction_input"
                      required

                      // placeholder={lastBid + bidJumb}
                    />
                    <button className="btn1" onClick={increase}>
                      +
                    </button>
                    <br />
                    {disableBtn && (
                      <button className="button" onClick={confirm}>
                        Bid Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <p className="parag">{data.auction.details}</p>
      </div>
      <Toast ref={toast} />
    </div>
  );
}
export default LiveAuction;
