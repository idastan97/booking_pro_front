import React from 'react';
import axios from 'axios';
import config from "./../core/config";

class AddAuditory extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
          capacity: "1",
          hasProjector: "Не важно",
          hasWhiteboard: "Не важно",
          volume: "1",
          hasAirConditioning: "Не важно",
          hasNoiseIsolation: "Не важно",
          computerCount: "0",
          microphoneCount: "0",
          hasInternet: "Не важно",
          hasSpeakers: "Не важно",
      };
      this.addAuditory = this.addAuditory.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  addAuditory() {
    let self = this;
    axios(config.BACKEND_URL+'/audit/add_auditory/', {
        method: "POST",
        data: {
            capacity: self.state.capacity,
            has_projector: self.state.hasProjector,
            has_whiteboard: self.state.hasWhiteboard,
            volume: self.state.volume,
            has_air_conditioning: self.state.hasAirConditioning,
            has_noise_isolation: self.state.hasNoiseIsolation,
            computer_count: self.state.computerCount,
            micro_count: self.state.microphoneCount,
            has_internet: self.state.hasInternet,
            has_speakers: self.state.hasSpeakers,
        },
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            console.log("    ----    ");
            console.log(response.data);
            // localStorage.setItem('token', response.data[0]);
            // localStorage.setItem('userId', response.data[1]);
            // self.props.login(self.state.email.toLowerCase());
            // self.props.authorize(response.data.token, self.state.email);
        })
        .catch(function (error) {
            console.log(error);
          });
  }

  returnDropdownFor(criteria) {
    let labelName = "";

    switch(criteria) {
        case("hasProjector"):
            labelName = "Наличие Проектора";
            break;
        case("hasWhiteboard"):
            labelName = "Наличие Доски";
            break;
        case("hasAirConditioning"):
            labelName = "Наличие Кондиционера";
            break;
        case("hasNoiseIsolation"):
            labelName = "Наличие Шумоизоляции";
            break;
        case("hasInternet"):
            labelName = "Наличие Интернета";
            break;
        case("hasSpeakers"):
            labelName = "Наличие Колонок";
            break;
        default:
    }

    return (<div className="form-group" style={{textAlign: "center"}} >
        <label htmlFor={criteria}>{labelName}</label>
        <select className="form-control" id={criteria} name={criteria} onChange ={this.handleChange}>
          <option>Не важно</option>
          <option>Да</option>
          <option>Нет</option>
        </select>
      </div>);
  }

  returnInputFor(criteria) {
    let labelName = "";
    let value = "";

    switch(criteria) {
        case("capacity"):
            labelName = "Вместимость Аудитории (1 и выше)";
            value = this.state.capacity;
            break;
        case("volume"):
            labelName = "Объём Аудитории (1 и выше)";
            value = this.state.volume;
            break;
        case("computerCount"):
            labelName = "Количество Компьютеров (0 и выше)";
            value = this.state.computerCount;
            break;
        case("microphoneCount"):
            labelName = "Количество Микрофонов (0 и выше)";
            value = this.state.microphoneCount;
            break;
        default:
    }

    let criteriaPriority = criteria + "Priority";

    return (<div className="form-group" style={{textAlign: "center", marginTop: "10px"}}>
            <label htmlFor={criteria}>{labelName}</label>
            <input name={criteria} type="number" min={1} pattern="[0-9]*" inputMode="numeric" className="form-control" id={criteria}
                  onChange ={this.handleChange} value={value}/>
          </div>);
  }

  handleChange(e) {
      switch(e.target.name) {
          case("capacity"):
              if (Number.isNaN(parseInt(e.target.value))){
                e.target.value = '1';
                this.setState({capacity: '1'});
              } else {
                e.target.value = parseInt(e.target.value);
                this.setState({capacity: parseInt(e.target.value)});
              }
              break;
          case("hasProjector"):
              this.setState({hasProjector: e.target.value});
              break;
          case("hasWhiteboard"):
              this.setState({hasWhiteboard: e.target.value});
              break;
          case("volume"):
              if (Number.isNaN(parseInt(e.target.value))){
                e.target.value = '1';
                this.setState({volume: '1'});
              } else {
                e.target.value = parseInt(e.target.value);
                this.setState({volume: parseInt(e.target.value)});
              }
              break;
          case("hasAirConditioning"):
              this.setState({hasAirConditioning: e.target.value});
              break;
          case("hasNoiseIsolation"):
              this.setState({hasNoiseIsolation: e.target.value});
              break;
          case("computerCount"):
              if (Number.isNaN(parseInt(e.target.value))){
                e.target.value = '0';
                this.setState({computerCount: '0'});
              } else {
                e.target.value = parseInt(e.target.value);
                this.setState({computerCount: parseInt(e.target.value)});
              }
              break;
          case("microphoneCount"):
              if (Number.isNaN(parseInt(e.target.value))){
                e.target.value = '0';
                this.setState({microphoneCount: '0'});
              } else {
                e.target.value = parseInt(e.target.value);
                this.setState({microphoneCount: parseInt(e.target.value)});
              }
              break;
          case("hasInternet"):
              this.setState({hasInternet: e.target.value});
              break;
          case("hasSpeakers"):
              this.setState({hasSpeakers: e.target.value});
              break;
          default:
      }
  }

  render(){
      let self = this;

      return (
          <div className="container-fluid">
              <div className="row">
                  <div style={{margin: "auto", width: "500px"}}>
                      <div style={{textAlign: "center", marginTop: "10px", border: "1px solid blue"}}>
                        <h3>Добавление Аудитории</h3>
                      </div>
                      <div style={{marginTop: "10px"}}>
                         {self.returnInputFor("capacity")}
                         {self.returnDropdownFor("hasProjector")}
                         {self.returnDropdownFor("hasWhiteboard")}
                         {self.returnInputFor("volume")}
                         {self.returnDropdownFor("hasAirConditioning")}
                         {self.returnDropdownFor("hasNoiseIsolation")}
                         {self.returnDropdownFor("hasInternet")}
                         {self.returnInputFor("computerCount")}
                         {self.returnInputFor("microphoneCount")}
                         {self.returnDropdownFor("hasSpeakers")}
                         <div className="form-group" style={{textAlign: "center"}}>
                             <button className="btn btn-primary" onClick={self.addAuditory}>Submit</button>
                         </div>
                      </div>
                  </div>
              </div>
          </div>
      );
  }
}

export default AddAuditory;
