import { useEffect, useState } from 'react';
import "./home.css"
const Home = ()=>{
    const [data,setData] = useState([]);
    const [search,setSearch] = useState("")
    const [error,setError] = useState(false);
    // useEffect(()=>{
    //     homeHandling();
    // },[])
    const homeHandling=(e)=>{
        e.preventDefault();
        let value = e.target.value
        setSearch(e.target.value)
        // const options = {
        //     method: 'GET',
        //     headers: {
        //         'X-RapidAPI-Key': 'f029116145msh0b0debd2189bf2fp1994cajsn73cbd65a99db',
        //         'X-RapidAPI-Host': 'rapidweather.p.rapidapi.com'
        //     }
        // };066eed2efec317145c0490861914e61c
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=0d038ed3980cf2432f78d78a92010698`)
            .then(response => response.json())
            .then(response =>
                {
                    console.log(response.name,response.main,response,response.humidity,response.sea_level,response.grnd_level)
                    if(response.message === "Nothing to geocode" || response.cod[0]=="4" || response.message === "city not found"){
                        return setError(true);
                    }
                    setError(false)
                    setData(response)
                } )
            .catch(err => console.error(err));
        // const options = {
        //     method: 'GET',
        //     headers: {
        //         'X-RapidAPI-Key': 'f029116145msh0b0debd2189bf2fp1994cajsn73cbd65a99db',
        //         'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
        //     }
        // };
        
        // fetch(`https://open-weather13.p.rapidapi.com/city/${search}`, options)
        //     .then(response => response.json())
        //     .then((response) =>{
        //         console.log(response);
        //         setError(false)
        //         // setData([response.name,response.main.temp,response.main.humidity])
        //     })
        //     .catch((err) =>{
        //         setError(true);
        //         console.error("catcherror",err)
        //     } );
    }
        const handling=()=>{
            // e.preventDefault();
            if(!search){
                return(
                    <div>

                    </div>
                )
            }
            else if(error){
                return(
                    <div className='valid_city'>
                        <h3>Enter valid city name</h3>
                    </div>
            )
            }
            else if(search){
               
                return(
                    <div className='content_inner'>
                         <div className='city'>Weather Details of City: {data.name}</div>
                <p>Current Temperature: {data.main?.temp}K</p>
                <p>Temperature Min: {data?.main?.temp_min}K</p>
                <p>Temperature Max: {data?.main?.temp_max}K</p>
                
                <p>Humidity: {data?.main?.humidity}</p>
                <p>Sea Level: {data?.main?.sea_level}</p>
                <p>Ground Level: {data?.main?.grnd_level}</p>
                {/* <p>Logitude: {data.coord.lon}</p> */}
                {/* <p>Wind Speed: {data.wind.speed}</p> */}
                    </div>
                )
            }
            else{
                return(
                    <div>
                        <h3>Enter valid city name</h3>
                    </div>
            )
            }
        }
   
    return(
        <div className='home_content'>
            <h1 className='weather'>Weather App</h1>
            <div className='input_box'>
            <input type={"text"} onChange={(e)=>{homeHandling(e)}} placeholder="Enter City Name" value={search}/>
            {/* <button onClick={(e)=>{homeHandling(e)}}>submit</button> */}

            {/* {(data.name) ? 
                
                <div>
                <p>Weather Details of City: {data.name}</p>
                <p>Current Temperature: {data.main.temp}</p>
                <p>Humidity: {data.main.humidity}</p>
                <p>Pressure: {data.main.pressure}</p>
                <p>Latitude: {data.coord.lat}</p>
                <p>Logitude: {data.coord.lon}</p>
                <p>Wind Speed: {data.wind.speed}</p>
            </div>
            
            
            :"Enter valid city name"} */}
            </div>
            {handling()}

        </div>
    )
}
export default Home;