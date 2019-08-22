import React, { useState, useEffect } from 'react';
import axios from 'axios';



const UpdateForm = props => {
    const id = props.match.params.id;
    const initialMovie = {
        title: '',
        director: "",
        metascore: Number,
        stars: [],
        id: id
    };
    console.log('hehe',props)
    
  const [movies, setMovies] = useState(initialMovie);
  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    if(e.target.name === 'stars'){
        value = value.split(', ')
    }
    setMovies({
        ...movies,
        [e.target.name] : value
    })
  }     
  

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movies)
      .then(res => {
        console.log(res);
        setMovies(initialMovie);
        props.history.push('/');
      })
      .catch(err => console.log(err.response));
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
          value={movies.title}
        />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director name"
          value={movies.director}
        />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movies.metascore}
        />

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={movies.stars}
        />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
