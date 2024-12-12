import { useState, useEffect } from "react";
import client from "../../api";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./Reservation.module.css";
import COLUMNS from "../../components/Reservation/config";
import DataGridReservations from "../../components/Reservation/DataGridReservations";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Reservation() {
    const [reservations, setReservations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const response = await client.get("/v1/reservation");
                setReservations(response.data);
            } catch (error) {
                console.error("Error while fetching reservation:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReservation();
    }, []);


    const newReservations = reservations.map((reservation) => {
        const { 
            flight, 
            departureDate, 
            client, 
            profilDTOResponseList, 
            priceOfReservation 
        } = reservation;

        const { departureAirport, arrivalAirport, airplane } = flight;
        const { airportName: departureAirportName } = departureAirport;
        const { airportName: arrivalAirportName } = arrivalAirport;
        const { brand, model } = airplane;
        const { firstname, lastname } = client;

        const nbLugages = profilDTOResponseList
            .map((profilDTOResponse) => profilDTOResponse.nbLuggage)
            .reduce((acc, nbLugage) => acc + nbLugage, 0);

        return {
            departureAirportName,
            arrivalAirportName,
            departureDate,
            airplane: `${brand} ${model}`,
            client: `${firstname} ${lastname}`,
            passangers: profilDTOResponseList.length,
            nbLugages,
            price: priceOfReservation,
        };
    }) ?? [];

    const filteredReservations = newReservations.filter((reservation) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            reservation.departureAirportName.toLowerCase().includes(searchLower) ||
            reservation.arrivalAirportName.toLowerCase().includes(searchLower) ||
            reservation.client.toLowerCase().includes(searchLower) ||
            reservation.airplane.toLowerCase().includes(searchLower) ||
            reservation.passangers.toString().includes(searchLower) ||
            reservation.nbLugages.toString().includes(searchLower) ||
            reservation.price.toString().includes(searchLower) ||
            reservation.departureDate.toString().includes(searchLower)
        );
    });

    return (
        <div className={styles.container}>
            {reservations ? (
                <>
                    <SearchBar onSearch={setSearchTerm} />
                    <DataGridReservations 
                    reservations={filteredReservations} 
                    columns={COLUMNS}
                    loading={loading}
                    />
                </>
            ) : (
                <CircularProgress />
            )}
        </div>
    );
}
