import React, { useState, useEffect } from 'react';
import axios from 'axios';



const UpdateForm = (props) => {
  const [oldMovies, setOldMovies ] = useState();
console.log('oldmovies',oldMovies)
    const id = props.match.params.id;
    const initialMovie = {
        title: '',
        director: "",
        metascore: Number,
        stars: [],
        id: id
    };
    console.log('hehe',props)
    
  const [movie, setMovie] = useState(initialMovie);
  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    if(e.target.name === 'stars'){
        value = value.split(', ')
    }
    setMovie({
        ...movie,
        [e.target.name] : value
    })
  }     
  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies`)
      .then(res => {
        const itemInArr = res.data.find(item => item.id === id)
        if(itemInArr) setMovie(itemInArr)
      })
      .catch(err => console.log(err.response));
  },[])

  const handleSubmit = e => {
    e.preventDefault();
    console.log('movie in handlesubmit',movie)
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        console.log(res);
        setMovie(initialMovie);
      })
      .catch(err => console.log(err.response));
      props.history.push('/');
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director name"
          value={movie.director}
        />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movie.metascore}
        />

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={movie.stars}
        />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
