import { useEffect, useState } from "react";
import Ads from "../../components/Ads";
import WishListController from "../../controllers/WishListController";

export default function MyAds() {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    WishListController.get()
      .then(adsList => {
        console.log(adsList[0])
        setIsLoading(false);
        if (adsList) {
          setAds(adsList);
          setError(false);
        } else {
          setError(true);
        }
      });
  }, []);

  return (
    <Ads
      ads={ads}
      isLoading={isLoading}
      error={error}
      wishList={true}
    />
  )
}