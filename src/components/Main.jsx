import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../slides/Context";

export default function Main() {

  const [category, setCategory] = useState([]);

  const [slider, setSlider] = useState([]);

  const [product, setProduct] = useState([]);

  const [showSub, setSub] = useState([]);

  const [review, setReview] = useState([]);

  const navigate = useNavigate();

  // useeffect for category

  useEffect(() => {
    const fetchapi = async () => {
      try {
        const response = await axios.get(
         `${process.env.REACT_APP_API_BASE_URL}/admin/manage-categoryapi`
        );
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setCategory([]); // Agar error aaye to empty array set karein
      }
    };

    fetchapi();
  }, []);

  // useeffect for slider

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/admin/sliderapi`);
        setSlider(res.data);
      } catch (err) {
        console.log("Error fetching slider:", err.message);
        setSlider([]);
      }
    };

    fetchdata();
  }, []);

  // useeffect for collection

  useEffect(() => {
    const fetcheddata = async () => {
      try {
        const resp = await axios.get(
         `${process.env.REACT_APP_API_BASE_URL}/admin/manage-productapi`
        );
        setProduct(resp.data);
      } catch (err) {
        console.log(err);
        setProduct([]);
      }
    };

    fetcheddata();
  }, []);

  // useeffect for sub category

  useEffect(() => {
    const fetchsubapiii = async () => {
      try {
        const respo = await axios.get(
         `${process.env.REACT_APP_API_BASE_URL}/admin/manage-sub-catapi`
        );
        setSub(respo.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchsubapiii();
  }, []);

  // useefect for reviews

  useEffect(() => {
    const fetchreview=async () => {
      try {
        const respon = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/admin/review-details`);
        setReview(respon.data);

      }
      catch (err) {
        console.log(err);
      }
    }

    fetchreview();
  },[])

  const handleshop = () => {
    navigate('/next',{state:{product:product}});
  }

  return (
    <div>

      
      {/*--------------------------------------- slider --------------------------- */}
      <Swiper
      autoplay={{
        delay: 1400,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
    >
      {slider.map((sli, index) =>
        sli.file.map((img, imgIndex) => (
          <SwiperSlide key={`${index}-${imgIndex}`}>
            <div className="swiper-slide-container">
              <img
                src={`${process.env.REACT_APP_API_BASE_URL}${img}`}
                alt=""
                className="swiper-image"
              />
              <div className="animated-card">
                <h2 className="card-heading">New Collection 2025</h2>
                <p className="card-subtext">Trendy & Exclusive</p>
                <button className="shop-button" onClick={handleshop}>
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))
      )}
    </Swiper>

      {/*---------------------------------- categories --------------------------- */}

      <div className="container-fluid main-cont1">
  <div className="row text-center">
    <h1>
      Different <span id="cat">Categories</span>
    </h1>

    <div className="d-flex flex-wrap justify-content-center">
      {category.map((cate, index) => (
        <Link
          to="/next"
          style={{ textDecoration: 'none', color: 'inherit' }}
          state={{
            showSub: showSub.filter(
              (p) => p.category === cate.category
            ),
            product: product.filter(
              (p1) => p1.category === cate.category
            ),
          }}
          key={index}
        >
          <div
            className="card cc mt-5"
            style={{ width: "18rem", margin: "10px", cursor: 'pointer' }}
          >
            <img
              src={`${process.env.REACT_APP_API_BASE_URL}${cate.image}`}
              className="card-img-top img-fluid"
              alt="image unavailable"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">{cate.category}</h5>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</div>

      {/* ------------------------------------- reviews -------------------------- */}

      
      <div className="container-fluid main-cont3 gx-0">
  <div className="row gx-0">
    <h2 style={{color:'gold',marginBottom:'50px',fontWeight:'700',textDecoration:'underline'}}>Customers Reviews</h2>

    {/* Single Carousel for All Reviews */}
    <div id="carouselExample" className="carousel slide" style={{border:'5px solid white',height:'200px',padding:'30px'}}>
      <div className="carousel-inner text-light" >
        {review.map((rev, index) => (
          <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
            <h5 >{rev.name}</h5>
            <h5 style={{paddingTop:'10px'}}>
              {Array.from({ length: rev.rating }, (_, i) => (
                <span key={i}>⭐</span>
              ))}
            </h5>
            <h5 style={{paddingTop:'10px'}}>{rev.review}</h5>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</div>


      {/* -------------------------------- collection ------------------------- */}


      <div className="container-fluid main-cont4">
        <div className="row">
        <h1 className="text-center my-4">Our Collections</h1>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 text-grey p-5 bg-img">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis corrupti minus neque omnis illum, numquam quo exercitationem, dolores recusandae excepturi ducimus nam nisi sunt quis sequi veritatis doloribus reprehenderit facere expedita beatae quos! Facere quia cumque odit tempore maxime ipsa ratione, inventore consectetur, eligendi quibusdam nesciunt deserunt, debitis illo vero dolorum maiores deleniti veritatis totam dicta vel omnis? Expedita aut consectetur nemo soluta suscipit tenetur, pariatur, iusto assumenda placeat temporibus eum porro, architecto ab distinctio excepturi libero. Nostrum distinctio repellat nisi eius facilis cupiditate labore necessitatibus, vero aliquid molestiae eum, possimus quibusdam saepe unde dolor? Molestias nam assumenda inventore facilis perferendis officia fugit expedita quo rem nemo sed eaque neque dignissimos commodi tempore animi sit excepturi doloribus rerum suscipit quaerat, enim asperiores. Sit deleniti repellendus non autem adipisci, quae, voluptatibus reprehenderit, corporis alias ut rem nulla eius ex aspernatur esse nostrum assumenda tenetur vel. Velit voluptate culpa molestias repellat recusandae. Maiores consequatur delectus fuga tempore provident ullam autem, dolores repellat suscipit nulla laudantium laborum facere nam distinctio animi, obcaecati perspiciatis est non voluptates a repellendus? Quod ullam quo ipsum labore l
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {product.slice(0,4).map((pro, index) => (
              <div
                className="card p-3 shadow-lg"
                style={{ width: "18rem" }}
                key={index}
              >
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}${pro.image[0]}`}
                  className="card-img-top"
                  alt="image"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{pro.product}</h5>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>

      {/*--------------------------------------- accordion -------------------------------- */}

      <div className="container-fluid main-cont5">
        <div className="row">
          <div className="col-12">
            <div id="accordion-main">
              <h1>
                <span className="faq">F</span>requently Asked Questions
              </h1>

              <div
                className="accordion accordion-flush"
                id="accordionFlushExample"
              >
                <div className="accordion-item ">
                  <h2 className="accordion-header  ">
                    <button
                      className="accordion-button collapsed bg-dark text-light mt-4"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      How to book order?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      Placeholder content for this accordion, which is intended
                      to demonstrate the <code>.accordion-flush</code>{" "}
                      className. This is the first item's accordion body.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed bg-dark text-light mt-4"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseTwo"
                      aria-expanded="false"
                      aria-controls="flush-collapseTwo"
                    >
                      Do you offer international shipping?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      Placeholder content for this accordion, which is intended
                      to demonstrate the <code>.accordion-flush</code>{" "}
                      className. This is the second item's accordion body. Let's
                      imagine this being filled with some actual content.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed bg-dark text-light mt-4"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseThree"
                      aria-expanded="false"
                      aria-controls="flush-collapseThree"
                    >
                      How long does delivery take?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseThree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      Placeholder content for this accordion, which is intended
                      to demonstrate the <code>.accordion-flush</code>{" "}
                      className. This is the third item's accordion body.
                      Nothing more exciting happening here in terms of content,
                      but just filling up the space to make it look, at least at
                      first glance, a bit more representative of how this would
                      look in a real-world application.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed bg-dark text-light mt-4"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseFour"
                      aria-expanded="false"
                      aria-controls="flush-collapseFour"
                    >
                      How can I track my order?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseFour"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      Placeholder content for this accordion, which is intended
                      to demonstrate the <code>.accordion-flush</code>{" "}
                      className. This is the third item's accordion body.
                      Nothing more exciting happening here in terms of content,
                      but just filling up the space to make it look, at least at
                      first glance, a bit more representative of how this would
                      look in a real-world application.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed bg-dark text-light mt-4"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseFive"
                      aria-expanded="false"
                      aria-controls="flush-collapseFive"
                    >
                      Can I cancel or modify my order after placing it?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseFive"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      Placeholder content for this accordion, which is intended
                      to demonstrate the <code>.accordion-flush</code>{" "}
                      className. This is the third item's accordion body.
                      Nothing more exciting happening here in terms of content,
                      but just filling up the space to make it look, at least at
                      first glance, a bit more representative of how this would
                      look in a real-world application.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
