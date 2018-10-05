import React, { Component } from 'react';
import './song.css';

class Song extends Component {
  constructor(props){
      super(props);

      this.playSong = this.playSong.bind(this);
    }
    playSong(){
      this.props.currentS(this.props.id, this.props.artwork, this.props.user, this.props.avatar, this.props.title)
    }
  render(){
    return (
      <li onClick={this.playSong}>
        <div className="d-flex mb-2 mt-2">
          <div id="artwork">
            <img className="rounded img-fluid" src={this.props.artwork ? this.props.artwork : this.props.avatar} alt="artwork"></img>
          </div>
          <div className="track-info">
            <span className="track-title d-inline-block text-truncate">{this.props.title}</span>
            <span className="track-user d-block text-muted">{this.props.user}</span>
            <span className="track-plays d-block text-muted">{this.props.plays} plays</span>
          </div>
        </div>
      </li>
    )
  }
}

export default Song;
