import Filter from "../../components/Filter/Filter";
import styles from "./HomePage.module.css";
import { useState, useEffect } from "react";
import client from "../../api";
import { useAlert } from "../../context/Alert";
import { Card } from "../../components/Card/Card";
import ExchangeRateSelector from "../../components/ExchangeRateSelector/ExchangeRateSelector";
import currencySymbolMapping from "../../currencySymbolMapping";

const HomePage = () => {
  const [airports, setAirports] = useState([]);
  const [flights, setFlights] = useState([]);
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [exchangeRates, setExchangeRates] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(exchangeRates[0]);
  const { showAlert } = useAlert();


  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const airportResponse = await client.get("/airport/all");
        setAirports(airportResponse.data);

        const flightResponse = await client.get("/flight/all");
        setFlights(flightResponse.data);

        const exchangeRateResponse = await client.get("/currencies/fetch-rates"); 
        setExchangeRates(exchangeRateResponse.data);

        if (exchangeRateResponse.data.length > 0) {
          setExchangeRate(exchangeRateResponse.data[0]);
        }
        
      } catch (error) {
        showAlert("Error while fetching data", "error");
        console.error("Fetch data error:", error);
      }
    };

    fetchInitialData();
  }, [showAlert]);

  const search = async () => {
    if (!departureAirport || !arrivalAirport) return;

    try {
      const response = await client.post("/flight/search", {
        departureAirport,
        arrivalAirport,
      });
      setFlights(response.data);
    } catch (error) {
      showAlert("Error while searching flights", "error");
      console.error("Search flights error:", error);
    }
  };

  

  const convertedFlights = flights.map((flight) => ({
    ...flight,
    priceConverted: Math.round(flight.price * exchangeRate?.rate),
    symbol: currencySymbolMapping[exchangeRate?.currency],
  }));

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Filter
          airports={airports}
          arrivalAirport={arrivalAirport}
          departureAirport={departureAirport}
          handleArrivalAirport={(event, newValue) => setArrivalAirport(newValue)}
          handleDepartureAirport={(event, newValue) => setDepartureAirport(newValue)}
          enableSearch={!!(departureAirport && arrivalAirport)}
          onSearch={search}
        />
        <ExchangeRateSelector
          exchangeRates={exchangeRates}
          handleExchangeRate={(event, newValue) => setExchangeRate(newValue)}
          exchangeRate={exchangeRate}
        />
      </div>
      <Card flights={convertedFlights} />
    </div>
  );
};

export default HomePage;
