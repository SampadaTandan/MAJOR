// import { Analytics } from "../components/Analytics";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

export const Home = () => {
  return (
    <>
      <main>
        {/* Carousel Section with Crossfade Effect */}
        <section className="section-hero">
          <Carousel fade>
            <Carousel.Item>
              <img
                src="/images/carousel1.jpg" // Add a valid image path here
                alt="First slide"
                width="100%"
                height="500"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                src="/images/carousel2.jpg" // Add a valid image path here
                alt="Second slide"
                width="100%"
                height="500"
              />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                src="/images/carousel3.jpg" // Add a valid image path here
                alt="Third slide"
                width="100%"
                height="500"
              />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </section>

        {/* Main Content */}
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>We are the World Best IT Company</p>
              <h1>Welcome to Supran Technical</h1>
              <p>
                Are you ready to take your business to the next level with
                cutting-edge IT solutions? Look no further! At Supran Technical,
                we specialize in providing innovative IT services and solutions
                tailored to meet your unique needs.
              </p>
              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">connect now</button>
                </a>
                <a href="/services">
                  <button className="btn secondary-btn">learn more</button>
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hero-image">
              <img
                src="/images/home1.jpg"
                alt="coding together"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>

        {/* Additional Section */}
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-image">
              <img
                src="/images/home2.jpg"
                alt="coding together"
                width="400"
                height="500"
              />
            </div>
            <div className="hero-content">
              <p>We are here to help you</p>
              <h1>Get Started Today</h1>
              <p>
                Ready to take the first step towards a more efficient and secure
                IT infrastructure? Contact us today for a free consultation and
                discuss how Supran Technical can help your business thrive in
                the digital age.
              </p>
              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">connect now</button>
                </a>
                <a href="/services">
                  <button className="btn secondary-btn">learn more</button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
