import React, { Component } from 'react';
import { Images } from '../theme'
import { Nav } from '.'

class Population extends Component {
  constructor(props) {
    super(props);
      this.state = {
        cities: [],
        loading: true,
        error: null,
        population: '',
        filteredCities: [],
        rbSelect: 'equal',
      }
}

populationChange = event => {
          let setPopulation = () => {
            return new Promise((res, rej) => {
              this.setState({population: event.target.value});
              res();
            });
          };
          
          let filterPopulation = () => {
                return new Promise((res, rej) => {
                  const fpopulation = [];                                    
                  for(let i = 0, len = this.state.cities.length; i < len; i++){
                            switch(this.state.rbSelect){
                              case 'less':
                              let less = this.state.cities[i].population < this.state.population ? fpopulation.push(this.state.cities[i]) : null
                              break;
                              case 'equal':
                              let equal = this.state.cities[i].population == this.state.population ? fpopulation.push(this.state.cities[i]) : null
                              break;
                              case 'greater':
                              let greater = this.state.cities[i].population > this.state.population ? fpopulation.push(this.state.cities[i]) : null
                              break;
                              default:
                              var oqual = this.state.cities[i].population == this.state.population ? fpopulation.push(this.state.cities[i]) : null
                            }
                      }
                      this.setState({filteredCities: fpopulation})
                res();
                });
          };
          
          setPopulation().then(function(){
            filterPopulation();
          })
  }

  rbpopFilter = () => {
    return new Promise((res, rej) => {
      const fpopulation = [];                                    
      for(let i = 0, len = this.state.cities.length; i < len; i++){
                switch(this.state.rbSelect){
                  case 'less':
                  let less = this.state.cities[i].population < this.state.population ? fpopulation.push(this.state.cities[i]) : null
                  break;
                  case 'equal':
                  let equal = this.state.cities[i].population == this.state.population ? fpopulation.push(this.state.cities[i]) : null
                  break;
                  case 'greater':
                  let greater = this.state.cities[i].population > this.state.population ? fpopulation.push(this.state.cities[i]) : null
                  break;
                  default:
                  var oqual = this.state.cities[i].population == this.state.population ? fpopulation.push(this.state.cities[i]) : null
                }
          }
          this.setState({filteredCities: fpopulation})
    res();
    });
  }
   
  rbChange = async rb => {
      const setrb = () => {
        this.setState({rbSelect: rb.target.value});
      };
      const rbpop = () => {
        this.rbpopFilter();
      };
      await setrb();
      await rbpop(); 
  };  

  getCities() {
    const url = `http://cities.jonkri.se/`
    setTimeout(() => {    
        fetch(url)
          .then(response => response.json())
          .then(resData =>
            this.setState({
              cities: resData,
              loading: false,
            })          
          )
          .catch(error => this.setState({ error, loading: false }));
    }, 1000);
  }

  componentDidMount() {
    this.getCities();
  }
  componentDidUpdate() {
    // this.populationChange();
  }

  render() {
    const { population, loading, cities, error, filteredCities } = this.state;  
    return (
        <div className="population fx fxdc fxjcc fxaic">
            <h2 className="title">Population Filter</h2>
            <div className="popdiv"> 
                <div className="popformdiv">
                  <form>
                      <input type="number" name="cityname"  autoComplete="off" placeholder="Only Numerics Allowed - Type to Filter by Population Count" value={population} 
                      onChange={this.populationChange} />
                      <div className="rbdiv tac">
                          <h2>Select Option To Change Order</h2>
                          <div className="fx fxdr fxjcc fxaic">
                              <label>
                                <input type="radio" name="poprb" value="less" checked={this.state.rbSelect === "less"} onChange={this.rbChange}/>
                                Is Less Than
                              </label>
                              <label>
                                <input type="radio" name="poprb" value="equal" checked={this.state.rbSelect === "equal"} onChange={this.rbChange}/>
                                Is Equal To
                              </label>
                              <label>
                                <input type="radio" name="poprb" value="greater" checked={this.state.rbSelect === "greater"} onChange={this.rbChange}/>
                                Is Greater Than
                              </label>  
                            </div>
                        </div>
                  </form>
                </div> 
                <div> 
                    {error ? <h2 className="title2 tac">{error.message}</h2> : null}
                    {filteredCities.length > 0 ? <><h2 className="title2">Population Match Count For:<label> {population} => ({filteredCities.length})</label></h2><hr/></>  : null}
                    {!loading ? (  
                      population === '' ? (
                            cities.map(city => {
                              const { id, name, population } = city;
                              return (
                                <div key={id}>
                                  <p><label>City Name: </label> {name}</p>
                                  <p><label>Population: </label> {population}</p>
                                  <hr />
                                </div>
                              );
                            })
                     ) : (
                      filteredCities.length > 0 ? (
                        filteredCities.map(city => {                           
                              const { id, name, population } = city;
                              return (
                                <div key={id}>
                                  <p><label>City Name: </label>{name}</p>
                                  <p><label>Population: </label> {population}</p>
                                  <hr />
                                </div>
                              ); 
                        }) 
                      ) : (
                        <div className="tac">
                            <h2 className="title2">No Population Match Found For :<label> {population}</label></h2><hr/>
                        </div>
                       )                      
                   )
                    ) : (
                      <div className="loading tac">
                            <img src={Images.loading1} alt="loading" />
                            <h3>LOADING...</h3>
                        </div>
                    )}
                </div>
              </div> 
              <Nav/>
        </div>

    );
  }
}

export default Population;
