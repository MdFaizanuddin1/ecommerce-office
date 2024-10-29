import axios from "axios";
import { useEffect, useState } from "react";

const HealthCheck = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/api/v1/healthCheck")
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(data.data.message);
  console.log(data.status);

  return (
    <div>
      HealthCheck
      <h1>{data.status}</h1>
      <h3>{data.data.message}</h3>
    </div>
  );
};

export default HealthCheck;
