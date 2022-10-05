import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../hooks/useForm";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const REGISTER_USER = gql`
  mutation Mutation($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      email
      username
      token
    }
  }
`;

const Register = (props) => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const registerUserCallback = () => {
    console.log("In the registerUserCallback");
    registerUser();
  };

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) {
      context.login(userData);
      navigate("/dashboard");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { registerInput: values },
  });

  return (
    <main>
      <section>
        <h1>Register</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your desired username"
              onChange={onChange}
            />
          </div>

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

          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              onChange={onChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  );
};

export default Register;
