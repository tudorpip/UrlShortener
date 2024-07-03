import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Logo } from "../components/Logo.tsx";
import { logInUser } from "../network/ApiAxios.ts";
import {
  Input,
  Form,
  FormGroup,
  Label,
  Container,
  Row,
  Col,
  Button,
  Spinner,
} from "reactstrap";
export function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [invalidLoginError, setInvalidLoginError] = useState<boolean>(false);
  const [unknownError, setUnknownError] = useState<boolean>(false);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await logInUser(email, password);
      setLoading(false);
      localStorage.setItem("token", response.data.token);
      navigate("/main");
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setInvalidLoginError(true);
        console.error("Invalid credentials provided");
      } else {
        console.error("Error:", error);
        setUnknownError(true);
      }
    }
  }
  // Rest of your component...
  return loading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Spinner
        color="primary"
        style={{
          height: "10rem",
          width: "10rem",
        }}
        type="grow"
      >
        Loading...
      </Spinner>
    </div>
  ) : (
    <>
      <NavBar />
      <Container className="md-5 mt-5 small-container">
        <h1 className="text-center">Log in</h1>
        <Row>
          <Col md={{ size: 4, offset: 4 }}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="email_input" className="mt-5">
                  Email
                </Label>
                <Input
                  id="email_input"
                  className="form-control"
                  name="email"
                  placeholder="Please enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  id="examplePassword"
                  className="form-control"
                  name="password"
                  placeholder="Please enter your password..."
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <div className="d-flex flex-column align-items-center">
                <Button className="btn-lg mt-3 mb-3" color="primary">
                  Log in!
                </Button>
                <p>
                  Don't have an account yet?{" "}
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    {" "}
                    Sign up now!
                  </Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
        {invalidLoginError && (
          <h3 className="text-center mt-5" style={{ color: "red" }}>
            Invalid username or password...
          </h3>
        )}
        {unknownError && (
          <h3 className="text-center mt-5" style={{ color: "red" }}>
            An unknown error has occured, please try again later...
          </h3>
        )}
      </Container>
    </>
  );
}
function NavBar() {
  return (
    <div className="nav-bar">
      <div className="left">
        <Logo />
      </div>
    </div>
  );
}
export default LoginPage;
