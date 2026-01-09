import { useState } from 'react';
import '../App.css';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://formspree.io/f/xojjavgz", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSubmitted(true);
        e.target.reset();
      } else {
        alert("Oops! There was a problem submitting your form");
      }
    } catch (error) {
      alert("Error sending message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    console.log(isSubmitted)
  }

  return (
    <section id="contact" className="contact-section">

      {!isSubmitted ? (
        <>
          <h2 className="section-title">Leave a Messsage</h2>
          <p className="contact-text">
            Even if you just want to say Hi or if you want to work together.
          </p>

          <form className="contact-form" encType="text/plain" onSubmit={handleSubmit}>

            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required placeholder="John Doe" />
              </div>
              <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required placeholder="john@example.com" />
              </div>
            </div>

            <div className="input-wrapper">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required placeholder="Hello! I'd like to work with you..."></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={isSending}>
              {isSending ? "Sending..." : "Send a Message"}
              {!isSending && (
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Z" /></svg>
              )}
            </button>
          </form>

        </>
      ) : (
        <div className="success-message">
          {/* <div className="success-icon"> */}
          {/*   <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="currentColor"> */}
          {/*     <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" /> */}
          {/*   </svg> */}
          {/* </div> */}
          <h3 className="section-title">Message Sent!</h3>
          <p className="contact-text">Thank you for reaching out. I'll get back to you as soon as possible.</p>

          <button onClick={handleReset} className="submit-btn">
            Send Another Message
          </button>
        </div>

      )}
    </section>
  );
};

export default Contact;
