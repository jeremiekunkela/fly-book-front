
import Filter from "../../components/Filter/Filter";
import styles from "./HomePage.module.css";
import airports from '../../airports';
import { useState, useEffect } from 'react';


const HomePage = () => {
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [departureAirport, setDepartureAirport] = useState('');
  const [date, setDate] = useState(null);
  const [enableSearch, setEnableSearch] = useState(false);


  useEffect(() => {
    if (departureAirport && arrivalAirport && date) {
      setEnableSearch(true);
    } else {
      setEnableSearch(false);
    }
  }, [departureAirport, arrivalAirport, date]);

  console.log('departureAirport:', departureAirport);
  console.log('arrivalAirport:', arrivalAirport);
  console.log('date:', date);
  

    return (
        <div className={styles.container}>
          <Filter 
            airports={airports}
            arrivalAirport={arrivalAirport}
            departureAirport={departureAirport}
            date={date}
            handleDate={(newValue) => setDate(newValue)}
            handleArrivalAirport={(event, newValue) => setArrivalAirport(newValue)}
            handleDepartureAirport={(event, newValue) => setDepartureAirport(newValue)}
            enableSearch={enableSearch}
            />
        </div>
    );
};

export default HomePage;
