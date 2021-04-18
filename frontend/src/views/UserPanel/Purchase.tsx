import { useEffect, useState } from "react";
import Ads from "../../components/Ads";
import PurchaseController from "../../controllers/PurchaseController";

export default function Purchases() {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ownersFeedbacks, setOwnersFeedbacks] = useState([]);
  const [clientsFeedbacks, setClientsFeedbacks] = useState([]);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    PurchaseController.get()
      .then(purchaseList => {
        setIsLoading(false);
        if (purchaseList) {
          setAds(purchaseList.map(({ ad }) => ad));
          setOwnersFeedbacks(purchaseList.map(({ owner_feedback }) => owner_feedback));
          setClientsFeedbacks(purchaseList.map(({ client_feedback }) => client_feedback));
          setIds(purchaseList.map(({ id }) => id));

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
        Você ainda não realizou compras.
      </p>
      :
      <Ads
        ads={ads}
        isLoading={isLoading}
        error={error}
        myShopping={true}
        ownersFeedbacks={ownersFeedbacks}
        clientsFeedbacks={clientsFeedbacks}
        purchaseIds={ids}
      />
    }
    </>
  )
}