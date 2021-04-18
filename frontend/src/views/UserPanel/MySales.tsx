import { useEffect, useState } from "react";
import Ads from "../../components/Ads";
import SalesController from "../../controllers/SalesController";

export default function MySales() {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ownersFeedbacks, setOwnersFeedbacks] = useState([]);
  const [clientsFeedbacks, setClientsFeedbacks] = useState([]);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    SalesController.get()
      .then(salesList => {
        setIsLoading(false);
        if (salesList) {
          setAds(salesList.map(({ ad }) => ad));
          setOwnersFeedbacks(salesList.map(({ owner_feedback }) => owner_feedback));
          setClientsFeedbacks(salesList.map(({ client_feedback }) => client_feedback));
          setIds(salesList.map(({ id }) => id));

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
        ownersFeedbacks={ownersFeedbacks}
        clientsFeedbacks={clientsFeedbacks}
        purchaseIds={ids}
      />
    }
    </>
  )
}