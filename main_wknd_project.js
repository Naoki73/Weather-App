console.log('Weather Project')

let showWeather;


// Weather API Client Creds
// const clientId = "73b74394d1244b23a7f71831a72f1562";
// const clientSecret = "dc5ce45273fb4da198c6fb0eb3ddac94";

const getFormData = async (e) => {
    e.preventDefault();
    const city_name = e.target.city_name.value;
    const API_key = '1ce4839b5e421be7915f56aff34a7c4f'

    console.log(city_name)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}`;

    const res = await fetch(url);
    const data = await res.json();

    let temp = data.main.temp;
    temp = Math.round(1.8*(temp-273)+32);
    console.log(temp)
    let realfeel = data.main.feels_like;
    realfeel = Math.round(1.8*(realfeel-273)+32);

    const weather = data.weather[0];
    const description = weather.description;

    let low = data.main.temp_min;
    low = Math.round(1.8*(low-273)+32);
    let high = data.main.temp_max;
    high = Math.round(1.8*(high-273)+32);
   


    
    

    const myData =  {
        temp: temp,
        realfeel: realfeel,
        description: description,
        low: low,
        high: high
    }

    addToPage(myData)
    

    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    //     },
    //     body: 'grant_type=client_credentials'
    // });

    // // Access the data given to us by the fetch response (Promise)
    // const data = await result.json();
    // return data.access_token
};

const addToPage = (p) => {
    console.log(p, 'print p')
    const card = document.createElement('div');
    card.innerHTML = `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Temperature: ${p.temp}°F</h5>
      <h5 class="card-title">Real feel: ${p.realfeel}°F</h5>
      <h5 class="card-title">Description: ${p.description}</h5>
      <h5 class="card-title">Low: ${p.low}°F</h5>
      <h5 class="card-title">High: ${p.high}°F</h5>

    </div>
  </div>
    `
    const container = document.querySelector('.infocontainer');
    if (container.innerHTML !== ''){
        container.innerHTML = ''
    }
    container.append(card)
};

const myForm = document.getElementById('myForm');
myForm.addEventListener('submit', getFormData)