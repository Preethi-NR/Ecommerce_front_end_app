import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form fields after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    // Show the popup message for 3 seconds
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  const containerStyle = {
    padding: '20px',
    animation: 'fadeIn 1s ease-in'
  };

  const inputStyle = {
    width: 'calc(100% - 24px)', // Adjusted width to account for padding
    padding: '10px',
    fontSize: '16px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    transition: 'transform 0.3s ease',
  };

  const textareaStyle = {
    width: 'calc(100% - 24px)', // Adjusted width to account for padding
    padding: '10px',
    fontSize: '16px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    transition: 'transform 0.3s ease',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
  };

  const popupStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '5px',
    zIndex: '999',
    display: submitted ? 'block' : 'none',
    animation: 'fadeIn 0.5s ease-in-out',
  };

  const handleHover = (event) => {
    event.target.style.transform = 'scale(1.05)';
  };

  const handleMouseLeave = (event) => {
    event.target.style.transform = 'scale(1)';
  };

  return (
    <div style={containerStyle}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            style={{ ...inputStyle, animation: 'slideInLeft 1s forwards' }}
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            style={{ ...inputStyle, animation: 'slideInRight 1s forwards' }}
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
          />
        </div>
        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            style={{ ...textareaStyle, animation: 'slideInLeft 1s forwards' }}
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
          ></textarea>
        </div>
        <button 
          type="submit" 
          style={{ ...buttonStyle, animation: 'slideInRight 1s forwards' }}
          onMouseEnter={handleHover}
          onMouseLeave={handleMouseLeave}
        >
          Submit
        </button>
      </form>
      <div style={popupStyle}>Your details have been submitted successfully!</div>
    </div>
  );
};

export default ContactPage;
