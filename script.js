

const btn = document.getElementById("get-weather-btn");

btn.addEventListener('click', ()=>{
  clearDisplay();
  const select = document.getElementById('city-select');
  showWeather(select.value);
});

function clearDisplay() {
    const clear = document.querySelector('.display');
  // clear.textContent = "";
}

function enterCity() {
    const msg = document.querySelector('.display');
    msg.textContent = "****Choose a drop down City !****";
    msg.style.textAlign = 'center';
    msg.style.marginTop = '25px';
    msg.style.color = "red";
    msg.style.fontWeight = "bold";
    msg.style.fontSize = '35px';
}

async function showWeather(city) {  
  try{
     
    //CALL GET WEATHER FUNCTION 
    const data = await getWeather(city);
    
    //1. WEATHER IMAGE/ICON
    const icon = document.getElementById('weather-icon');
    icon.src = !data.name ? 'N/A' : data.weather[0].icon;
    
    //2. MAIN TEMPERATURE
    const main = document.getElementById('main-temperature');
    main.innerHTML = !data.main.temp ? 'N/A' : data.main.temp + ' ℃';

    //3. FEELS LIKE WEATHER
    const feels = document.getElementById('feels-like');
    feels.innerHTML = !data.main.feels_like ? 'N/A' : 'Feels Like: ' + data.main.feels_like + ' ℃';

    //4. HUMIDITY
    const humidity = document.getElementById('humidity'); 
    humidity.innerHTML = !data.main.humidity ? 'N/A' : 'Humidity: ' + data.main.humidity + '%';
   
    //5. WIND SPEED
    const windSpeed = document.getElementById('wind'); 
    windSpeed.innerHTML = !data.wind.speed ? 'N/A' : 'Wind: ' + data.wind.speed + ' m/s';

    //6. WIND GUST
    const windGust = document.getElementById('wind-gust'); 
    windGust.innerHTML = !data.wind.gust ? 'N/A' : 'Gust: ' + data.wind.gust + ' m/s';

    //7. WEATHER TYPE/DESCRIPTION
    const weatherMain = document.getElementById('weather-main');
    weatherMain.innerHTML = !data.weather[0].main ? 'N/A' : data.weather[0].main ;

    //8. LOCATION CITY
    const location = document.getElementById('location');
    location.innerHTML = data.name;

    
    
    //CREATE HORIZONTAL LINE TO SEPARATE SECTIONS
    const content = document.querySelector('.content-info');
    const hr = document.createElement("hr");

    //HORIZONTAL LINE DIMENSION
    hr.style.border = "2px solid #ccc";
    hr.style.width = "100%";
    hr.style.margin = "10px 0";

    //PLACE HORIZONTAL LINE BEFORE THIRD CHILD
    const thirdChild = content.children[2];
    content.insertBefore(hr, thirdChild);


    
     }
  catch{
      const main = document.getElementById('main-temperature');
    main.innerHTML = 'N/A';
    const feels = document.getElementById('feels-like');
    feels.innerHTML = 'N/A';
    const humidity = document.getElementById('humidity'); 
    humidity.innerHTML = 'N/A';
    const windSpeed = document.getElementById('wind'); 
    windSpeed.innerHTML = 'N/A';
    const windGust = document.getElementById('wind-gust'); 
    windGust.innerHTML = 'N/A';
    const weatherMain = document.getElementById('weather-main');
    weatherMain.innerHTML = 'N/A';
    const location = document.getElementById('location');
    location.innerHTML = 'N/A';
    
    console.log("Something went wrong, please try again later");
    }
}


async function getWeather(city){
 try{
  if(city === ''){
   enterCity();
      throw new Error("No city chosen");
  }
  const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
  
  const data = await response.json();

  if(data.error){
      throw new Error(data.error);
  }
  return data;
 }
 catch(error){
    
  console.log(error);
  alert("Something went wrong, please try again later");
  }
 
}
