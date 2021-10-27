import React from "react";
import "../about/about.css";
import { Link } from "react-router-dom";
function About() {
  return (
    <>
      <section class="about" id="about">
        <div class="title ">
          <h2 class="section-title">About</h2>
        </div>
        <div class="content">
          <div class="column col-left ">
            <div class="img-card">
              <img src="./images/home.png" alt="image" />
            </div>
          </div>
          <div class="column col-right">
            <h3 class="content-title">
              {" "}
              Increase demand and create excitement for your products using our
              fully hosted online auction software.
            </h3>
            <hr />
            <p>
              Selling your products quickly and easily, while creating
              excitement as the timer counts down on your auction, has never
              been simpler.
            </p>
            <Link to="/about">
              <button className="button">Read More</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
export default About;
