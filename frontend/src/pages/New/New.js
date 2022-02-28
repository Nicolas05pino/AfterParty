import React, { useState, useMemo } from "react";
import camera from "../../assets/camera.svg";
import logo from "../../assets/1.png";

import "./New.css";

import api from "../../services/api";

const New = ({ history }) => {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [itens, setItens] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    const user_id = localStorage.getItem("user");

    data.append("thumbnail", thumbnail);
    data.append("title", title);
    data.append("city", city);
    data.append("itens", itens);

    data.append("price", price);
    await api.post("/spots", data, {
      headers: { user_id }
    });

    history.push("/dashboard");
  }

  return (
      <div className="background">
    <div className="containerNew">
      {/* <img src={logo} alt="airbnb" id="logoAirbnb" /> */}
      <div className="contentNew">
        <form onSubmit={handleSubmit}>
          <label
            id="thumbnail"
            style={{ backgroundImage: `url(${preview})` }}
            className={thumbnail ? "has-thumbnail" : ""}
          >
            <input
              type="file"
              onChange={e => setThumbnail(e.target.files[0])}
            />
            <img src={camera} alt="Select img" />
          </label>

          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            placeholder=" Asigna un título a la propiedad"
            onChange={e => setTitle(e.target.value)}
          />
      

          <label htmlFor="city">Dirección</label>
          <input
            type="text"
            id="city"
            value={city}
            placeholder="Añade la dirección del lugar"
            onChange={e => setCity(e.target.value)}
          />

          <label htmlFor="itens">Especificaciones</label>
          <input
            type="text"
            id="itens"
            value={itens}
            placeholder="Con que requerimientos cuentas?"
            onChange={e => setItens(e.target.value)}
          />
          <label htmlFor="city">Máximo número de personas</label>
          <input
            type="text"
            id="city"
            value={city}
            placeholder="Máximo # de personas que puedes albergar"
            onChange={e => setCity(e.target.value)}
          />

          <label htmlFor="price">Precio por ...</label>
          <input
            type="text"
            id="price"
            value={price}
            placeholder="Valor cobrado por ..."
            onChange={e => setPrice(e.target.value)}
          />

          <button type="submit" className="btn">
            Publicar
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default New;
