async function search(a) {
    let t = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=faac08896a834e8f839154805211609&q=${a}&days=3`);
    if (t.ok && 400 != t.status) {
        let a = await t.json();

        displayCurrent(await a.location, await a.current),displayAnother(a.forecast.forecastday)
        console.log(a, "a");
    }
}
search("Egypt");

document.getElementById("search").addEventListener("keyup", a => { search(a.target.value) });

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function displayCurrent(a, t) {

    if (null != t) {
        var e = new Date(t.last_updated.replace(" ", "T"));
        let n = `<div class="today forecast ">\n  
      <div class="forecast-header"  id="today">\n   
       <div class="day text-white">${days[e.getDay()]}</div>\n  
         <div class=" date text-white">${e.getDate() + monthNames[e.getMonth()]}</div>\n  
           </div> \x3c!-- .forecast-header --\x3e\n   
            <div class="forecast-content col-md-4" id="current">\n   
             <div class="country text-white fs-4">${a.name}</div>\n   
              <div class="degree">\n     
                <div class="num">${t.temp_c}<sup>o</sup>C</div>\n      \n     
                   <div class="forecast-icon">\n      
                         <img src="https:${t.condition.icon}" alt="" width=90>\n  
                               </div>\t\n    \n    </div>\n  
                           <div class="custom text-white fs-5 text-center">${t.condition.text}</div>\n    
                           <span class"text-white text-center "><img src="images/icon-umberella.png" alt="">20%</span>\n\t\t\t\t\t\t\t\t
                           <span class"text-white text-center"><img src="images/icon-wind.png" alt="">18km/h</span>\n\t\t\t\t\t\t\t\t
                           <span class"text-white text-center"><img src="images/icon-compass.png" alt="">East</span>\n 
                              </div>\n
                              </div>`;
        document.getElementById("forecast").innerHTML = n
        console.log(t.temp_c, "temp-c")
    }
}

function displayAnother(a) {
    let t = "";
    for (let e = 1; e < a.length; e++)t +=`\t<div class="forecast">\n        
    <div class="forecast-header">\n            
    <div class="day text-white">${days[new Date(a[e].date.replace(" ", "T")).getDay()]}
    </div>\n       
     </div> \x3c!-- .forecast-header --\x3e\n       
     <div class="forecast-content col-md-4">\n           
      <div class="forecast-icon">\n             
         <img src="https:${a[e].day.condition.icon}" alt="" width=48>\n     
                </div>\n           
                 <div class="degree text-white">${a[e].day.maxtemp_c}<sup>o</sup>C</div>\n   
                         <small class"text-white">${a[e].day.mintemp_c}<sup>o</sup></small>\n           
                          <div class="custom text-white">${a[e].day.condition.text}
                          </div>\n    
                              </div>\n      
                                </div>`;
    document.getElementById("forecast").innerHTML += t
} 