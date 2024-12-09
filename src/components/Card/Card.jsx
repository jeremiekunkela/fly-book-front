import React, { useState, useEffect } from 'react'
import client from "../../api";
import './Card.scss'

export const Card = () => {
    const [flights, setFlights] = useState([]);
    useEffect(() => {
        client.get('/flight/all').then((response) => {
            setFlights(response.data);
        });
    }, []);

    console.log(flights);

    const handleButtonBook = async (event) => {

        // event.preventDefault();

        // try {
        //     const response = await client.post("/client/login", formData);
        //     setToken(response.data);

        //     navigate("/");
        // } catch (error) {
        //     showAlert('Error while signing up', 'error');
        //     console.error("Sign-up error:", error);
        // }
    }

    return (
        <div>
            {flights.map((flight) => (
                <div className="container-cards" key={flight.id}>
                    <div className="box-nameAirport-date">
                        <div className='nameAirport-date'>
                            <h3>{flight.departureAirport.airportName}</h3>
                        </div>
                        <div className="seperator"></div>
                        <div className='nameAirport-date'>
                            <h3>{flight.arrivalAirport.airportName}</h3>
                        </div>
                        <div className="price">{flight.price}€</div>
                        <button className='button-book' onClick={handleButtonBook}>Book</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
