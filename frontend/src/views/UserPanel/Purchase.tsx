import { useEffect, useState } from "react";
import Ads from "../../components/Ads";
import PurchaseController from "../../controllers/PurchaseController";

export default function MyAds() {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    PurchaseController.get()
      .then(adsList => {
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
    // <>
    //   { ads.length > 0 ? ads.map(ad => (ad)) : 'oi'}
    // </>
    <>
      Minhas Compras
    </>
    // <Ads
    //   ads={ads}
    //   isLoading={isLoading}
    //   error={error}
    //   myShopping={true}
    // />
  )
}