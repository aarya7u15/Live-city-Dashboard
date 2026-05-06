import { useState, useEffect } from "react"

export default function Traffic({ setPage }) {



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
                          <i className="fa-solid fa-bell"></i>
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
        </div>
    )
}