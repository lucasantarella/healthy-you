import React, {useState, useEffect} from "react";
import ad728 from "./ads/ad728.jpg";
import "bootstrap/dist/css/bootstrap.css";
import AdAPI from "../apis/AdAPI";

const AdBreak = (props) => {
  const [ads, setAds] = useState([]);
  const [ad1, setAd1] = useState({ ad_image: ad728, type: "728x90", ad_link: "/"});

  useEffect(() => {
    const fetchData = async () => {
try {
        const response = await AdAPI.post("/getAdsBySize", { size: "728x90"});
        setAds(response.data.data);
        setAd1(response.data.data[0]);
        console.log(response.data.data);
        console.log(response.data.data[0].ad_image);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [])
  return (
    <>
      <br />
      <br />
      <div align="center">
        <img src={ad1.ad_image} alt="ad728" width={728} height={90} mode="fit" />
      </div>
      <br />
    </>
  );
};

export default AdBreak;
