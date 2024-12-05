import React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import axios from "../utils/apiClient"

const FilterFlight = () => {
    // const [formData, setFormData] = useState({
    //     arrivalCity: '',
    //     departureDate: '',
    //     arrivalDate: '',
    // });

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     axios.post('/flights/client/find', formData)
    //         .then((res) => {
    //             console.log("search flight res: ", res);
    //             onSearch(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         }); 
    // };

    // const handleChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value
    //     });
    // };

    return (
        <form className="relative top-[4rem] bg-white p-6 w-[80%] grid grid-cols-2 gap-4 md:grid-cols-6 rounded-lg">
            <Autocomplete
                disablePortal
                sx={{ width: 300 }}
                renderInput={(params) => <TextFied {...params} label="Movie" />}
            />
            <Autocomplete
                disablePortal
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Movie" />}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Basic date picker" />
                </DemoContainer>
            </LocalizationProvider>
        </form>
    );
};

export default FilterFlight;
