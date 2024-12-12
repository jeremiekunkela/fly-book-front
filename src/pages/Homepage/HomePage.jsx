import Filter from "../../components/Filter/Filter";
import styles from "./HomePage.module.css";
import { useState, useEffect } from "react";
import client from "../../api";
import { useAlert } from "../../context/Alert";
import { Card } from "../../components/Card/Card";
import ExchangeRateSelector from "../../components/ExchangeRateSelector/ExchangeRateSelector";
import currencySymbolMapping from "../../currencySymbolMapping";
import CircularProgress from '@mui/material/CircularProgress';

const HomePage = () => {
  const [airports, setAirports] = useState([]);
  const [flights, setFlights] = useState([]);
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [exchangeRates, setExchangeRates] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(exchangeRates[0]);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const airportResponse = await client.get("/v1/airport/");
        setAirports(airportResponse.data);

        const flightResponse = await client.get("/v1/flight/");
        setFlights(flightResponse.data);

        const exchangeRateResponse = await client.get("/v1/currencies/");
        setExchangeRates(exchangeRateResponse.data);

        if (exchangeRateResponse.data.length > 0) {
          setExchangeRate(exchangeRateResponse.data[0]);
        }
      } catch (error) {
        showAlert("Error while fetching data", "error");
        console.error("Fetch data error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [showAlert]);

  const search = async () => {
    if (!departureAirport || !arrivalAirport) return;

    setIsLoading(true);
    try {
      const response = await client.post("/v1/flight/search", {
        departureAirport,
        arrivalAirport,
      });
      setFlights(response.data);
    } catch (error) {
      showAlert("Error while searching flights", "error");
      console.error("Search flights error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearFilters = async () => {
    setDepartureAirport("");
    setArrivalAirport("");
    setIsLoading(true);  
    try {
      const response = await client.get("/v1/flight");
      setFlights(response.data); 
    } catch (error) {
      showAlert("Error while fetching all flights", "error");
      console.error("Fetch all flights error:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  const convertedFlights = flights.map((flight) => ({
    ...flight,
    priceConverted: (flight.price * exchangeRate?.rate).toFixed(2),
    symbol: currencySymbolMapping[exchangeRate?.currency],
  }));

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className={styles.filters}>
            <Filter
              airports={airports}
              arrivalAirport={arrivalAirport}
              departureAirport={departureAirport}
              handleArrivalAirport={(event, newValue) => setArrivalAirport(newValue)}
              handleDepartureAirport={(event, newValue) => setDepartureAirport(newValue)}
              enableSearch={Boolean(departureAirport && arrivalAirport)}
              onSearch={search}
              onClear={clearFilters}  
            />
            <ExchangeRateSelector
              exchangeRates={exchangeRates}
              handleExchangeRate={(event, newValue) => setExchangeRate(newValue)}
              exchangeRate={exchangeRate}
            />
          </div>
          <Card flights={convertedFlights} exchangeRate={exchangeRate} />
        </>
      )}
    </div>
  );
}

export default HomePage;
