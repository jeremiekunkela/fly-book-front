
import Filter from "../../components/Filter/Filter";
import styles from "./HomePage.module.css";
import { useState, useEffect } from 'react';
import client from "../../api";
import { useAlert } from "../../context/Alert";


const HomePage = () => {
  const [airports, setAirports] = useState([]);
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [departureAirport, setDepartureAirport] = useState('');
  const [enableSearch, setEnableSearch] = useState(false);
  const { showAlert,  } = useAlert();

useEffect(() => {
  client.get('/airport/all')
    .then((response) => {
      setAirports(response.data);
    })
    .catch((error)=> {
      showAlert('Error while getting airport', 'error');
      console.error('Get airports error:', error);
    })
}, []);


  useEffect(() => {
    if (departureAirport && arrivalAirport) {
      setEnableSearch(true);
    } else {
      setEnableSearch(false);
    }
  }, [departureAirport, arrivalAirport]);

  const search = () => {
    if(enableSearch) {
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
        </div>
    );
};

export default HomePage;
