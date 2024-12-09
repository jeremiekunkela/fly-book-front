import './Card.scss'

export const Card = (props) => {
const { flights } = props


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
                        <div className="price">{flight.priceConverted}{flight.symbol}</div>
                        <button className='button-book'>Book</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
