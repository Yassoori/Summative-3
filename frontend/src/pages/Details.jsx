import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useLoginModalContext } from "../hooks/useLoginModalContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ProductDetails = () => {
  const { addToWishlist, wishlist } = useWishlist();
  const { addToCart, cart } = useCart();
  const { dispatch } = useLoginModalContext();
  // const { addToCart } = useCart();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [commentText, setCommentText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user ? user.username : null;
  const navigate = useNavigate()

  const handleAddToCart = () => {
    addToCart(productId); // Add the current product to the cart
  };

  const handleAddToWishlist = () => {
    addToWishlist(productId); // Pass the productId to addToWishlist
  };

  // use the dispatch action to open login modal
  const openLoginModal = () => {
    dispatch({ type: "LOGIN_OPEN" });
  };

  const handleAddComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/comments/products/${productId}/comments`,
        {
          text: commentText,
          user_id: user.email,
        }
      );

      if (response.status === 201) {
        const newComment = response.data;
        const updatedComments = [...product.comments, newComment];
        const updatedProduct = { ...product, comments: updatedComments };

        // Dispatch the updated product data
        setProduct(updatedProduct);
        setCommentText("");
        console.log(response.data);

        
      }

    } catch (error) {
      console.error("Error Adding Comment:", error);
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/products/${productId}`
        );
        if (response.status === 200) {
          setProduct(response.data);
          console.log(`Viewing Product ${productId}`, response.data);
        }
      } catch (error) {
        console.error(`Error fetching product details:`, error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return (
      <div>
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  return (
    <div className="details-page">
      <div className="details-container">
        <div className="image-container">
          {/* {product.image.map((image, index) => (
            <img
              key={index}
              className="detail-image"
              src={`${image}`}
              alt={`Product Image ${index + 1}`}
            />
          ))} */}
          <Swiper
            spaceBetween={1}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}>
            {product.image.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  key={index}
                  className="detail-image"
                  src={`${image}`}
                  alt={`Product Image ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="text-container">
          <div className="designer">{product.username}</div>
          <div className="detail-name">{product.title}</div>
          <div className="detail-description">{product.description}</div>
          <div className="detail-material">{product.materials}</div>
          <div className="detail-price">${product.price.toLocaleString()}</div>
          <div className="button-container">
            <button className="cart-button" onClick={user ? handleAddToCart : openLoginModal}>
              {/* ADD TO CART */}
              Add to Cart
            </button>
            <button className="wish-button" onClick={user ? handleAddToWishlist : openLoginModal}>
              {/* ADD TO WISHLIST */}
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
      <div className="comments-wrapper">
        <div className="add-comment">
          <input
            className="comment-input"
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <a onClick={user ? handleAddComment : openLoginModal} className="comment-submit">
            {user ? "Post" : "Login to Post"}
          </a>
        </div>
        {/* Map over comments array */}
        <ul className="comment-list">
          {product.comments.map((comment) => (
            // <div key={comment._id} className="comment">
            //   <h5>{comment.user_id}</h5>
            //   <p>{comment.text}</p>
            //   <span>
            //     posted:
            //     {formatDistanceToNow(new Date(comment.createdAt), {
            //       includeSeconds: true,
            //     })}{" "}
            //     ago
            //   </span>
            // </div>

            <li key={comment._id} className="list-item-comment">
              <div className="list-text">
                <p className="comment-user">{comment.user_id} commented:</p>
                <p className="comment-text">{comment.text}</p>
                <span>
                  posted:
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    includeSeconds: true,
                  })}{" "}
                  ago
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetails;
