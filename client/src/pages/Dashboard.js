import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return <main>
    <section>
        <h1>Dashboard</h1>
        <p>Welcome back {user.username}</p>
    </section>
  </main>;
};

export default Dashboard;
