import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

export const Contact = () => {
  const [data, setData] = useState(defaultContactFormData);
  const { user } = useAuth();

  // Update form data with user information if available
  useEffect(() => {
    if (user) {
      setData((prevData) => ({
        ...prevData,
        username: user.username || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  // Handle form input changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleContactForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setData(defaultContactFormData);
        const responseData = await response.json();
        alert("Message sent successfully: " + responseData.message);
      } else {
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">Contact Us</h1>
      </div>
      <div className="container grid grid-half-cols">
        <div className="contact-img">
          <img
            src="/images/contact.png"
            alt="Always ready to help you"
            width="400"
            height="300"
          />
        </div>

        <section className="section-form">
          <form onSubmit={handleContactForm}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={data.username}
                onChange={handleInput}
                autoCapitalize="off"
                required
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={data.email}
                onChange={handleInput}
                autoCapitalize="off"
                required
              />
            </div>

            <div>
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                value={data.message}
                onChange={handleInput}
                autoCapitalize="off"
                required
                cols="30"
                rows="6"
              ></textarea>
            </div>

            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};
