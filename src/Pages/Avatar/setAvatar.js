import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import spinner from "../../assets/gg.gif";
import "./avatar.css";
import { Button } from "react-bootstrap";
import { setAvatarAPI } from "../../utils/ApiRequest.js";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const { uniqueNamesGenerator, animals, colors, countries, names, languages } = require("unique-names-generator");

const SetAvatar = () => {
  const sprites = [
    "adventurer", "micah", "avataaars", "bottts", "initials", "adventurer-neutral",
    "big-ears", "big-ears-neutral", "big-smile", "croodles", "identicon",
    "miniavs", "open-peeps", "personas", "pixel-art", "pixel-art-neutral", "identicon"
  ];

  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [selectedSprite, setSelectedSprite] = useState(sprites[0]);
  
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);

  const randomName = () => {
    return uniqueNamesGenerator({
      dictionaries: [animals, colors, countries, names, languages],
      length: 2,
    });
  };

  const [imgURL, setImgURL] = useState([
    `https://api.dicebear.com/7.x/${selectedSprite}/svg?seed=${randomName()}`,
    `https://api.dicebear.com/7.x/${selectedSprite}/svg?seed=${randomName()}`,
    `https://api.dicebear.com/7.x/${selectedSprite}/svg?seed=${randomName()}`,
    `https://api.dicebear.com/7.x/${selectedSprite}/svg?seed=${randomName()}`,
  ]);

  const handleSpriteChange = (e) => {
    const newSprite = e.target.value;
    setSelectedSprite(newSprite);
    setLoading(true);
    
    const imgData = Array(4).fill(null).map(() =>
      `https://api.dicebear.com/7.x/${newSprite}/svg?seed=${randomName()}`
    );

    setImgURL(imgData);
    setLoading(false);
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.post(`${setAvatarAPI}/${user._id}`, {
      image: imgURL[selectedAvatar],
    });

    if (data.isSet) {
      user.isAvatarImageSet = true;
      user.avatarImage = data.image;
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Avatar selected successfully");
      navigate("/");
    } else {
      toast.error("Error setting avatar. Please try again.");
    }
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "#000" } },
          fpsLimit: 60,
          particles: {
            number: { value: 200, density: { enable: true, value_area: 800 } },
            color: { value: "#ffcc00" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: { enable: true, minimumValue: 1 } },
            move: { enable: true, speed: 2 },
          },
          detectRetina: true,
        }}
      />
      {loading ? (
        <div className="container containerBox">
          <div className="avatarBox">
            <img src={spinner} alt="Loading" />
          </div>
        </div>
      ) : (
        <div className="container containerBox">
          <div className="avatarBox">
            <h1 className="text-center text-white mt-5">Choose Your Avatar</h1>
            <div className="container">
              <div className="row">
                {imgURL.map((image, index) => (
                  <div key={index} className="col-lg-3 col-md-6 col-6">
                    <img
                      src={image}
                      alt="avatar"
                      className={`avatar ${selectedAvatar === index ? "selected" : ""} img-circle imgAvatar mt-5`}
                      onClick={() => setSelectedAvatar(index)}
                      width="100%"
                      height="auto"
                    />
                  </div>
                ))}
              </div>
            </div>
            <select onChange={handleSpriteChange} className="form-select mt-5">
              {sprites.map((sprite, index) => (
                <option value={sprite} key={index}>{sprite}</option>
              ))}
            </select>
            <Button onClick={setProfilePicture} type="submit" className="mt-5">
              Set as Profile Picture
            </Button>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default SetAvatar;
