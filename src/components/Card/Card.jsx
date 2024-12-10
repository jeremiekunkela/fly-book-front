import { useState } from "react";
import "./Card.scss";
import Modal from "../Modal/Modal";

export const Card = (props) => {
  const { flights, exchangeRate } = props;

  const [open, setOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null); 
  const handleOpen = (flight) => {
    setSelectedFlight(flight); 
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedFlight(null); 
    setOpen(false);
  };

  return (
    <>
      <div>
        {flights.map((flight) => (
          <div className="container-cards" key={flight.id}>
            <div className="box-nameAirport-date">
              <div className="nameAirport-date">
                <h3>{flight.departureAirport.airportName}</h3>
              </div>
              <div className="seperator"></div>
              <div className="nameAirport-date">
                <h3>{flight.arrivalAirport.airportName}</h3>
              </div>
              <div className="price">
                {flight.priceConverted}
                {flight.symbol}
              </div>
              <button className="button-book" onClick={() => handleOpen(flight)}>
                Book
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedFlight && ( 
        <Modal
          open={open}
          handleClose={handleClose}
          flight={selectedFlight} 
          exchangeRate={exchangeRate}
        />
      )}
    </>
  );
};
