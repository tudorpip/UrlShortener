import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import "bootstrap/dist/css/bootstrap.min.css";
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
import { register } from "../network/ApiAxios";
import { AxiosError } from "axios";
export function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  async function handleSubmit(e: any) {
    e.preventDefault();
    if (username === "" || password === "" || email === "") {
      setError("All fields are required...");
      return;
    }
    setLoading(true);
    try {
      const res = await register(username, email, password);
      if (res.status === 200) {
        setLoading(false);
        navigate("/auth/login");
      }
      if (res instanceof AxiosError && res.response?.status !== 500) {
        setLoading(false);
        setError("Email is already used");
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response?.status !== 500) {
        setError("Email is already used");
        return;
      }

      setError("Something went wrong, please try again later...");
      console.error("Network error:", error);
    }
  }
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
    <body>
      <NavBar />
      <Container className="md-5 mt-5 small-container">
        <h1 className="text-center">Sign up</h1>
        <Row>
          <Col md={{ size: 4, offset: 4 }}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="username_input" className="mt-5">
                  Username
                </Label>
                <Input
                  id="username_input"
                  className="form-control"
                  name="username"
                  placeholder="Please enter your username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Email</Label>
                <Input
                  id="email_input"
                  className="form-control"
                  name="email"
                  placeholder="Please enter your email..."
                  type="email"
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
                <Button className="mb-3 mt-3 btn-lg" color="primary">
                  Sign up!
                </Button>
                <p>
                  Already have an account?
                  <Link to="/auth/login" style={{ textDecoration: "none" }}>
                    {" "}
                    Log in now...
                  </Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
        {error !== "" && (
          <h3 className="text-center mt-5" style={{ color: "red" }}>
            {`${error}`}
          </h3>
        )}
      </Container>
    </body>
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
export default Register;
