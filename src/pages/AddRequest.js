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

class AddRequest extends React.Component{
  constructor(props) {
      super(props);
      let now = new Date(Date.now());
      let oneHLater = new Date(Date.now());
      oneHLater.setHours(oneHLater.getHours()+1);
      console.log(now.toISOString().substr(0, 16));
      this.state = {
          capacity: "1", capacityPriority: "0",
          hasProjector: "Не важно", hasProjectorPriority: "0",
          hasWhiteboard: "Не важно", hasWhiteboardPriority: "0",
          volume: "1", volumePriority: "0",
          hasAirConditioning: "Не важно", hasAirConditioningPriority: "0",
          hasNoiseIsolation: "Не важно", hasNoiseIsolationPriority: "0",
          computerCount: "0", computerCountPriority: "0",
          microphoneCount: "0", microphoneCountPriority: "0",
          hasInternet: "Не важно", hasInternetPriority: "0",
          hasSpeakers: "Не важно", hasSpeakersPriority: "0",
          time_from: now.toISOString().substr(0, 16),
          time_till: oneHLater.toISOString().substr(0, 16),
          title: "",
          message: "",
          error: false
      };
      this.addRequest = this.addRequest.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handlePriorityChange = this.handlePriorityChange.bind(this);
  }

  addRequest() {
    let self = this;
    axios(config.BACKEND_URL+'/audit/add_booking/', {
        method: "POST",
        data: {
            capacity: self.state.capacity,
            has_projector: convert_to_bool(self.state.hasProjector),
            has_whiteboard: convert_to_bool(self.state.hasWhiteboard),
            volume: self.state.volume,
            has_air_conditioning: convert_to_bool(self.state.hasAirConditioning),
            has_noise_isolation: convert_to_bool(self.state.hasNoiseIsolation),
            computer_count: self.state.computerCount,
            micro_count: self.state.microphoneCount,
            has_internet: convert_to_bool(self.state.hasInternet),
            has_speakers: convert_to_bool(self.state.hasSpeakers),
            capacity_coef: self.state.capacity,
            has_projector_coef: self.state.hasProjectorPriority,
            has_whiteboard_coef: self.state.hasWhiteboardPriority,
            volume_coef: self.state.volumePriority,
            has_air_conditioning_coef: self.state.hasAirConditioningPriority,
            has_noise_isolation_coef: self.state.hasNoiseIsolationPriority,
            computer_count_coef: self.state.computerCountPriority,
            micro_count_coef: self.state.microphoneCountPriority,
            has_internet_coef: self.state.hasInternetPriority,
            has_speakers_coef: self.state.hasSpeakersPriority,
            time_from: self.state.time_from,
            time_till: self.state.time_till,
            title: self.state.title
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
    let priorityValue = "";

    switch(criteria) {
        case("hasProjector"):
            labelName = "Наличие Проектора"; priorityValue = this.state.hasProjectorPriority;
            break;
        case("hasWhiteboard"):
            labelName = "Наличие Доски"; priorityValue = this.state.hasWhiteboardPriority;
            break;
        case("hasAirConditioning"):
            labelName = "Наличие Кондиционера"; priorityValue = this.state.hasAirConditioningPriority;
            break;
        case("hasNoiseIsolation"):
            labelName = "Наличие Шумоизоляции"; priorityValue = this.state.hasNoiseIsolationPriority;
            break;
        case("hasInternet"):
            labelName = "Наличие Интернета"; priorityValue = this.state.hasInternetPriority;
            break;
        case("hasSpeakers"):
            labelName = "Наличие Колонок"; priorityValue = this.state.hasSpeakersPriority;
            break;
        default:
    }

    let criteriaPriority = criteria + "Priority";

    return (<div className="form-group row" style={{textAlign: "left"}} >
      <div className="col-md-8">
        <label htmlFor={criteria}>{labelName}</label>
        <select className="form-control" id={criteria} name={criteria} onChange ={this.handleChange}>
          <option>Не важно</option>
          <option>Да</option>
          <option>Нет</option>
        </select>
      </div>
      <div className="col-md-4">
        <label htmlFor={criteriaPriority}>{"Важность"}</label>
        <input name={criteriaPriority} type="number" min={0} max={10} inputMode="numeric" className="form-control" id={criteriaPriority}
              onChange ={this.handlePriorityChange} value={priorityValue}/>
      </div>
     </div>);
  }

  returnInputFor(criteria) {
    let labelName = "";
    let value = "";
    let priorityValue = "";

    switch(criteria) {
        case("capacity"):
            labelName = "Вместимость Аудитории (1 и выше)";
            value = this.state.capacity; priorityValue = this.state.capacityPriority;
            break;
        case("volume"):
            labelName = "Объём Аудитории (1 и выше)";
            value = this.state.volume; priorityValue = this.state.volumePriority;
            break;
        case("computerCount"):
            labelName = "Количество Компьютеров (0 и выше)";
            value = this.state.computerCount; priorityValue = this.state.computerCountPriority;
            break;
        case("microphoneCount"):
            labelName = "Количество Микрофонов (0 и выше)";
            value = this.state.microphoneCount; priorityValue = this.state.microphoneCountPriority;
            break;
        default:
    }

    let criteriaPriority = criteria + "Priority";

    return (<div className="form-group row" style={{textAlign: "left", marginTop: "10px"}}>
          <div className="col-md-8">
            <label htmlFor={criteria}>{labelName}</label>
            <input name={criteria} type="number" min={1} pattern="[0-9]*" inputMode="numeric" className="form-control" id={criteria}
                  onChange ={this.handleChange} value={value}/>
          </div>
          <div className="col-md-4">
            <label htmlFor={criteriaPriority}>{"Важность"}</label>
            <input name={criteriaPriority} type="number" min={0} max={10} inputMode="numeric" className="form-control" id={criteriaPriority}
                  onChange ={this.handlePriorityChange} value={priorityValue}/>
          </div>
        </div>

     );
  }

  handlePriorityChange(e) {
    console.log(e.target.name);
    switch(e.target.name) {
        case("capacityPriority"):
          if (Number.isNaN(parseInt(e.target.value)) || e.target.value > 10){
            e.target.value = '0';
            this.setState({capacityPriority: '0'});
          } else {
            e.target.value = parseInt(e.target.value);
            this.setState({capacityPriority: parseInt(e.target.value)});
          }
          break;
        case("volumePriority"):
          if (Number.isNaN(parseInt(e.target.value)) || e.target.value > 10){
            e.target.value = '0';
            this.setState({volumePriority: '0'});
          } else {
            e.target.value = parseInt(e.target.value);
            this.setState({volumePriority: parseInt(e.target.value)});
          }
          break;
        case("microphoneCountPriority"):
          if (Number.isNaN(parseInt(e.target.value)) || e.target.value > 10){
            e.target.value = '0';
            this.setState({microphoneCountPriority: '0'});
          } else {
            e.target.value = parseInt(e.target.value);
            this.setState({microphoneCountPriority: parseInt(e.target.value)});
          }
          break;
        case("computerCountPriority"):
          if (Number.isNaN(parseInt(e.target.value)) || e.target.value > 10){
            e.target.value = '0';
            this.setState({computerCountPriority: '0'});
          } else {
            e.target.value = parseInt(e.target.value);
            this.setState({computerCountPriority: parseInt(e.target.value)});
          }
          break;
        case("hasProjectorPriority"):
          if (Number.isNaN(parseInt(e.target.value)) || e.target.value > 10){
            e.target.value = '0';
            this.setState({hasProjectorPriority: '0'});
          } else {
            e.target.value = parseInt(e.target.value);
            this.setState({hasProjectorPriority: parseInt(e.target.value)});
          }
          break;
        case("hasWhiteboardPriority"):
          if (Number.isNaN(parseInt(e.target.value)) || e.target.value > 10){
            e.target.value = '0';
            this.setState({hasWhiteboardPriority: '0'});
          } else {
            e.target.value = parseInt(e.target.value);
            this.setState({hasWhiteboardPriority: parseInt(e.target.value)});
          }
          break;
         case("hasAirConditioningPriority"):
           if (Number.isNaN(parseInt(e.target.value)) || e.target.value > 10){
             e.target.value = '0';
             this.setState({hasAirConditioningPriority: '0'});
           } else {
             e.target.value = parseInt(e.target.value);
             this.setState({hasAirConditioningPriority: parseInt(e.target.value)});
           }
           break;
         case("hasNoiseIsolationPriority"):
           if (Number.isNaN(parseInt(e.target.value)) || e.target.value > 10){
             e.target.value = '0';
             this.setState({hasNoiseIsolationPriority: '0'});
           } else {
             e.target.value = parseInt(e.target.value);
             this.setState({hasNoiseIsolationPriority: parseInt(e.target.value)});
           }
           break;
         case("hasInternetPriority"):
           if (Number.isNaN(parseInt(e.target.value)) || e.target.value > 10){
             e.target.value = '0';
             this.setState({hasInternetPriority: '0'});
           } else {
             e.target.value = parseInt(e.target.value);
             this.setState({hasInternetPriority: parseInt(e.target.value)});
           }
           break;
         case("hasSpeakersPriority"):
           if (Number.isNaN(parseInt(e.target.value)) || e.target.value > 10){
             e.target.value = '0';
             this.setState({hasSpeakersPriority: '0'});
           } else {
             e.target.value = parseInt(e.target.value);
             this.setState({hasSpeakersPriority: parseInt(e.target.value)});
           }
           break;
        default:
    }
  }

  handleChange(e) {
      switch(e.target.name) {
          case("title"):
              this.setState({title: e.target.value});
              break;
          case("time-from"):
              this.setState({time_from: e.target.value});
              break;
          case("time-till"):
              this.setState({time_till: e.target.value});
              break;
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
                          <a className="nav-item nav-link active" href="/addAuditory">Добавить аудиторию <span
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
                        <h3>Создание Запроса</h3>
                      </div>
                      <div style={{marginTop: "10px"}}>

                          <div className="form-group" style={{textAlign: "left", marginTop: "10px"}}>
                              <label htmlFor="title">Название</label>
                              <input name="title" type="text" className="form-control" id="title"
                                     onChange ={this.handleChange} value={self.state.title}/>
                          </div>
                        <div className="form-group" style={{textAlign: "left", marginTop: "10px"}}>
                          <label htmlFor="time_from">Начало</label>
                          <input type="datetime-local"
                          name="time-from" value={self.state.time_from} onChange={self.handleChange} />
                        </div>
                        <div className="form-group" style={{textAlign: "left", marginTop: "10px"}}>
                          <label htmlFor="time_till">Конец</label>
                          <input type="datetime-local"
                          name="time-till" value={self.state.time_till} onChange={self.handleChange} />
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
                             <button className="btn btn-dark" onClick={self.addRequest}>Отправить</button>
                         </div>
                      </div>
                  </div>
              </div>
          </div>
          </div>
      );
  }
}

export default AddRequest;
