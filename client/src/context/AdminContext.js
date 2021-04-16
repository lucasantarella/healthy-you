import React, { useState, createContext } from "react";

export const AdminContext = createContext();

export const AdminContextProvider = (props) => {
  const [allReviews, setAllReviews] = useState([]);

  const addReview = (review) => {
    setAllReviews([...allReviews, review]);
  };

  return (
    <AdminContext.Provider
      value={{
        allReviews,
        setAllReviews,
        addReview,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};