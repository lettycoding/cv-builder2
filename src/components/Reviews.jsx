import React from 'react';
import './Reviews.css';
import {ArrowRight} from 'lucide-react';
import {ExternalLink } from 'lucide-react';

const Reviews = () => {
  const reviews = [
    {
      rating: 5,
      text: 'Yeah am happy that through you I can be helped',
      author: 'Fortune nyemba',
      daysAgo: '1 day ago',
    },
    {
      rating: 4.5,
      text: 'Enhancv has proven to be an outstanding and highly strategic resume-building platform that goes far beyond traditional templates. As a student transitioning from academia into the professional...',
      author: '@quot;quot;',
      daysAgo: '4 days ago',
    },
    {
      rating: 5,
      text: 'Great solution, intuitive to use.',
      author: 'Anonymous',
      daysAgo: '2 days ago',
    },
    {
      rating: 5,
      text: 'Awesome software and I love all features!',
      author: 'Anonymous',
      daysAgo: '1 week ago',
    },
    {
      rating: 5,
      text: 'Okay, I have to say, Enhancv is legit awesome. It\'s one of those tools that just clicks: super intuitive, actually enjoyable to use (who knew resume...',
      author: 'Anonymous',
      daysAgo: '1 week ago',
    },
  ];

  return (
    <div className="reviews-section">
      <h1>Trusted by Executives & Senior Professionals</h1>
      <div className="reviews-container">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <div className="rating">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={i < Math.floor(review.rating) ? 'star filled' : 'star'}
                >
                  ★
                </span>
              ))}
              {review.rating % 1 !== 0 && <span className="star half">★</span>}
              <span className="read-more">Read More</span>
            </div>
            <p className="days-ago">{review.daysAgo}</p>
            <p className="review-text">{review.text}</p>
            <p className="author">— {review.author}</p>
          </div>
        ))}
        <div className="summary-card">
          <div className="rating">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className="star filled">★</span>
            ))}
            <span>4.5 Rating</span>
          </div>
          <p>4,662 happy customers shared their experience.</p>
          <span className="read-reviews" style={{display: 'center', alignItems: 'center'}}>Read Reviews <ArrowRight/></span>
        
        </div>
        
        
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:'30px' }}>
  <button
    style={{
      color: 'blue',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // Center text horizontally
      backgroundColor: 'transparent',
      borderColor: 'white',
      borderRadius: '5px',
      height: '60px',
      width: '300px',
    }}
  >
    <span style={{ display: 'flex', alignItems: 'center' ,fontSize:'15px'}}>
      Read more Reviews at Reviews.io <ExternalLink style={{ color: 'blue' }} />
    </span>
  </button>
</div>
    </div>
  );
};

export default Reviews;