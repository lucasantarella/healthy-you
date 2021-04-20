import React, { useEffect, useContext, useState } from "react";
import SearchAPI from "../apis/SearchAPI";
import DoctorAPI from "../apis/DoctorAPI";
import SearchBar from "../components/SearchBar";
import { AppContext } from "../context/AppContext";
import queryString from "query-string";
import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Accordion,
  Button,
  Card,
  ListGroup,
  ButtonGroup,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { SocialIcon } from "react-social-icons";
import magazine from "../components/magazines/magazine.jpg";
import newMag from "./newMag.JPG";
import doctorPhoto from "./file.jpg";
import adLong from "../components/ads/ad300.jpg";
import TopNavBar from "../components/TopNavBar";

import fivestar from "./stars/FiveStar.png";
import fourhstar from "./stars/FourHStar.png";
import fourstar from "./stars/FourStar.png";
import threehstar from "./stars/ThreeHStar.png";
import threestar from "./stars/ThreeStar.png";
import twohstar from "./stars/TwoHStar.png";
import twostar from "./stars/TwoStar.png";
import onehstar from "./stars/OneHStar.png";
import onestar from "./stars/OneStar.png";
import hstar from "./stars/HStar.png";
import star from "./stars/Star.png";

const Results = (props) => {
  const { results, setResults } = useContext(AppContext);

  const [featuredDoctor, setFeaturedDoctor] = useState("");

  const determineStars = (rating) => {
    //alert(rating);
    if(rating > 4.75){
      return fivestar;
    } else if (rating > 4.25 && rating <= 4.75){
      return fourhstar;
    } else if (rating > 3.75 && rating <= 4.25){
      return fourstar;
    } else if (rating > 3.25 && rating <= 3.75){
      return threehstar;
    } else if (rating > 2.75 && rating <= 3.25){
      return threestar;
    } else if (rating > 2.25 && rating <= 2.75){
      return twohstar;
    } else if (rating > 1.75 && rating <= 2.25){
      return twostar;
    } else if (rating > 1.25 && rating <= 1.75){
      return onehstar;
    } else if (rating > 0.75 && rating <= 1.25){
      return onestar;
    } else if (rating > 0.25 && rating <= 0.75){
      return hstar;
    } else {
      return star;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        var whereClause = {};
        const search = props.location.search;
        const params = queryString.parse(search);
        console.log(params);

        if (params.practice == null) {
          whereClause["practice"] = "";
        } else {
          whereClause["practice"] = params.practice;
        }

        if (params.doctor == null) {
          whereClause["doctor_name"] = "";
        } else {
          whereClause["doctor_name"] = params.doctor;
        }

        if (params.location == null) {
          whereClause["location"] = "";
        } else {
          whereClause["location"] = params.location;
        }

        if (params.rating == null) {
          whereClause["rating"] = "";
        } else {
          whereClause["rating"] = params.rating;
        }

        if (params.specialty == null) {
          whereClause["specialty"] = "";
        } else {
          whereClause["specialty"] = params.specialty;
        }

        console.log(whereClause);

        const response = await SearchAPI.post(
          "/search",
          whereClause
          // {
          //     practice: params.practice,
          //     doctor_name: params.doctor,
          //     location: params.location,
          //     rating: params.rating,
          //     specialty: params.specialty
          // }
        );
        setResults(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        console.log(err);
      }

      try {
        const response = await DoctorAPI.get(
          "/random"
          // {
          //     practice: params.practice,
          //     doctor_name: params.doctor,
          //     location: params.location,
          //     rating: params.rating,
          //     specialty: params.specialty
          // }
        );
        setFeaturedDoctor(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [props.location.search, setResults]);

  return (
    <div>
      <TopNavBar />
      <Container fluid="md">
        <br/>
        <SearchBar />
        <br />
        <Row align="left">
          <Col align="left">
            <div align="left">
              <h3>Featured Doctors</h3>
            </div>
            

            <br />

            <Link
              to={"/doctor-profile/" + featuredDoctor.doctor_id}
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListGroup.Item>
                <Container fluid="md">
                  <Row>
                    <Col>
                      <Card.Img
                        variant="top"
                        src={featuredDoctor.profile_picture}
                      />
                    </Col>
                    <Col>
                      <h4>{featuredDoctor.doctor_name}</h4>
                      <Image
                            src={determineStars(featuredDoctor.rating)}
                            className=""
                            style={{ width: "50%" }}
                          /><br /><br />
                      <h6>Specialty: {featuredDoctor.specialty}</h6>
                      <h6>Location: Morristown, NJ</h6>
                      <h6>Phone: {featuredDoctor.phone}</h6>
                      <br />

                      <Button variant="success" size="md" block href="/book-appointment">
                        Available starting April 8
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </ListGroup.Item>
            </Link>

            <br />
            <div align="left">
              <h3>Search Results</h3>
            </div>
            {results.map((results, index) => {
              return (
                <Link
                  to={"/doctor-profile/" + results.doctor.doctor_id}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListGroup.Item>
                    <Container fluid="md">
                      <Row>
                        <Col>
                          <Card.Img
                            variant="top"
                            src={results.doctor.profile_picture}
                          />
                        </Col>
                        <Col>
                          <h4>{results.doctor.doctor_name}</h4>
                          <Image
                            src={determineStars(results.doctor.rating)}
                            className=""
                            style={{ width: "50%" }}
                          /><br /><br />
                          <h6>Specialty: {results.doctor.specialty}</h6>
                          <h6>Location: Morristown, NJ</h6>
                          <h6>Phone: {results.doctor.phone}</h6>
                          <br />

                          <Button
                            variant="success"
                            size="md"
                            href="/book-appointment"
                            block
                          >
                            Available starting April 8
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </ListGroup.Item>
                </Link>
              );
            })}
          </Col>

         
          <Col align="center">
            <h3>Follow us</h3>
            <SocialIcon url="https://www.facebook.com/hwfmg/" />{" "}
            <SocialIcon url="https://twitter.com/HWFMagazine1/" />{" "}
            <SocialIcon url="https://www.instagram.com/healthwellnessfitnessmag/" />{" "}
            <SocialIcon url="https://www.linkedin.com/company/health-wellness-&-fitness" />
            <br />
            <br />
            <br />

            <div style={{ width: "50%" }}>
            <Card>
                <Card.Body>
                  <Card.Title><h3>Doctor Finder</h3></Card.Title>
                </Card.Body>
              </Card>
            </div>

            

            <Form style={{ width: "50%" }}   >
              <Form.Control 
                type="email"
                placeholder="Search Doctors"
                rounded
                size="sm"
      
              />
            </Form>
            
            <div style={{ width: "50%" }}>
        
              <Accordion>

                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0" size="sm">
                      + SPECIALTY
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      Allergy and immunology | Anesthesiology | Dermatology |
                      Diagnostic radiology | Emergency medicine | Family
                      medicine | Internal medicine | Medical genetics |
                      Neurology | Nuclear medicine | Obstetrics and gynecology |
                      Ophthalmology | Pathology | Pediatrics | Physical medicine
                      and rehabilitation | Preventive medicine | Psychiatry |
                      Radiation oncology | Surgery| Urology
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1" size="sm" >
                      + LOCATION
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      Harrison, NJ | Kearny, NJ | East Orange, NJ | Irvington,
                      NJ | Hillside, NJ | Orange, NJ | North Arlington, NJ |
                      Belleville, NJ | South Orange, NJ | Bloomfield, NJ |
                      Jersey City, NJ | Maplewood, NJ | Elizabeth, NJ | Union,
                      NJ | Bayonne, NJ
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
            <br />
            <br />
            <br />
            <div align="center">
              <h3>Magazine</h3>
            </div>
            <div align="center" style={{ width: "50%" }}>
              <ButtonGroup vertical>
                <Card.Img variant="top" src={newMag} />

                <Button variant="outline-info" size="md" href ="https://issuu.com/healthwellnessfitness">
                  Subscribe
                </Button>

                <Button variant="outline-info" size="md" href="https://issuu.com/healthwellnessfitness/docs/1-56-compressed">
                  Read Issue
                </Button>


              </ButtonGroup>
            </div>
            <br />
            <Card.Img variant="top" src={adLong} style={{ width: "50%" }} />
            <br />
            <br />
            <br />
            <br />
            <div align="center" style={{ width: "50%" }}>
              <h3>Featured Listings</h3>
            </div>
            <Card.Img
              variant="top"
              src={featuredDoctor.profile_picture}
              style={{ width: "50%" }}
            />
            <div style={{ width: "50%" }}>
              <Link
                to={"/doctor-profile/" + featuredDoctor.doctor_id}
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListGroup.Item>
                  <Container fluid="md">
                    <Row>
                      <Col>
                        <h3>{featuredDoctor.doctor_name}</h3>
                        <h6>Morristown, NJ</h6>
                        <h6>{featuredDoctor.phone}</h6>
                        <br />
                        <h6>Specialty: {featuredDoctor.specialty}</h6>
                        <h6>Location: Morris County</h6>

                        <Button
                          variant="info"
                          size="lg"
                          href="/book-appointment"
                        >
                          Book now
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
              </Link>
            </div>
            
            <br />
          </Col>
         
        </Row>
      </Container>
      <br />
      <br />
      <div align="center">
        <ButtonGroup aria-label="Basic example">
          <Button variant="outline-info">1</Button>
          <Button variant="outline-info">2</Button>
          <Button variant="outline-info">3</Button>
          <Button variant="outline-info">...</Button>
          <Button variant="outline-info">More</Button>
        </ButtonGroup>
      </div>
      <br />
      <br />
    </div>
  );
};

export default Results;
