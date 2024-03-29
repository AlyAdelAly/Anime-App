import React from 'react';
import { animated, useSpring } from 'react-spring';
import { useScroll } from "react-use-gesture";

const clamp = (value, clampAt = 30) => {
  if (value > 0) {
    return value > clampAt ? clampAt : value;
  } else {
    return value < -clampAt ? -clampAt : value;
  }
};

const AnimeList = (props) => {
  const FavouriteComponent = props.favouriteComponent;
  const [style, set] = useSpring(() => ({
    transform: "perspective(350px) rotateY(0deg)"
  }));

  const bind = useScroll(event => {
    set({
      transform: `perspective(350px) rotateY(${
        event.scrolling ? clamp(event.delta[0]) : 0
        }deg)`
    });
  });
  return (
    <>
      <div className="container d-flex justify-content-start m-2" {...bind()}>
        {
          props.animes.map((anime, index) => (
            <div className="image-container d-flex justify-content-start m-3" >
              <animated.div
                key={anime.image_url}
                className="image"
                style={{
                  width: '220px',
                  height: '300px',
                  backgroundSize: 'cover',
                  ...style,
                  backgroundImage: `url(${anime.image_url})`
                }}
              />
              <div
                className='overlay d-flex align-items-center justify-content-center'>
                <span>{anime.title}</span>
                <button onClick={() => props.handleFavouritesClick(anime)} type="button" style={{ borderRadius: '15px', fontWeight: "bold" }} class="btn btn-dark ml-3" data-tip data-for="addTip">+</button>
                <FavouriteComponent />
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default AnimeList;