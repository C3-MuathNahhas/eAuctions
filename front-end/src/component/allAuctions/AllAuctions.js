import React, { useEffect, useState } from "react";
import "../allAuctions/AllAuctions.css";
import { setAuction } from "../../actions/auctionAction";
import axios from "axios";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
function AllAuction() {
  const [allAuctions, setAllAuctions] = useState();
  const [allAuctions2, setAllAuctions2] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const search = (e) => {
    e.preventDefault();
    setAllAuctions(
      allAuctions2.filter((item) => {
        return item.title.toLowerCase().includes(e.target.value.toLowerCase());
      })
    );
  };
  useEffect(() => {
    axios.get(`http://localhost:5000/auctions`).then((res) => {
      console.log(res.data.result)
      setAllAuctions(res.data.result);
      setAllAuctions2(res.data.result);
    });
  }, []);
  return (
    <>
      <div className="word">
        <div className="sec title-page">
          <h2>
            <span>All Auctions</span>
          </h2>{" "}
          <input type="search" placeholder="search" onChange={search}></input>
        </div>
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
      </div>
    </>
  );
}
export default AllAuction;
