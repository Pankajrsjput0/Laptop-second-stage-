import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const genres = [
  { name: 'Fantasy', image: '/images/genres/fantasy.jpg' },
  { name: 'Horror', image: '/images/genres/horror.jpg' },
  { name: 'Mystery', image: '/images/genres/mystery.jpg' },
  { name: 'Adventure', image: '/images/genres/adventure.jpg' },
  { name: 'Romance', image: '/images/genres/romance.jpg' },
  { name: 'Sci-Fi', image: '/images/genres/scifi.jpg' }
];

function GenreCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  return (
    <div className="genre-carousel max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Explore Genres</h2>
      <Slider {...settings}>
        {genres.map((genre, index) => (
          <div key={index} className="px-2">
            <div className="relative h-48 rounded-lg overflow-hidden">
              <img 
                src={genre.image} 
                alt={genre.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">{genre.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default GenreCarousel;