import { useEffect, useState } from "react";
import UserController from '../../controllers/UserController';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    UserController.getAll()
      .then(userList => {
        setUsers(userList);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      { isLoading ? 'carregando usuários' : JSON.stringify(users)}
    </>
  );
}