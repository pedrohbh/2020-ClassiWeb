import { useEffect, useState } from "react";
import Ads from "../../components/Ads";
import WishListController from "../../controllers/WishListController";

export default function WishesList() {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    WishListController.get()
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
        Você ainda não adicionou anúncios a sua lista de desejos.
      </p>
      :
      <Ads
        ads={ads}
        isLoading={isLoading}
        error={error}
        wishList={true}
      />
  )
}