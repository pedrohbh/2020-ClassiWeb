import { useEffect, useState } from "react";
import Ads from "../../components/Ads";
import SalesController from "../../controllers/SalesController";

export default function MySales() {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    SalesController.get()
      .then(adsList => {
        setIsLoading(false);
        if (adsList) {
          setAds(adsList.map(({ ad }) => ad));
          setError(false);
        } else {
          setError(true);
        }
      });
  }, []);

  return (
    <>
    {
      ads.length === 0 ?
      <p style={{ textAlign: 'center' }}>
        Você ainda não realizou vendas.
      </p>
      :
      <Ads
        ads={ads}
        isLoading={isLoading}
        error={error}
        mySales={true}
      />
    }
    </>
  )
}