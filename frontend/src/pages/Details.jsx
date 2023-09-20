import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { useCommentsContext } from "../hooks/useCommentContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ProductDetails = () => {
  // We only need dispatch if we manage the delete comment function
  const { dispatch } = useCommentsContext();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [commentText, setCommentText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user ? user.username : null;

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

  // const handleDelete = async (commentId) => {
  //   const response = await axios.delete(
  //     `http://localhost:4000/api/comments/products/${productId}/comments/${commentId}`
  //   );
  //   const json = await response.data;

  //   if (response.status === 200) {
  //     console.log(json, "is deleted");
  //     dispatch({ type: "DELETE_COMMENT", payload: commentId });
  //   }
  // };

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
    <>
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
            pagination={{ clickable: true }}
            modules={[Pagination]}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
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
          <div className="detail-price">${product.price} Tax incl.</div>
            <div className="button-container">
              <button className="cart-button">ADD TO CART</button>
              <button className="wish-button">ADD TO WISHLIST</button>
          </div>
        </div>
      </div>
<div className="comments-wrapper">
      {/* Map over comments array */}
      <div className="comments">
        {product.comments.map((comment) => (
          <div key={comment._id} className="comment">
            <h5>{comment.user_id}</h5>
            <p>{comment.text}</p>
            <span>
              posted:
              {formatDistanceToNow(new Date(comment.createdAt), {
                includeSeconds: true,
              })}{" "}
              ago
            </span>

            {/* {user_id && comment.user_id === user_id && (
          <p className="delete" onClick={handleDelete(comment._id)}>
            delete
          </p>    
        )} */}
          </div>
        ))}
      </div>

      <div className="add-comment">
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={handleAddComment}>Submit</button>
      </div>
      </div>
    </>
  );
};

export default ProductDetails;
