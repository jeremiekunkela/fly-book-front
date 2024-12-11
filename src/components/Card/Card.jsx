import { useState } from "react";
import style from "./Card.module.css";
import Modal from "../Modal/Modal";
import { Button, Chip, Pagination } from "@mui/material";
import flightImage from "../../static/images/flight.jpg";

export const Card = (props) => {
  const { flights, exchangeRate } = props;
  const [open, setOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(flights.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFlights = flights.slice(startIndex, startIndex + itemsPerPage);

  const handleOpen = (flight) => {
    setSelectedFlight(flight);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedFlight(null);
    setOpen(false);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className={style.cardContainer}>
        {paginatedFlights.map((flight, index) => {
          const {
            departureAirport, arrivalAirport, priceConverted, symbol
          } = flight;
          const { airportName: departureAirportName } = departureAirport;
          const { airportName: arrivalAirportName } = arrivalAirport;

          return (
            <div className={style.card} key={index}>
              <img
                className={style.cardImage}
                src={flightImage}
                alt={`Flight from ${departureAirportName} to ${arrivalAirportName}`}
              />
              <div className={style.cardContent}>
                <div className={style.cardBody}>
                  <div className={style.cardTitle}>
                    <Chip 
                      label={`${departureAirportName} ➔ ${arrivalAirportName}`}
                      color="secondary" 
                    />
                  </div>
                  <div className={style.cardPrice}>
                    {`${priceConverted}${symbol}`} 
                  </div>
                </div>
                <div className={style.cardFooter}>
                  <Button
                    variant="outlined"
                    sx={{borderRadius: "20px"}}
                    color="primary"
                    size="small"
                    onClick={() => handleOpen(flight)}
                  >
                    Book
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={style.paginationContainer}>
        <Pagination 
          count={totalPages} 
          page={currentPage} 
          onChange={handlePageChange} 
          color="primary" 
          sx={{ mt: 2, display: "flex", justifyContent: "center" }}
        />
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
