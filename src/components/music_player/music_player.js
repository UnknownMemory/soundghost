import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import './music_player.css';

class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: '',
      time: null,
      currentTime: "",
      playing: false,
      volume: 0.5
    }

    this.audio = React.createRef();
    this.playBtn = this.playBtn.bind(this);
    this.pauseBtn = this.pauseBtn.bind(this);
    this.progressBar = this.progressBar.bind(this);
    this.volumeBtn = this.volumeBtn.bind(this);

  };

  volumeBtn(value){
    this.audio.current.volume = value
    this.setState({volume: this.audio.current.volume})
  }

  playBtn(){
    this.setState({playing: true});
    this.audio.current.play();
  }

  pauseBtn(){
    this.setState({playing: false});
    this.audio.current.pause();
  }

  progressBar(){
    const minutes = Math.floor(this.audio.current.currentTime / 60);
    const seconds = Math.floor(this.audio.current.currentTime % 60);
    const currentTime = ((minutes >= 10) ? minutes : "0" + minutes) + ":" + ((seconds >= 10) ? seconds : "0" + seconds);

    this.setState({time: this.audio.current.currentTime / this.audio.current.duration, currentTime: currentTime});
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if (this.props.currentID !== prevProps.currentID){
      fetch(`https://api.soundcloud.com/i1/tracks/${this.props.currentID}/streams?client_id=LScyTbJVDLRaeLkwReztU0QTGmyWhbin`)
      .then((response) => response.json())
      .then((r)=>{
        this.setState({link: r.http_mp3_128_url});
      })
    }

    if (this.state.link !== prevState.link){
      this.audio.current.load();
      this.playBtn();
    }
  };

  render(){
    return(
      <div>
        {this.props.currentID !== 0 &&
        <nav id="navbar-player" className="navbar navbar-light fixed-bottom">
          <div id="player-artwork">
            <img className="rounded img-fluid img-player" src={this.props.currentArtwork ? this.props.currentArtwork : this.props.currentAvatar} alt="playerArtwork"></img>
            <div id="player-title-user">
              <span id="current-title" className="font-weight-bold text-truncate d-none d-sm-block">{this.props.currentTitle}</span>
              <span id="current-user" className="text-muted text-truncate d-none d-sm-block">{this.props.currentUser}</span>
            </div>
          </div>
          <div id="player-track-info">
            <span id="current-title" className="d-inline-block font-weight-bold text-truncate d-block d-sm-none">{this.props.currentTitle}</span>
            <span id="current-user" className="d-block text-muted text-truncate d-block d-sm-none">{this.props.currentUser}</span>
            <div>
              <audio ref={this.audio} onTimeUpdate={this.progressBar}>
                <source src={this.state.link} type="audio/mpeg"></source>
              </audio>
              <div id="player-controls">
                <i className="material-icons d-none d-sm-block play-pause-btn" onClick={this.state.playing ?  this.pauseBtn : this.playBtn}>{this.state.playing ? "pause" : "play_arrow"}</i>
                <Slider className="progress-bar d-none d-sm-block" value={this.state.time ? this.state.time : 0} step="0.001" max='1'></Slider>
                <span id="currentTime" className="d-none d-sm-block">{this.state.currentTime}</span>
              </div>
            </div>
          </div>
          <div id="volume-slider">
            <Slider className="volume-bar d-none d-sm-block" value={this.state.volume} min="0" max="1" step="0.01" onChange={this.volumeBtn}/>
            <i className="material-icons d-block d-sm-none play-pause-xs-btn" onClick={this.state.playing ?  this.pauseBtn : this.playBtn}>{this.state.playing ? "pause" : "play_arrow"}</i>
          </div>
        </nav>}
      </div>
    )
  }
}

export default MusicPlayer;
