import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import Searchbar from "./Searchbar";
import VideoDetails from "./VideoDetails";
import VideoList from "./VideoList";
import "./../App.css";

const API_KEY = "AIzaSyDGoHAhoFLwTMiRzaft9onqSTXpSxH1Q20";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch("dealshare");
  }

  videoSearch = async termFromSearchBar => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search/",
      {
        params: {
          part: "snippet",
          maxResults: 10,
          key: API_KEY,
          q: termFromSearchBar
        }
      }
    );
    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0]
    });
  };

  render() {
    const videoSearchDebounce = _.debounce(term => {
      this.videoSearch(term);
    }, 300);

    return (
      <div className="App">
        <Searchbar onSearchTermChange={videoSearchDebounce} />
        <VideoDetails selectedVideo={this.state.selectedVideo} />
        <VideoList
          videos={this.state.videos}
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
        />
      </div>
    );
  }
}

export default App;
