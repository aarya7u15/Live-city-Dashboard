import { useEffect, useState } from "react";
import Weather from "./Weather";
import logo from "../photos/Mycity.png"; 
import sunny from "../photos/sunny-city.png";
import winter from "../photos/winter-city.png"


function Home({ setPage }) {
  const [wthr,setWthr] = useState({})
  const [units,setUnits] = useState({})
  const [show_login, setShow_login] = useState(false);
  const [name,setName] = useState("")
  const [pass,setPass] = useState("")
  const [email,setEmail] = useState("")
  const [msg,setMsg] = useState("")
  const [is_logged_in, setIs_logged_in] = useState(false);
  const [show_success, setShow_success] = useState(false);



  let symbl;

  useEffect(()=>{
    function getWeather() {
    fetch ("https://api.open-meteo.com/v1/forecast?latitude=28.7&longitude=77.2&current_weather=true")
    .then((res)=> res.json())
    .then((data)=> {
      let w = data.current_weather
      setWthr(w)
      let u = data.current_weather_units
      setUnits(u)
    })
    .catch((err) => {
          console.log("Weather fetch failed:", err);
        });
    }

    getWeather();

    let hola = setInterval(()=>{
      getWeather();
    },300000)

    return () => {
      clearInterval(hola);
    }
  },[])



let val = "sun";

if (wthr.temperature < 20) {
  val = "cold";
} else if (wthr.temperature < 26) {
  val = "sun";
} else if (wthr.temperature >= 26) {
  val = "hot";
}

if (wthr.temperature < 15) {
    symbl = <i class="fa-solid fa-snowflake" style={{ fontSize: "45px", paddingTop: "14px", color: "orange"}}></i>;
  } else if (wthr.temperature < 20) {
    symbl = <i class="fa-solid fa-cloud-rain" style={{ fontSize: "45px", paddingTop: "14px", color: "blue"}}></i>;
  }else if (wthr.windspeed>10) {
    symbl = <i class="fa-solid fa-wind" style={{ fontSize: "45px", paddingTop: "14px", color: "grey"}}></i>;
  } else if (wthr.temperature < 26) {
    symbl = <span class="material-symbols-outlined" style={{ fontSize: "45px", paddingTop: "14px", color: "yellow"}}>wb_sunny</span>;
  } else if (wthr.temperature >= 26) {
    symbl = <span className="material-symbols-outlined" style={{ fontSize: "45px", paddingTop: "14px", color: "orange"}}>sunny</span>;
  }


function checking_signup(e) {
  e.preventDefault();

  if (name === "" || pass === "" || email === "") {
    setMsg("Please enter all the fields...");
  } else if (pass.length <= 8) {
    setMsg("password length should be > 8");
  } else {
  setMsg("");
  setIs_logged_in(true);
  setShow_login(false);
  setShow_success(true);
}

}











  return (

    
    <div>
        <nav className="home_navbar">
          <div className="nav_brand">
            <img src= {logo} className="imgg"/>
            <h2>MyCity</h2>
          </div>

          <div className="nav_links">

            <button className="nav_icon" onClick={() => setPage("weather")}>
              <i className="fa-solid fa-cloud"></i>
            </button>

            <button className="nav_icon" onClick={() => setPage("traffic")}>
              <i className="fa-solid fa-car"></i>
            </button>

            <button className="nav_icon" onClick={() => setPage("food")}>
              <i className="fa-solid fa-utensils"></i>
            </button>

            <button className="nav_icon" onClick={() => setPage("alerts")}>
              <i class="fa-solid fa-bell"></i>
            </button>

            <div>
                  {is_logged_in ? (
                      <button className="profile_btn">
                        <i className="fa-solid fa-user"></i>
                      </button>
                    ) : (
                      <button className="cssbuttons-io-button" onClick={() => setShow_login(true)}>
                        Login
                        <div className="icon">
                          <svg
                            height="24"
                            width="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path
                              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </button>
                    )}

            </div>
          </div>
        </nav>


          {show_success && (
  <div className="register_success">
    <div className="register_success_icon">
      <svg
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="m12 1c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11zm4.768 9.14c.0878-.1004.1546-.21726.1966-.34383.0419-.12657.0581-.26026.0477-.39319-.0105-.13293-.0475-.26242-.1087-.38085-.0613-.11844-.1456-.22342-.2481-.30879-.1024-.08536-.2209-.14938-.3484-.18828s-.2616-.0519-.3942-.03823c-.1327.01366-.2612.05372-.3782.1178-.1169.06409-.2198.15091-.3027.25537l-4.3 5.159-2.225-2.226c-.1886-.1822-.4412-.283-.7034-.2807s-.51301.1075-.69842.2929-.29058.4362-.29285.6984c-.00228.2622.09851.5148.28067.7034l3 3c.0983.0982.2159.1748.3454.2251.1295.0502.2681.0729.4069.0665.1387-.0063.2747-.0414.3991-.1032.1244-.0617.2347-.1487.3236-.2554z"
          fill="#393a37"
          fillRule="evenodd"
        ></path>
      </svg>
    </div>

    <div className="register_success_title">
      Successfully registered
    </div>

    <div
      className="register_success_close"
      onClick={() => setShow_success(false)}
    >
      <svg
        height="20"
        viewBox="0 0 20 20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
          fill="#393a37"
        ></path>
      </svg>
    </div>
  </div>
)}


        {show_login && (
          <div className="signup_overlay">
            <div className="signup_box">
              <button className="signup_close" onClick={() => setShow_login(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>

              <form className="signup_form">
                <span className="signup_title">Sign up</span>
                <span className="signup_subtitle">
                  Create a free account with your email.
                </span>

                <div className="signup_inputs">
                  <input type="text" className="signup_input" placeholder="Full Name" onChange={(e)=> setName(e.target.value)} value={name}/>
                  <input type="email" className="signup_input" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} value={email}/>
                  <input type="password" className="signup_input" placeholder="Password" onChange={(e)=> setPass(e.target.value)} value={pass}/>
                </div>

                <button type="submit" className="signup_button" onClick={checking_signup}>
                  Sign up
                </button>
              </form>
                <div style={{color: "red", paddingLeft: "50px"}}>{msg}</div>
              <div className="signup_footer">
                <p>
                  Have an account? <a href="#">Log in</a>
                </p>
              </div>
            </div>
          </div>
        )}




        <div
          className="hero"
          style={{
            backgroundImage: `url(${sunny})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          <div className="hero_content">
            <h1>
              welcome to <span>Bengaluru</span>
            </h1>

            <p className="hero_subtitle">explore the city like never before</p>
            <h3 className="hero_tagline">get live updates on food, traffic and more...</h3>

            <div className="prnt">
              {/* weather box start */}
              <div className="wthr_box">
                <div className="www">
                  {/* <span className="material-symbols-outlined" style={{ fontSize: "45px", paddingTop: "14px", color: "yellow"}}>sunny</span> */}
                  {symbl}
                  <div className="weather_temp">
                    {wthr.temperature}
                    {units.temperature}
                  </div>
                </div>
                <b><div className="stts">{val === "cold" ? "Chilly Outside..." : val === "sun" ? "Mostly Sunny..." : "Hot Outside..."}</div></b>
                <div className="weather_details">
                  <div>
                    winds : {wthr.windspeed} {units.windspeed}
                  </div>

                  <div>
                    Direction : {wthr.winddirection}{units.winddirection} SE
                  </div>

                  <div>
                    weather code : {wthr.weathercode}
                  </div>
                </div>
              </div>
            {/* weatherbox end */}
              <div className="wthr_box">

              </div>
            </div>
          </div>
        </div>
            <section className="explore_section">
              <div className="explore_heading">
                <h2>Explore City Services</h2>
                <p>Quick access to food, traffic, weather and alerts</p>
              </div>

              <div className="explore_grid">
                <div className="explore_card" onClick={() => setPage("food")}>
                  <div className="explore_icon food_icon">
                    <i className="fa-solid fa-utensils"></i>
                  </div>
                  <h3>Explore Food</h3>
                  <p>Find places to eat, cafes and local favorites nearby.</p>
                </div>

                <div className="explore_card" onClick={() => setPage("traffic")}>
                  <div className="explore_icon traffic_icon">
                    <i className="fa-solid fa-car"></i>
                  </div>
                  <h3>Traffic Updates</h3>
                  <p>Get live updates on busy roads and route delays.</p>
                </div>

                <div className="explore_card" onClick={() => setPage("weather")}>
                  <div className="explore_icon weather_icon">
                    <i className="fa-solid fa-cloud-sun"></i>
                  </div>
                  <h3>Weather</h3>
                  <p>Check live temperature, wind speed and conditions.</p>
                </div>

                <div className="explore_card" onClick={() => setPage("alerts")}>
                  <div className="explore_icon alert_icon">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                  </div>
                  <h3>City Alerts</h3>
                  <p>Stay updated with important alerts and city notices.</p>
                </div>
              </div>
            </section>


    </div>
  )
}

export default Home;


