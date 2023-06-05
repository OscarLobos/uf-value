import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Form = () => {
  const [data, setData] = useState({});
  const [indicators, setIndicators] = useState("");
  const [clpValue, setClpValue] = useState("");
  const [user, setUser] = useState({});
  const [showList, setShowList] = useState(false);
  const [conversionAmount, setConversionAmount] = useState("");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const fetch = () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      setUser(user);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (data?.conversionDate) {
        const date = new Date(data?.conversionDate);
        const day = date.toLocaleString("es-CL", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        });
        await axios
          .get(`https://mindicador.cl/api/uf/${day}`)
          .then((response) => {
            const { data } = response;
            setIndicators(data);
            setClpValue(data?.serie[0].valor);
            setShowButton(true);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    };
    fetch();
  }, [data]);

  const handleSubmit = (e) => {
    const person = user;
    e.preventDefault();
    id(data?.originAmount);
    setClpValue(indicators?.serie[0].valor);
    const total = Number(clpValue) * Number(data?.originAmount);
    setConversionAmount(total);
    const values = { total, userId: person?.id, clpValue: clpValue };

    store(values);
  };

  const store = async (values) => {
    const url = "http://localhost:3001/api/v1/ufvalues";
    await axios
      .post(url, { ...data, ...values })
      .then((response) => {
        if (response.status === 201) console.log("save conversion");
      })
      .catch((err) => console.error(err));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div>
      {showList && <Navigate path="/uf/conversion" to="/uf/historial" />}
      {user?.username === "admin" && (
        <button onClick={() => setShowList(true)}>
          Historia de conversiones
        </button>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="originAmount">Valo en UF</label>
        <input
          type="text"
          onChange={handleInput}
          name="originAmount"
          placeholder="Ingresa UF"
          defaultValue={data?.originAmount}
        />
        <label htmlFor="conversionDate">Fecha para la conversión</label>
        <input
          type="date"
          onChange={handleInput}
          name="conversionDate"
          defaultValue={data?.conversionDate}
        />
        <ul>
          <li>{`Valor Moneda: ${clpValue || "selecciona fecha"}`}</li>
          <li>{`Monto Conversión: ${conversionAmount || ""}`}</li>
        </ul>
        {/* <div>{indicators}</div> */}
        {showButton && <button type="submit">Convertir</button>}
      </form>
    </div>
  );
};

export default Form;
