import "./App.css";
import { useRef, useState, useEffect } from "react";
import {
  FaStepBackward,
  FaPlayCircle,
  FaStepForward,
  FaStopCircle,
} from "react-icons/fa";

function App() {
  let audioplayer = useRef();

  const [CurrentSong, setCurrentSong] = useState(null);

  // const [songs, setSongs] = useState([
  //   {
  //     id: 1,
  //     category: "game",
  //     name: "Mario Castle",
  //     url: "files/mario/songs/castle.mp3",
  //   },
  //   {
  //     id: 2,
  //     category: "game",
  //     name: "Mario Star",
  //     url: "files/mario/songs/hurry-starman.mp3",
  //   },
  //   {
  //     id: 3,
  //     category: "game",
  //     name: "Mario Overworld",
  //     url: "files/mario/songs/overworld.mp3",
  //   },
  // ]);

  const [songs, setSongs] = useState(null);

  const loadSong = (url, i) => {
    setCurrentSong(i);
    audioplayer.src = `https://assets.breatheco.de/apis/sound/${url}`;
    playSong();
  };

  const rerpoducir = () => {
    playSong();
  };

  const stop = () => {
    playstop()

  }
  const playstop = () => {
    audioplayer.pause();
  };

  const playSong = () => {
    audioplayer.play();
  };


  const previousSong = () => {
    if (CurrentSong - 1 < songs.length)
      loadSong(songs[CurrentSong - 1].url, CurrentSong - 1);
  };

  const nextSong = () => {
    if (CurrentSong + 1 < songs.length)
      loadSong(songs[CurrentSong + 1].url, CurrentSong + 1);
  };


  useEffect(() => {
    getSong();
  }, []);

  const getSong = async () => {
    try {
      const response = await fetch(
        "https://assets.breatheco.de/apis/sound/songs"
      );
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSongs(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div
            className="col-md-6 offset-md-3"
            style={{ height: "200px", overflowY: "scroll" }}
          >
            <ul className="list-group">
              {!!songs &&
                songs.length > 0 &&
                songs.map((songs, index) => {
                  return (
                    <l1
                      key={index}
                      className={
                        "list-group-item list list-group-item-action" +
                        (CurrentSong === index ? "active" : "")
                      }
                      onClick={() => loadSong(songs.url, index)}
                    >
                      {songs.name}
                    </l1>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3 d-flex justify-content py-3">
            <div className="button-group">
              <button
                className={
                  "btn btn-primary mx-1" +
                  (CurrentSong === 0 ? " disabled" : "")
                } onClick={previousSong}
              >
                <FaStepBackward />
              </button>

              <button className="btn btn-primary mx-1" onClick={rerpoducir}>
                <FaPlayCircle />
              </button>

              <button className="btn btn-primary mx-1" onClick={stop} >
                <FaStopCircle />
              </button>

              <button
                className={
                  "btn btn-primary mx-1" +
                  (CurrentSong && songs.length ? "disabled" : "")
                }
                onClick={nextSong}
              >
                <FaStepForward />
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <audio ref={(t) => (audioplayer = t)} src="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
