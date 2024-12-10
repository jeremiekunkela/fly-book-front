import { useState } from "react";
import "./Card.scss";
import Modal from "../Modal/Modal";

export const Card = (props) => {
  const { flights } = props;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              <button className="button-book" onClick={handleOpen}>
                Book
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={open} handleClose={handleClose} />
    </>
  );
};
