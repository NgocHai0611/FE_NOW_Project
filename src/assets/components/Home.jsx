import React, { useEffect, useState } from "react";
import home_women from "../imgs/home_women.png";
import { Link } from "react-router-dom"; 
import '../css/home.css';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  
    fetch('https://6494e6aeb08e17c91791736d.mockapi.io/api/book/product')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="home_container">
      <img
        src={home_women}
        alt="home-women-container"
        className="home_womenImg"
      />
      <div className="categories_container">
        <h2 className="categories_title">Shop by Categories</h2>
        <div className="navigation_buttons">
          <button className="nav_button">←</button>
          <button className="nav_button">→</button>
        </div>
      </div>

      <div className="categories_grid">
        <div className="category_item">
          <div className="image_container">
            <img src={home_women} alt="Casual Wear" />
            <p>Casual Wear</p>
          </div>
        </div>
        <div className="category_item">
          <div className="image_container">
            <img src={home_women} alt="Western Wear" />
            <p>Western Wear</p>
          </div>
        </div>
        <div className="category_item">
          <div className="image_container">
            <img src={home_women} alt="Ethnic Wear" />
            <p>Ethnic Wear</p>
          </div>
        </div>
        <div className="category_item">
          <div className="image_container">
            <img src={home_women} alt="Kids Wear" />
            <p>Kids Wear</p>
          </div>
        </div>
      </div>

      <div className="bestsellers_container">
        <h2 className="bestsellers_title">Our Bestseller</h2>
        <div className="bestsellers_grid">
          {products.map(product => (
            <Link to={`/product/${product.id}`} className="product_card" key={product.id}>
              <img src={product.img} alt={product.name} className="product_image" />
              <h3 className="product_name">{product.name}</h3>
              <p className="product_price">${product.price}</p>
            </Link>
          ))}
        </div>
      </div>

     <div className="customer_container">
        <div className="customer_title_container">
          <h2 className="customer_title">What our Customers Say</h2>
          <div className="customer_buttons">
            <button className="nav_button_customer">←</button>
            <button className="nav_button_customer">→</button>
          </div>
        </div>

        <div className="customer_feedback">
          <div className="feedback_item">
            <div className="feedback_rating">★★★★★</div>
            <p className="feedback_text">
              "It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout."
            </p>
            <p className="feedback_author">Leslie Alexander, Model</p>
          </div>
          <div className="feedback_item">
            <div className="feedback_rating">★★★★★</div>
            <p className="feedback_text">
              "It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout."
            </p>
            <p className="feedback_author">Jacob Jones, Co-founder</p>
          </div>
          <div className="feedback_item">
            <div className="feedback_rating">★★★★★</div>
            <p className="feedback_text">
              "It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout."
            </p>
            <p className="feedback_author">Jenny Wilson, Fashion Designer</p>
          </div>
        </div>
      </div>

      {/* Our Instagram Stories */}
      <div className="instagram_stories">
        <h2 className="stories_title">Our Instagram Stories</h2>
        <div className="image_grid">
          <div className="image_item">
            <img src={home_women} alt="Instagram Story 1" />
            <p>Free Shipping<br /><span>Free shipping for order above $150</span></p>
          </div>
          <div className="image_item">
            <img src={home_women} alt="Instagram Story 2" />
            <p>Money Guarantee<br /><span>Within 30 days for an exchange</span></p>
          </div>
          <div className="image_item">
            <img src={home_women} alt="Instagram Story 3" />
            <p>Online Support<br /><span>24 hours a day, 7 days a week</span></p>
          </div>
          <div className="image_item">
            <img src={home_women} alt="Instagram Story 4" />
            <p>Flexible Payment<br /><span>Pay with multiple credit cards</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}