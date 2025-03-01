import React, {useState, useEffect} from "react";
import { Row, Col, Media, Card, Button, ButtonGroup, Container, Image, ListGroup} from "react-bootstrap";
import ad250 from "./ads/ad250.jpg";
import newMag from "./newMag.JPG";
import magazine from "./magazines/magazine.jpg";
import "bootstrap/dist/css/bootstrap.css";
import ArticleAPI from "../apis/ArticleAPI";
import FeaturedAPI from "../apis/FeaturedAPI";
import { Link } from "react-router-dom";
import AdAPI from "../apis/AdAPI";

import doctor_image from "../routes/defaults/Doctors.jpg";
import dentist_image from "../routes/defaults/Dentist.jpg";
import chiropractor_image from "../routes/defaults/Chiropractors.jpg";
import acupuncture_image from "../routes/defaults/Acupuncture.jpg";
import personal_trainer_image from "../routes/defaults/PersonalTrainers.jpg"

const HomeSideBar = (props) => {

  const [featuredDoctors, setFeaturedDoctors] = useState([]);
  const [popularArticles, setPopularArticles] = useState([]);
  const [ads, setAds] = useState([]);
  const [ad1, setAd1] = useState({ ad_image: ad250, type: "250x250", ad_link: "/"});
  const [ad2, setAd2] = useState({ ad_image: ad250, type: "250x250", ad_link: "/"});

  const determineProfile = (doctor) => {
    if (doctor.profile_picture != null){
      return doctor.profile_picture;
    }

    if (doctor.category?.includes("Chiropractors")){
      return chiropractor_image;
    }

    if (doctor.category?.includes("Acupuncture")){
      return acupuncture_image;
    }

    if (doctor.category?.includes("Gym") || doctor.category?.includes("Personal Trainers")){
      return personal_trainer_image;
    }

    if (doctor.category?.includes("Dentist")){
      return dentist_image;
    }

    return doctor_image;
  }

   useEffect(() => {
    // Define a function fetchData that calls APIs which is then called in useEffect
    const fetchData = async () => {
      try {
        const response = await FeaturedAPI.post("/findFeaturedDoctorsPractices", {});
        console.log(response.data.data)
        setFeaturedDoctors(response.data.data);
      } catch (err) {
        console.log(err);
      }
      try {
        const response = await ArticleAPI.post("/mostViewed", {
          numOfArticles: 3,
        });
        console.log(response.data.data);
        setPopularArticles(response.data.data);
      } catch (err) {
        console.log(err);
      }
      try {
        const response = await AdAPI.post("/getAdsBySize", { size: "250x250"});
        setAds(response.data.data);
        if(typeof(response.data.data[0]) == "object"){
          setAd1(response.data.data[0]);
        }
        if(typeof(response.data.data[1]) == "object"){
          setAd2(response.data.data[1]);
        }
        console.log(response.data.data);
        console.log(response.data.data[0].ad_image);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      
     <Card border="" style={{ width: '18rem' }}>
    <Card.Body>

        <div>
          <iframe
            title="Title"
            allowFullScreen
            height="200"
            width= "250"
            scrolling="no"
            frameBorder="0"
            style={{ border: "none" }}
            src="https://www.wevideo.com/api/4/media/1921444596/embed"
          >
          </iframe>
        </div>

        <a href={ad1.ad_link}>
          <img src={ad1.ad_image} alt="ad250" style={{ maxWidth:"100%", height: "auto"}}/>
          </a>

        <hr />
                <Card.Img variant="top" src={newMag} />
                <div align="center">
                <Button variant="link" size="md" href="/subscribe">
                  Subscribe
                </Button>
                <Button variant="link" size="md" href="https://issuu.com/healthwellnessfitness/docs/1-56-compressed">
                  Read Issue
                </Button>
                </div>

        <hr />
        <div align="center">
          <h3>Popular Articles</h3>
          </div>
          <hr />
          <ul className="list-unstyled">
            {popularArticles.map((article) => {
              return (
                <>
                <Link to={"/article/" + article.article_id} style={{ textDecoration: "none", color: "black" }}>
                <h6>{article.headline}</h6>
                </Link>
                <hr />
                </>
              );
            })}
          </ul> 


        <hr />
        <div align="center">
          <h3>Featured Doctors</h3>
          </div>
          <hr />
          {featuredDoctors.map((featuredDoctor) => {
              return (
                <Container>
                  <Row>
                    <Col md={4}>
                    <Link
              to={"/doctor-profile/" + featuredDoctor.doctor_id}
              style={{ textDecoration: "none", color: "black" }}
            >
                      <Image
                        variant="top"
                        src={determineProfile(featuredDoctor)}
                        width="100%"
                      />
                      </Link>
                    </Col>
                    <Col>
                      <h6>{featuredDoctor.doctor_name}</h6>
                      <hr />

                      <h6>
                            {featuredDoctor.category.map((category, i) => <><a href={"/results/?practice=&specialty=&location=&category=" + category}>{category}</a> |</>)}{" "}
                            {featuredDoctor.specialty
                              .map((specialty, i) => <><a href={"/results/?practice=&specialty=" + specialty + "&location=&category="}>{specialty}</a> |</>)}{" "}
                          </h6>
                          <h6>
                            {featuredDoctor.practices
                              .map((practices, i) => `${practices.name} - ${practices.location}`)
                              .join(", ")}{" "}
                          </h6>
                    </Col>
                  </Row>
                  <hr />
                </Container>
                
            
            );
            })}

          <br />
        <a href={ad2.ad_link}>
          <img src={ad2.ad_image} alt="ad250" style={{ maxWidth:"100%", height: "auto"}} />
          </a>


      </Card.Body>
  </Card>

    </>
  );
};

export default HomeSideBar;
