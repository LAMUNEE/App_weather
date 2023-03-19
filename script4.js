

const apikey="9b60cc6ca6f2a69ad5123606a4dd23f9";
window.addEventListener("load",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            let lon= position.coords.longitude;
            let lat= position.coords.latitude;
            const url= `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` + `lon=${lon}&appid=${apikey}`;
            

            fetch(url).then((res)=>{
                return res.json();
            }).then((data)=>{
                console.log(data);
                
                weatherReport(data);
                
            })
        })
    }
})


function searchByCity(){
    var place= document.getElementById('input').value;
    var urlsearch= `http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apikey}`;

    fetch(urlsearch).then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);
        weatherReport(data);
    })
    document.getElementById('input').value='';
}

function weatherReport(data){

    var urlcast= `http://api.openweathermap.org/data/2.5/forecast?q=${data.name}&` + `appid=${apikey}`;

    fetch(urlcast).then((res)=>{
        return res.json();
    }).then((forecast)=>{
        console.log(forecast.city);
        // hourForecast(forecast);
        // dayForecast(forecast)

        console.log(data);
        document.getElementById('city').innerText= data.name;
        // console.log(data.name,data.sys.country);
    
        console.log(Math.floor(data.main.temp-273));
        document.getElementById('temp').innerText= Math.floor(data.main.temp-273)+ ' °C';
    
        document.getElementById('weather').innerText= data.weather[0].description;
        console.log(data.weather[0].description)
        
        let icon1= data.weather[0].icon;
        let iconurl= "http://api.openweathermap.org/img/w/"+ icon1 +".png";
        document.getElementById('img').src=iconurl;
    })

}



