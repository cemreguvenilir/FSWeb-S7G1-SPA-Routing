import React, { useState, useEffect } from "react";
import axios from "axios";
import FilmListesi from "./Filmler/FilmListesi";
import Film from "./Filmler/Film";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler") // Burayı Postman'le çalışın
        .then((response) => {
          console.log(response.data);
          setMovieList(response.data);
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
        })
        .catch((error) => {
          console.error("Sunucu Hatası", error);
        });
    };
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (id) => {
    let isSaved = saved.find((f) => f.id == id);
    if (!isSaved) {
      let savedMovie = movieList.find((m) => m.id == id);
      let newSaved = [...saved, savedMovie];
      setSaved(newSaved);
    }
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
  };

  return (
    <div>
      <KaydedilenlerListesi list={saved} />

      <div>
        <Switch>
          <Route path="/movies/:id">
            <Film saved={KaydedilenlerListesineEkle} />
          </Route>
          <Route path="/">
            <FilmListesi movies={movieList} />{" "}
          </Route>
        </Switch>
      </div>
    </div>
  );
}
