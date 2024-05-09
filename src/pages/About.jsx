import React from 'react';
import image1 from '../images/home_img.jpg';
import image2 from '../images/home_image2.png';

const AboutPage = () => {
  const containerStyle = {
    padding: '20px',
  };

  const descriptionBoxStyle = {
    border: '2px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    marginTop: '20px',
    animation: 'fadeIn 4s ease-in',
  };

  const paragraphStyle = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333', // Text color
    marginBottom: '10px', // Bottom margin
    animation: 'fadeIn 4s fadeOut', // Animation effect
  };

  const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '20px',
  };

  const imageStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  };

  const handleHover = (event) => {
    event.target.style.transform = 'scale(1.1) rotate(360deg)';
  };

  const handleMouseLeave = (event) => {
    event.target.style.transform = 'scale(1) rotate(0deg)';
  };

  return (
    <div style={containerStyle}>
      <h2>About Us</h2>
      <div style={descriptionBoxStyle} className="description-box">
        <p style={paragraphStyle}>
          ShopNest is an innovative e-commerce platform designed to cater to all your shopping needs in one convenient location. With a diverse range of products spanning various categories, ShopNest aims to provide customers with a seamless and enjoyable shopping experience.
        </p>
        <p style={paragraphStyle}>
          Whether you're looking for fashion apparel, electronics, home decor, beauty products, or groceries, ShopNest has you covered. Our user-friendly interface allows you to browse through thousands of products effortlessly, making it easier than ever to find exactly what you're looking for.
        </p>
        <p style={paragraphStyle}>
          At ShopNest, we prioritize customer satisfaction above all else. With secure payment options, fast shipping, and responsive customer service, we strive to exceed your expectations every step of the way. Join the ShopNest community today and discover a world of endless shopping possibilities.
        </p>
      </div>
      <div style={imageContainerStyle} className="image-container">
        <img
          src={image1}
          alt="Product 1"
          style={imageStyle}
          onMouseEnter={handleHover}
          onMouseLeave={handleMouseLeave}
        />
        <img
          src={image2}
          alt="Product 2"
          style={imageStyle}
          onMouseEnter={handleHover}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    </div>
  );
};

export default AboutPage;
