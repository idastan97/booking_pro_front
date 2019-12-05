import React from 'react';
import axios from 'axios';
import config from "./../core/config";

function convert_to_bool(text){
  if (text == 'Да'){
    return true;
  }
  if (text == 'Нет'){
    return false;
  }
  return null;
}

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
          room_num: "",
          message: "",
          error: false
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
            has_projector: convert_to_bool(self.state.hasProjector),
            has_whiteboard: convert_to_bool(self.state.hasWhiteboard),
            volume: self.state.volume,
            has_air_conditioning: convert_to_bool(self.state.hasAirConditioning),
            has_noise_isolation: convert_to_bool(self.state.hasNoiseIsolation),
            computer_count: self.state.computerCount,
            micro_count: convert_to_bool(self.state.microphoneCount),
            has_internet: convert_to_bool(self.state.hasInternet),
            has_speakers: convert_to_bool(self.state.hasSpeakers),
            room_number: self.state.room_num
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'token ' + localStorage.getItem('token'),
        }
    })
        .then(function (response) {
            console.log("    ----    ");
            console.log(response.data);
            // localStorage.setItem('token', response.data[0]);
            // localStorage.setItem('userId', response.data[1]);
            // self.props.login(self.state.email.toLowerCase());
            // self.props.authorize(response.data.token, self.state.email);
            self.setState({message: "Успешно", error: false})
        })
        .catch(function (error) {
            console.log(error);
            self.setState({message: error.response.data, error: true});
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

    return (<div className="form-group" style={{textAlign: "left"}} >
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

    return (<div className="form-group" style={{textAlign: "left", marginTop: "10px"}}>
            <label htmlFor={criteria}>{labelName}</label>
            <input name={criteria} type="number" pattern="[0-9]*" inputMode="numeric" className="form-control" id={criteria}
                  onChange ={this.handleChange} value={value}/>
          </div>);
  }

  handleChange(e) {
      switch(e.target.name) {
          case("room_num"):
              this.setState({room_num: e.target.value});
              break;
          case("capacity"):
              if (Number.isNaN(parseInt(e.target.value))){
                e.target.value = '0';
                this.setState({capacity: '0'});
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
                e.target.value = '0';
                this.setState({volume: '0'});
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
          <div>
          <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
              <a className="navbar-brand" href="/">Home</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse"
                      data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                      aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div className="navbar-nav">
                      <a className="nav-item nav-link active" href="/addRequest">Добавить запрос <span
                          className="sr-only">(current)</span></a>
                  </div>

              </div>
              <form className="form-inline my-2 my-lg-0">
                  {/*<input className="form-control mr-sm-2" type="search" placeholder="Search"*/}
                  {/*       aria-label="Search"/>*/}
                  <button className="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={this.props.logout}>Выйти</button>
              </form>
          </nav>
          <div className="container-fluid">
              <div className="row">
                  <div style={{margin: "auto", width: "500px"}}>
                      <div style={{textAlign: "center", marginTop: "10px"}}>
                        <h3>Добавление Аудитории</h3>
                      </div>
                      <div style={{marginTop: "10px"}}>
                          <div className="form-group" style={{textAlign: "left", marginTop: "10px"}}>
                              <label htmlFor="room_num">Номер Кабинета</label>
                              <input name="room_num" type="text" className="form-control" id="room_num"
                                     onChange ={this.handleChange} value={self.state.room_num}/>
                          </div>
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
                         <div className="form-group">
                             <p className={self.state.error ? "text-danger" : "text-success"} >{self.state.message}</p>
                         </div>
                         <div className="form-group" style={{textAlign: "center"}}>
                             <button className="btn btn-dark" onClick={self.addAuditory}>Отправить</button>
                         </div>
                      </div>
                  </div>
              </div>
          </div>
          </div>
      );
  }
}

export default AddAuditory;
