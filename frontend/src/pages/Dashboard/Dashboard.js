import React, { useState, useEffect, useMemo } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";

import api from "../../services/api";
import socketio from "socket.io-client";
import Slider from "react-slick";
import Experience from "../../components/Experience/Experience";
import Video from "../../components/Video/Video";
import { Container, Modal, Button} from "react-bootstrap";
import Header from "../../components/Header/Header";

const Dashboard = () => {
  const [spots, setSpots] = useState([]);
  const [citySpots, setcitySpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem("user");
  const socket = useMemo(
    () =>
      socketio("http://localhost:3333", {
        query: { user_id }
      }),
    [user_id]
  );

  useEffect(() => {
    socket.on("booking_request", data => {
      setRequests([...requests, data]);
    });
  }, [requests, socket]);

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

  useEffect(() => {
    async function loadCitySpots() {
      const response = await api.get(`/spots`, {
        params: {
          city: "São Paulo"
        }
      });
      setcitySpots(response.data);
    }
    loadCitySpots();
  }, []);

  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approvals`);
    setRequests(requests.filter(request => request._id !== id));
  }
  async function handleReject(id) {
    await api.post(`/bookings/${id}/rejections`);
    setRequests(requests.filter(request => request._id !== id));
  }

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
    <div className="containerDashboard">

      <Header />

      <ul className="notifications">
        {requests.map(request => (
          <Modal.Dialog>
            <li key={request._id}>
              <Modal.Header>
                <Modal.Title>
                  Você tem uma nova solicitação
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
              <strong>{request.user.email}</strong> está solicitando uma
                  reserva em <strong>{request.spot.title}</strong> para a data:{" "}
                  <strong>{request.date}</strong>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  className="accept"
                  onClick={() => handleAccept(request._id)}
                >
                  Aceitar
                </Button>
                <Button
                  className="reject"
                  onClick={() => handleReject(request._id)}
                >
                  Rejeitar
                </Button>
              </Modal.Footer>
            </li>
          </Modal.Dialog>
        ))}
      </ul>

      <Experience />

      <div className="contentDashboard">
        <Container>
          <h2 className="ferias">Recomendaciones</h2>
          <div className="spot-list">
            <Slider {...settings}>
              {spots.map(spot => (

                     <Link to="/propiedad">
                                <div>
                  <div className="contentSpots">
                    <div className="Image">
                      <header
                        style={{
                          backgroundImage: `url(${spot.thumbnail_url})`
                          
                        }}
                       />
                    </div>
                    
                    <div className="spots">
                      <strong>{spot.title}</strong>
                      <p>{spot.city}</p>
                      <span>
                        {spot.price ? `R$${spot.price}/dia` : "GRATUITO"}
                      </span>
                    </div>
                  </div>
                </div>
                 </Link>
   
              ))}
            </Slider>
          </div>
        </Container>
        <Container>
          <h2 className="ferias">Cerca de ti:</h2>
          <div className="spot-list">
            <Slider {...settings}>
              {spots.map(spot => (
                
                     <Link to="/propiedad">
                                <div>
                  <div className="contentSpots">
                    <div className="Image">
                      <header
                        style={{
                          backgroundImage: `url(${spot.thumbnail_url})`
                          
                        }}
                       />
                    </div>
                    
                    <div className="spots">
                      <strong>{spot.title}</strong>
                      <p>{spot.city}</p>
                      <span>
                        {spot.price ? `R$${spot.price}/dia` : "GRATUITO"}
                      </span>
                    </div>
                  </div>
                </div>
                 </Link>
   
              ))}
            </Slider>
          </div>
        </Container>
      </div>

      <Container>
        <h2 className="ferias">Como funciona?</h2>
       
      </Container>
    </div>
  );
};

export default Dashboard;
