import React, { useEffect, useContext, useState } from 'react';
import ArticleAPI from '../apis/ArticleAPI';
import { useParams } from 'react-router-dom';
import InputNewArticle from '../components/InputNewArticle';
import ArticleList from '../components/ArticleList';
import file from './file.jpg';


const Article = (props) => {
    let { id } = useParams();
    useEffect( () => {
        // Define a function fetchData that calls APIs which is then called in useEffect
        const fetchData = async () => {
            try {
                console.log(id);
                //const response = await (ArticleAPI.get("/"));
                //console.log(response.data.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, []);
    
    return(
        <div>
            <h1>Article with id: {id}</h1>
            <br/>

            <InputNewArticle />

            <ArticleList />
        </div>
    )
};

export default Article;