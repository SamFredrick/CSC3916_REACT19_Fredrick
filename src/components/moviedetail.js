import React, { useEffect } from 'react';
import { fetchMovie } from '../actions/movieActions';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const selectedMovie = useSelector(state => state.movie.selectedMovie);

  useEffect(() => {
    dispatch(fetchMovie(movieId));
  }, [dispatch, movieId]);

  if (!selectedMovie) {
    return <div>No movie data available.</div>;
  }

  return (
    <Card className="bg-dark text-white p-4 rounded m-3">
      <Card.Header>Movie Detail</Card.Header>

      <ListGroup>
        <ListGroupItem><b>Title:</b> {selectedMovie.title}</ListGroupItem>
        <ListGroupItem><b>Genre:</b> {selectedMovie.genre}</ListGroupItem>
        <ListGroupItem><b>Release Date:</b> {selectedMovie.releaseDate}</ListGroupItem>
        <ListGroupItem>
          <b>Actors:</b>
          {(selectedMovie.actors || []).map((actor, i) => (
            <p key={i} className="mb-1">
              {actor.actorName} as {actor.characterName}
            </p>
          ))}
        </ListGroupItem>
      </ListGroup>

      <Card.Body className="bg-white text-dark">
        {(selectedMovie.reviews || []).length > 0 ? (
          selectedMovie.reviews.map((review, i) => (
            <p key={i}>
              <b>{review.username}</b>: {review.review} ({review.rating})
            </p>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default MovieDetail;