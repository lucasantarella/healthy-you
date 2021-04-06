import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleAPI from "../apis/ArticleAPI";
import { Container, Row, Col, Card, Form, FormControl, Button } from "react-bootstrap";
import Moment from "react-moment";
import "moment-timezone";
import TopNavBar from "../components/TopNavBar";
import ad300 from "../components/ads/ad300.jpg";
import SocialShareButtons from "../components/SocialShareButtons";
import ArticleComponent from "../components/ArticleComponent";
import "bootstrap/dist/css/bootstrap.css";

const Blog = (props) => {
    const [articles, setArticles] = useState([]);

    const link =
        "https://healthy-you-project.herokuapp.com/article/87918716-f71f-4548-aea3-ad0496d44c9a";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ArticleAPI.post("/category", {
                    category: "Blog"
                })

                console.log("response:", response.data.data)
                // const articleJson = response.data.data;
                // const jsonLength = Object.keys(articleJson).length;

                // for(var i = 0; i < jsonLength; i++){
                //     setHeadlineList( prevArray => [...prevArray, articleJson[i].headline])
                //     setCategoryList( prevArray => [...prevArray, articleJson[i].category]) 
                //     setSummaryList( prevArray => [...prevArray, articleJson[i].summary]) 
                // }
                setArticles(response.data.data)

            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, []);

    return (
        // Return different webpage, depending on the validity of the ID provided
        <>
            <TopNavBar />
            <div align="center">
                <h1>Blog</h1>
            </div>
            <br />
            
                    <Container style={{ width: "65%", display: "inline-block" }}>
                        {articles.map((article) => {

                            return (
                                <>
                                    <hr />
                                    <Row>
                                        <ArticleComponent article={article} writer="Anonymous Writer" type="horizontal" />
                                        {/* {getAuthorName(article.writer_id)} */}
                                    </Row>
                                </>
                            )

                        })}
                        {articles.map((article) => {

                        return (
                            <>
                                <hr />
                                <Row>
                                    <ArticleComponent article={article} writer="Anonymous Writer" type="horizontal" />
                                    {/* {getAuthorName(article.writer_id)} */}
                                </Row>
                            </>
                        )

                        })}
                        {articles.map((article) => {

                        return (
                            <>
                                <hr />
                                <Row>
                                    <ArticleComponent article={article} writer="Anonymous Writer" type="horizontal" />
                                    {/* {getAuthorName(article.writer_id)} */}
                                </Row>
                            </>
                        )

                        })}

                    </Container>

                    <Container style={{ width: "35%", display: "inline-block" }}>
                        <Row>
                            <Col>
                                <Form inline>
                                    <FormControl type="text" placeholder="Search" />
                                    <Button variant="outline-success">Search</Button>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <br />
                            </Col>
                        </Row>
                        
                        
                        <Row>
                            <Col>
                                <br />
                                <br />
                                <h1>Recent Posts</h1>
                                <br />
                                <h2>Dental Care Basics</h2>
                                <p>Think you know everything about proper brushing and flossing techniques? Understand the basics and what you can do to promote oral health.</p>
                                <br />
                                <h2>Fat Loss Done Right</h2>
                                <p>Whether you’re looking to improve your overall health or simply slim down for summer, burning off excess fat can be quite challenging.</p>
                                <br />
                                <h2>Hyperthyroid</h2>
                                <p>Hyperthyroidism is the production of too much thyroxine hormone. It can increase metabolism.
Symptoms include unexpected weight loss, rapid or irregular heartbeat, sweating, and irritability, although the elderly often experience no symptoms.</p>
                                <br />
                                <img src={ad300} alt="ad300" width={250} mode='fit' />

                            </Col>
                            
                        </Row>
                        <Row>
                            <Col>
                                <br />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <br />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <br />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <br />
                            </Col>
                        </Row>
                        <br />


                    </Container>




        </>
    );
};

export default Blog;