import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const List = () => {
  const [list, setList] = useState([]);
  const [goBack, setGoBack] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const url = "http://localhost:3001/api/v1/ufvalues";
      await axios
        .get(url)
        .then((response) => {
          const { data } = response;
          setList(data);
        })
        .catch((err) => console.error(err));
    };
    fetch();
  }, []);

  const dateHourFormat = (date) => {
    const d = new Date(date);
    const dayHour = d.toLocaleString("es-CL", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return dayHour;
  };

  const history = () => {
    const thead = [
      "fecha y hora",
      "usuario",
      "monto origen",
      "fecha conversion",
      "valor moneda",
      "monto conversion",
    ];
    return (
      <div>
        {goBack && <Navigate path="/uf/historia" to="/uf/conversion" />}
        <button onClick={() => setGoBack(true)}>volver atras</button>
        <table>
          <thead>
            <tr>
              {thead.map((th, i) => (
                <th key={i}>{th.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list?.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{dateHourFormat(item?.createdAt)}</td>
                  <td>{item?.user?.username}</td>
                  <td>{item?.originAmount}</td>
                  <td>{item?.conversionDate}</td>
                  <td>{item?.clpValue}</td>
                  <td>{item?.conversionAmount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  return <div>{history()}</div>;
};

export default List;
