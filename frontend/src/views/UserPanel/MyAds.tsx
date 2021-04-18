import { useEffect, useState } from "react";
import Ads from "../../components/Ads";
import AdController from '../../controllers/AdController';

export default function MyAds() {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    AdController.getMyAds()
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
    ads.length === 0 ?
      <p style={{ textAlign: 'center' }}>
        Você ainda publicou anúncios.
      </p>
      :
      <Ads
        ads={ads}
        isLoading={isLoading}
        error={error}
        myAds={true}
      />
  )
}