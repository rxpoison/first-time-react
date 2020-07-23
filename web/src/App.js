import React from 'react';
import './App.css';
import axios from 'axios';
const queryString = require('query-string');
class TripComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      keywords: '',
      tag: ''
    }
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const keywords = queryString.parse(window.location.search).keywords;
    if(!keywords){
      window.history.replaceState(null, null, `?keywords=`)
    }
    this.setState({tag: keywords})
    this.findTrips(keywords)    
  }

  findTrips(keywords) {   
      axios.get(`http://127.0.0.1:3030/api/trips?keyword=${keywords}`)
        .then((response) => {
          this.setState({
            trips: response.data.data,
            keywords: keywords
          })
        })
        .catch((error) => {
          console.log(error);
        });          
  }
  
  handleSearch(event) {  
    let keywords = event.target.value
    this.findTrips(keywords)
    window.history.replaceState(null, null, `?keywords=${keywords}`);
  }
  
  render() {
    return (
      <>
      <div className="app container py-5">     
        <div className="row d-flex justify-content-center section-content section-search sticky-top py-4">
            <div className="col-12 head">
              <h1>เที่ยวไหนดี</h1>
            </div>
            <div className="col-md-8 col-sm-12 px-3">
              <input type="text" 
                onKeyUp={this.handleSearch} 
                className="form-control text-center" 
                placeholder="หาที่เที่ยวแล้วไปกัน..."
                defaultValue={this.state.tag}
              />
            </div>
          </div>

          <div className="row d-flex justify-content-center section-content">
            <div className="col-lg-8 col-md-8 col-sm-12">          
              <div className="row">             
                <div className="col-12 py-5 trip-content">
                {
                  this.state.trips.map((trip) => (
                      <div key={trip.eid} className="row mb-5 trip-box">
                          <div className="col-md-4 mb-1">
                            <img
                              className="w-100" 
                              src={trip.photos[0]} 
                              alt="react-img"
                            />
                          </div>
                          <div className="col-md-8 text-left">
                            <div className="row">
                              <div className="col-md-12 trip-header">
                                <a href={trip.url}>{trip.title}</a>
                              </div>
                              <div className="col-md-12">                              
                                <span className="text-muted trip-description">
                                  {
                                    ((trip.description).length > 150) ? (((trip.description).substring(0,150-3)) + '....') : trip.description
                                  }
                                  <a href={trip.url}> อ่านต่อ</a>
                                </span>
                                                                                        
                              </div>
                              <div className="col-md-12">
                                <small className="text-muted d-flex justify-content-start">                                                          
                                    <ul className="trip-tag row w-100">
                                    <span>หมวด : </span> 
                                      {
                                        trip.tags.map((tag,key) => (
                                          <li key={key} className="col-auto px-1">
                                            <a className="text-muted" href={`?keywords=${tag}`}><small>{tag}</small></a>
                                          </li>
                                        ))                              
                                      }  
                                      </ul>                                                                                         
                                </small>                              
                              </div>
                              <div className="col-md-12">
                                <div className="row">                                                              
                                  <div className="col-md-4 mb-1">
                                    <img 
                                      className="w-100 h-100" 
                                      src={trip.photos[1]}
                                      alt="react-img"
                                    />  
                                  </div>
                                  <div className="col-md-4 mb-1">
                                    <img 
                                      className="w-100 h-100" 
                                      src={trip.photos[2]}
                                      alt="react-img"
                                    />  
                                  </div> 
                                  <div className="col-md-4 mb-1">
                                    <img 
                                      className="w-100 h-100" 
                                      src={trip.photos[3]}
                                      alt="react-img"
                                    />  
                                </div>                              
                                </div>                                                   
                              </div>
                              <div className="col-md-12">
                                <hr/>   
                              </div>
                            </div>                        
                          </div>                                            
                      </div>                                    
                  ))                
                }
                </div>
              </div>      
            </div>
          </div>
          </div>
          <div className="col-md-12 text-right fixed-bottom bg-dark text-white">
              <small>This Frontend Assignment is made with ❤️ by Chanathip Thongmont <a className="text-info" href="https://rxpoison.github.io/" target="_blank">My resume</a></small>
          </div>
      </>
    );
  }
}
export default TripComponent;

