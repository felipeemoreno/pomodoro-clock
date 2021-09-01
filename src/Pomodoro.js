import { Component } from 'react';

class Pomodoro extends Component{
  constructor(props) {
    super(props);
    this.state = {
      log: null,
      timePause: null,
      timeResting: 5,
      timeStart: null,
      timeWorking: 25,
      minutes: 0,
      seconds: 0,
      pause: false,
      mode: null,
      turns: 4
    }
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickPause = this.handleClickPause.bind(this);
    this.handleClickStop = this.handleClickStop.bind(this);
    this.handleInputWorking = this.handleInputWorking.bind(this);
    this.handleInputResting = this.handleInputResting.bind(this);
  }


   tick(){
     const now = new Date();
     const counting = now - this.state.timeStart;

     this.setState({
      minutes: new Date(counting).getMinutes(),
      seconds: new Date(counting).getSeconds()
     });
     console.log('tick')
     console.log(this.timerID);
   }

   start(dataAtulizada = new Date()) {
     if(this.state.timeWorking === null || this.state.timeResting === null){
       return false;
     } else if(this.state.timeStart === null && this.state.mode === null ) {
      this.setState({
        mode: "trabalhando",
       });
     }

     this.setState({
      timeStart: dataAtulizada,
     });

    this.timerID = setInterval(
      () => this.tick(),
      1000
    )

   }

   pause() {
    this.setState({
      pause: this.state.pause ? false : true,
    })
    if( !this.state.pause ){
      clearInterval(this.timerID);
      this.setState({
        timePause: new Date()
      })
    }else {
      const now = new Date();
      now.setMinutes(now.getMinutes() - this.state.minutes);
      now.setSeconds(now.getSeconds() - this.state.seconds);
      this.start(now);
    }
   }

   stop() {
    clearInterval(this.timerID);
    this.setState({
      mode: null,
      timeStart: null,
      timePause: null,
      minutes: 0,
      seconds: 0,
      pause: false
    })
   }

   shouldComponentUpdate(nextProps, nextState){
    if (this.state.pause)
      return false;


    if(this.state.mode === "trabalhando" && this.state.minutes >= this.state.timeWorking){
      this.stop();
      this.setState({
        mode: "descansando",
      })
      this.start();
    }

    if(this.state.mode === "descansando" && this.state.minutes >= this.state.timeResting){
      this.stop();
      this.setState({
        mode: "trabalhando",
      })
      this.start();
    }

    return true
  }

  componentDidUpdate(propsStage, NextStage){

  }

  handleClickStart() {
    if(this.state.pause || this.state.mode != null) {
      return false;
    }
    this.start();
    console.log('start');
  }

  handleClickPause() {
    if(this.state.mode === null) {
      return false;
    }
    this.pause();
    console.log('pause');
  }

  handleClickStop() {
    this.stop();
    console.log('stop');
  }

  handleInputWorking(event){
     this.setState({
       timeWorking: event.target.value
     });
  }

  handleInputResting(event){
    this.setState({
      timeResting: event.target.value
    });
  }

  render() {
    return (
      <>
        <h1>Pomodoro Clock</h1>
        <hr/>
        <div className="inputs">
          <label>
            Minutos Trabalhando:
            <input type="text" id="minutesWorking" onChange={ this.handleInputWorking } value={this.state.timeWorking} />
          </label>
          <label>
            Minutos Descansando:
            <input type="text" id="minutesResting"  onChange={ this.handleInputResting } value={this.state.timeResting} />
          </label>
        </div>
        <div className="notifications">
          <h2>{ this.state.mode }</h2>
        </div>
        <div className="timer">
          <div>Tempo: { (this.state.minutes < 10 ) ? '0' + this.state.minutes : this.state.minutes  }:{ ( this.state.seconds < 10 ) ? '0' + this.state.seconds : this.state.seconds }</div>
        </div>
        <div className="buttons">
          <button onClick={this.handleClickStart}>Start</button>
          <button onClick={this.handleClickPause}>Pause</button>
          <button onClick={this.handleClickStop}>Stop</button>
        </div>

      </>
    )
  }
}
export default Pomodoro;
