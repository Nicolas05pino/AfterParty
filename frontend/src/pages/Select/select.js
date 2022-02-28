
import airbnb from "../../assets/airbnb.png";
import "./select.css";
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import socketio from "socket.io-client";
import Slider from "react-slick";
import Experience from "../../components/Experience/Experience";
import Video from "../../components/Video/Video";
import { Container, Modal, Button} from "react-bootstrap";


const New = ({ history }) => {
  const [spots, setSpots] = useState([]);
  const user_id = localStorage.getItem("user");
  const socket = useMemo(
    () =>
      socketio("http://localhost:3333", {
        query: { user_id }
      }),
    [user_id]
  );
  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem("user");
      const response = await api.get("/list", {
        headers: { user_id }
      });
      setSpots(response.data);
    }
    loadSpots();
  }, []);
  

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 765,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  

  return (     

<div className="cardStyle">



<Link to="/New">
     <div className="Experience">
        {/* <img src={Bogotá} alt="" className="img"/> */}
        <p>Alquilar mi propiedad(Cobra solo por alquilar el lugar)</p>
      </div>
</Link>



<Link to="/">
      <div className="Experience">
        {/* <img src={Bogotá} alt="" className="img"/> */}
        <p>Anunciar un evento (cobra por las entradas al lugar mientras estás presente con tus amigos)</p>
      </div>
      </Link>


</div>

  );
};

export default New;
