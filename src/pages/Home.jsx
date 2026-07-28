import heroImg from "../assets/h1.png";
import { ChevronRight, Leaf, Droplets, Sun, Star } from "lucide-react";
import ProductSection from "../components/ProductSection";
import "./Home.css";
import Benefits from "../components/Benefits";
import HomeProducts from "../components/HomeProducts";
import { Link } from "react-router-dom";


const Home = () => {
 
  const testimonials = [
    { name: "Sarah M.", text: "My hair has never been healthier. The shine is incredible!", rating: 5 },
    { name: "Jessica L.", text: "Finally found an oil that doesn't weigh my hair down.", rating: 5 },
    { name: "Amanda K.", text: "The growth elixir actually works. I'm amazed!", rating: 5 }
  ]

  return (
    <div className="home">

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-container">

          <div className="hero-content">
            <span className="hero-tag">Natural Hair Care</span>

            <h1 className="hero-title">
              Strong, Shiny & Healthy Hair Naturally
            </h1>

            <p className="hero-description">
              Premium herbal products crafted to nourish your hair and skin naturally.
            </p>

            <div className="hero-buttons">
            
              <Link  to="/products"  className="btn-primary"  onClick={() => window.scrollTo(0, 0)} >
                Shop Now   <ChevronRight size={16} />
              </Link>

              <Link to="/contact" className="btn-outline">
                Contact Us
              </Link>

            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="hero-image">
              <img src={heroImg} alt="Hair Products" />
            </div>
          </div>

        </div>
      </section>

      {/* BENEFITS */}
      <Benefits />
      

      {/* PRODUCT SECTION */}
      <section>
        <ProductSection />
      </section>

      {/* PRODUCTS */}
      <HomeProducts />
     
      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">
              Real results from real people who love their hair transformation
            </p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="star-icon" />
                  ))}
                </div>
                <p className="testimonial-text">&quot;{testimonial.text}&quot;</p>
                <p className="testimonial-author">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="section-container">
          <div className="cta-box">
            <h2 className="cta-title">Ready for Healthier Hair?</h2>
            <p className="cta-description">
              Join thousands of customers who have transformed their hair with our natural oils.
              Get 15% off your first order when you subscribe.
            </p>
            <div className="cta-form">
              <input type="email" placeholder="Enter your email" className="cta-input" />
              <button className="btn-accentt">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;