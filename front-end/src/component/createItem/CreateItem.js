import "./CreateItem.css";
import React, { useState } from "react";
import "../createItem/CreateItem.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { storage } from "../firebase";
import swal from "sweetalert";
function CreateItem() {
  const state = useSelector((state) => {
    return {
      token: state.tokenReducer.token,
    };
  });
  const [images, setImages] = useState(null); //for complete the fuction of firebase
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState(); //to send name of photo to database
  const Title = (t) => {
    setTitle(t.target.value);
  };
  const Details = (d) => {
    setDetails(d.target.value);
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImages(e.target.files[0]);
      setImage(e.target.files[0].name);
    }
  };
  console.log("photoName", image);
  const handelUpload = () => {
    const uploadTask = storage.ref(`/images/${images.name}`).put(images);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(images.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            axios
              .post(
                "http://localhost:5000/items",
                { title, details, image: url },
                {
                  headers: {
                    Authorization: `Bearer ${state.token}`,
                  },
                }
              )

              .then((result) => {
                swal("Good job!", "Item Created Successfuly", "success");
                setTitle("");
                setDetails("");
              })
              .catch((err) => {
                swal("Try Again!");
                console.log(err);
              });
          });
      }
    );
  };
  console.log("image", images);
  return (
    <>
      <div className="Body-FORM">
        <div class="container">
          <div class="form">
            <img src="./images/a-1.png" alt="" />
            <h1>Create Item</h1>
            <div class="container-form">
              <input
                value={title}
                type="text"
                placeholder="Title"
                required
                onChange={Title}
              />
              <input type="file" onChange={handleChange} />
              <textarea
                value={details}
                onChange={Details}
                class="textarea"
                name=""
                id=""
                cols="30"
                rows="5"
                placeholder="description"
              ></textarea>
              <div class="clearfix">
                <button
                  type="submit"
                  className="signupbtn"
                  onClick={handelUpload}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateItem;
