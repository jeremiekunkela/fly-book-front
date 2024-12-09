
import Filter from "../../components/Filter/Filter";
import styles from "./HomePage.module.css";
import { useState, useEffect } from 'react';
import client from "../../api";
import { Card } from "../../components/Card/Card";

const HomePage = () => {
  const [airports, setAirports] = useState([]);
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [departureAirport, setDepartureAirport] = useState('');
  const [enableSearch, setEnableSearch] = useState(false);

  useEffect(() => {
    client.get('/airport/all').then((response) => {
      setAirports(response.data);
    });
  }, []);

  useEffect(() => {
    if (departureAirport && arrivalAirport) {
      setEnableSearch(true);
    } else {
      setEnableSearch(false);
    }
  }, [departureAirport, arrivalAirport]);

  const search = () => {
    if (enableSearch) {
      client.get('/flights/search', {
        params: {
          departureAirport: departureAirport,
          arrivalAirport: arrivalAirport,
        },
      }).then((response) => {
        console.log(response.data);
      });
    }
  };

  return (
    <div className={styles.container}>
      <Filter
        airports={airports}
        arrivalAirport={arrivalAirport}
        departureAirport={departureAirport}
        handleArrivalAirport={(event, newValue) => setArrivalAirport(newValue)}
        handleDepartureAirport={(event, newValue) => setDepartureAirport(newValue)}
        enableSearch={enableSearch}
        onSearch={search}
      />
      <Card />
    </div>
  );
};

export default HomePage;
