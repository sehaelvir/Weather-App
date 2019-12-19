
const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        
const searchCity = document.querySelector('#searchCity');
//const showCity = document.querySelector('#result h1');
const showCondition = document.querySelector('.condition');
const icon = document.querySelector('.icon');
const search = document.querySelector('#search');
const showWeatherOneDay = document.getElementById('showWeatherOneDay');
const showCityName = document.getElementById('cityName');
const showNextFiveDays = document.getElementById('table-responsive');

search.addEventListener('click', function(e){
    e.preventDefault();
    
    var city = new openAPI();

    const searchText = document.querySelector('#searchCity').value;
        if (searchText == '') {
            $("#searchCity").attr("placeholder", "Please enter City name")
        }else{
            
        city.search(searchText).then(data => {
        
        document.getElementById('naslov').innerHTML = data.error;
       
        //console.log(data)
        const tempC = Math.floor(data.main.temp);
        const tempF = Math.floor(tempC * 1.8 + 32);
        const minTemp = Math.floor(data.main.temp_min);
        const maxTemp = Math.floor(data.main.temp_max);
        const dt = new Date(data.dt * 1000);

        var results = {
            condition : data.weather[0].main,
            icon : 'icons/' + data.weather[0].icon + '.png',
            tempC : tempC,
            tempF : tempF,
            minTemp : minTemp,
            maxTemp : maxTemp,
            pressure: data.main.pressure,
            humidity : data.main.humidity,
            datum : data.dt * 1000,
            city : data.name
        }
         let outputLeft = '';
         let outputRight = '';
         outputLeft += `
                        <img src="${results['icon']}" style="width: 100px">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Description: ${results['condition']}</li>
                            <li class="list-group-item">Min temp: ${minTemp}°C</li>
                            <li class="list-group-item">Max temp: ${maxTemp}°C</li>
                            <li class="list-group-item">Pressure: ${results['pressure']}hPa</li>
                            <li class="list-group-item">Humidity: ${results['humidity']}%</li>
                        </ul>
                    `;

        outputRight += `
                       <h1 class="text-center" style="font-size: 90px;">${results['city']}, ${data.sys.country}</h1>
                       <h2 class="text-center"  style="font-size: 100px;">${results['tempC']}°C</h2>   
                       <p class="text-center">${days[dt.getDay()]}, ${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}</p> 
                    `;
                             
         showWeatherOneDay.innerHTML = outputLeft;
         showCityName.innerHTML = outputRight;
         document.querySelector('#searchCity').value = '';
        
    })  
    city.searchFiveDays(searchText).then(data => {
        if(data.error)
           document.getElementById('naslov').innerHTML = data.error;
           else
           document.getElementById('naslov').innerHTML = '';
        let table = '';

        table += `
        <table class="table table-dark table-hover">
            <thead class="thead-inverse">
            <tr>
                <th class="w-15">Days</th>
                <th class="">Weather</th>
                <th class="">Temperature</th>
                <th class="">Description</th>
                <th class="">Min temp</th>
                <th class="">Max Temp</th>
                <th class="">Pressure</th>
                <th class="">Humidity</th>
                <th class="">Wind Speed</th>
                </tr>
        </thead><tbody>`;
         for (var i = 5; i < data.list.length; i += 8) {   
         //console.log(data.list[i])
                const td = new Date(data.list[i].dt * 1000);  
        //console.log(data.list[i].dt_txt)        
        table += ` <tr>`
        table += `<td class="w-15 option">${days[td.getDay()]}</td>`
        
        table +=  `<td class=""><img src='icons/${data.list[i].weather[0].icon}.png' style="width: 50px;"></td>`
        table +=  `<td class="text-center">${Math.floor(data.list[i].main.temp)}°C</td>`
        table +=  `<td class="text-center">${data.list[i].weather[0].description}</td>`
        table +=  `<td class="text-center">${Math.floor(data.list[i].main.temp_min)}°C</td>`
        table +=  `<td class="text-center">${Math.floor(data.list[i].main.temp_max)}°C</td>`
        table +=  `<td class="text-center">${Math.floor(data.list[i].main.pressure)}hPa</td>`
        table +=  `<td class="text-center">${data.list[i].main.humidity}%</td>`
        table +=  `<td class="text-center">${data.list[i].wind.speed}m/s</td>`
        table +=  `</tr>`;
      }              
        table += `</tbody></table>`

        showNextFiveDays.innerHTML = table;
        
    }) 
 }

})


getLocation();

function getLocation(){

    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(success, fail)
    }
}

function success(position){
   
    var cityLocation = new openAPI();

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    
    cityLocation.getCityLocation(lat,lon).then(data => {
       const humidity = data.main.humidity
        cityLocation.search(data.name).then(data => {
            const tempC = Math.floor(data.main.temp);
            const tempF = Math.floor(tempC * 1.8 + 32);
            const minTemp = Math.floor(data.main.temp_min);
            const maxTemp = Math.floor(data.main.temp_max);
            const dt = new Date(data.dt * 1000);

        var results = {
            condition : data.weather[0].main,
            icon : 'icons/' + data.weather[0].icon + '.png',
            tempC : tempC,
            tempF : tempF,
            minTemp : minTemp,
            maxTemp : maxTemp,
            pressure: data.main.pressure,
            humidity : data.main.humidity,
            datum : data.dt * 1000,
            city : data.name
        }
        
         let outputLeft = '';
         let outputRight = '';
         outputLeft += `
                        <img src="${results['icon']}" style="width: 100px">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Description: ${results['condition']}</li>
                            <li class="list-group-item">Min temp: ${minTemp}°C</li>
                            <li class="list-group-item">Max temp: ${maxTemp}°C</li>
                            <li class="list-group-item">Pressure: ${results['pressure']}hPa</li>
                            <li class="list-group-item">Humidity: ${humidity}%</li>
                        </ul>
                    `;

        outputRight += `
                          <h1 class="text-center" style="font-size: 100px;">${results['city']}, ${data.sys.country}</h1>
                         <h2 class="text-center" style="font-size: 100px;">${results['tempC']}°C</h2>  
                         <p class="text-center">${days[dt.getDay()]}, ${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}</p> 
                         `;
 
         showWeatherOneDay.innerHTML = outputLeft;
         showCityName.innerHTML = outputRight;
        })
       
    })
}

function fail(){
    alert('Geolocation do not supports for your browser');
}
 
