import React from "react";
import home_women from "../imgs/home_women.png";
import '../css/home.css'
export default function Home() {
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
          <div className="product_card">
            <img src={home_women} alt="Roadstar" className="product_image" />
            <h3 className="product_name">Roadstar</h3>
            <p className="product_price">$38.00</p>
          </div>
          <div className="product_card">
            <img src={home_women} alt="Allen Solly" className="product_image" />
            <h3 className="product_name">Allen Solly</h3>
            <p className="product_price">$55.00</p>
          </div>
          <div className="product_card">
            <img src={home_women} alt="Louis Philippe Sport" className="product_image" />
            <h3 className="product_name">Louis Philippe Sport</h3>
            <p className="product_price">$60.00</p>
          </div>
          <div className="product_card">
            <img src={home_women} alt="Adidas" className="product_image" />
            <h3 className="product_name">Adidas</h3>
            <p className="product_price">$60.00</p>
          </div>
          <div className="product_card">
            <img src={home_women} alt="Trendyol" className="product_image" />
            <h3 className="product_name">Trendyol</h3>
            <p className="product_price">$45.00</p>
          </div>
          <div className="product_card">
            <img src={home_women} alt="YK Disney" className="product_image" />
            <h3 className="product_name">YK Disney</h3>
            <p className="product_price">$40.00</p>
          </div>
          <div className="product_card">
            <img src={home_women} alt="US Polo" className="product_image" />
            <h3 className="product_name">US Polo</h3>
            <p className="product_price">$50.00</p>
          </div>
          <div className="product_card">
            <img src={home_women} alt="Zyla" className="product_image" />
            <h3 className="product_name">Zyla</h3>
            <p className="product_price">$70.00</p>
          </div>
        </div>
      </div>
    {/* deals of the month */}
    <div className="deals_container">
      <div className="deals_content">
        <div className="deals_title_container">
          <h2 className="deals_title">Deals of the Month</h2>
        </div>
        <div className="deals_description">
          <p>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
          </p>
        </div>
        <button className="view_all_products_button">View All Products →</button>
      </div>
      <div className="deals_image">
        <img src={home_women} alt="Deals of the Month" className="deals_image_img" />
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
            <p className="feedback_text">It is a long established fact that a reader will be distracted bythe readable content of a page when looking at its layout</p>
            <p className="feedback_author">Leslie Alexander, Model</p>
          </div>
          <div className="feedback_item">
            <div className="feedback_rating">★★★★★</div>
            <p className="feedback_text">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
            <p className="feedback_author">Jacob Jones, Co-founder</p>
          </div>
          <div className="feedback_item">
            <div className="feedback_rating">★★★★★</div>
            <p className="feedback_text">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
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