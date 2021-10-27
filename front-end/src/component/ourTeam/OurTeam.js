import React from "react";
import "../ourTeam/OurTeam.css";
import { Link } from "react-router-dom";
import { GiRingingBell } from "react-icons/gi";
import { MdOutlineSecurity } from "react-icons/md";
import { BsBasketFill } from "react-icons/bs";
function OurTeam() {
  return (
    <>
      <div className="word">
        <div className="sec title-page">
          <h2>
            <span>About Us</span>
          </h2>
        </div>
      </div>
      <div class="containerq">
        <section class="about" id="about">
          <div class="content">
            <div class="column col-left ">
              <h3 class="content-title">
                We Create Intuitive Online
                <br /> Auction Websites for Less
              </h3>
              <hr />
              <Link to="/ContactUs">
                <button className="button">Contact Us</button>
              </Link>
            </div>
            <div class="column col-right">
              <p>
                Online Auction has been recognized as the go-to online auction
                marketplace for new, overstock, closeout and recertified
                products. We specialize in offering the best deals on popular,
                everyday items from watches to laptops, and sports memorabilia
                from trusted and certified vendors and merchants, directly to
                our customers in auction, fixed-price and "Deals of the Day"
                formats.Our support team is always ready to help you solve any
                question connected with performance of our website. We can
                reoslve any issue efficiently 24/7.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div class="containerc" style={{ marginTop: "70px" }}>
        <div class="cont">
          <div class="title ">
            <img
              src="https://uploads-ssl.webflow.com/5e62759ab81ddc4f5815a3b6/5e62759b04473656d2dafba5_question-mark.svg"
              alt=""
            />

            <h1 class="section-title">Frequently Asked Questions</h1>
          </div>
          <div class="q">
            <h3
              style={{
                marginTop: "70px",
                fontWeight: "bold",
                marginBottom: "20px",
                paddingRight: "9px",
              }}
            >
              <BsBasketFill /> FREE ACCESS
            </h3>
            <p>
              Unlike some online auctions, we don’t charge any additional fees
              for placing a bid and we provide our clients with completely free
              access to all auctions available on our website.
            </p>
            <h3
              style={{
                marginTop: "70px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              {" "}
              <span>
                {" "}
                <MdOutlineSecurity />
              </span>{" "}
              100% SECURE BIDS
            </h3>
            <p>
              We guarantee that every bid placed on our website is safe and
              secure thanks to the SSL technology, which protects all your
              entered data and actions performed on our website.
            </p>
            <h3
              style={{
                marginTop: "70px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              {" "}
              <GiRingingBell /> NEW ITEMS EVERYDAY
            </h3>
            <p>
              We daily update our catalog of auctions with new offers from
              vendors who want to sell their products in a new revolutional way
              without any third parties and complexities.
            </p>
          </div>
        </div>
      </div>
      <div class="site-section pt-0">
        <div class="containerdd">
          <div class="row">
            <div class="title">
              <h2 class="section-title">
                How <strong>It Works</strong>
              </h2>
            </div>
          </div>
          <div class="rows">
            <div class="col-lg-3">
              <div class="step">
                <span class="wrap-icon icon-user">01</span>
                <h3>Register</h3>
                <p>
                  To start using our auction, you’ll need to register. It’s
                  completely free!
                </p>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="step">
                <span class="wrap-icon icon-money">02</span>
                <h3>Buy or Bid</h3>
                <p>
                  You can instantly buy or place a bid on a desired product
                  right after registration.
                </p>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="step">
                <span class="wrap-icon icon-glass">03</span>
                <h3>Submit a bid</h3>
                <p>
                  Submitting a bid is fast and easy. The process takes
                  approximately 5 minutes.
                </p>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="step last">
                <span class="wrap-icon icon-trophy">04</span>
                <h3>Win</h3>
                <p>
                  Easily win at our auction and enjoy owning the product you
                  dream of.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OurTeam;
