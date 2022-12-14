import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../hooks/useForm";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const LOGIN_USER = gql`
  mutation Mutation($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      email
      username
      token
    }
  }
`;

const Login = (props) => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  const loginUserCallback = () => {
    loginUser();
  };

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { loginUser: userData } }) {
      context.login(userData);
      navigate("/dashboard");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { loginInput: values },
  });

  return (
    <main>
      <section>
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="username">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email address"
              onChange={onChange}
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  );
};

export default Login;
