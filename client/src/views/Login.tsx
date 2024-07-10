import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Logo } from "../components/Logo";
import { logInUser } from "../network/ApiAxios";
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
import { AxiosError } from "axios";

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === "" || email === "") {
      setError("All fields are required...");
      return;
    }
    setLoading(true);
    const res = await logInUser(email, password).catch((err) => {
      console.error("Error:", error);
      setError("Something went wrong, please try again later...");
      return null;
    });
    if (!res) {
      setLoading(false);
      return;
    }
    if (res instanceof AxiosError) {
      setLoading(false);
      setError("Invalid credentials provided");
      return;
    }
    if (res.status === 200) {
      setLoading(false);
      localStorage.setItem("token", res.data.token);
      navigate("/admin/create-url");
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
                  <Link to="/auth/register" style={{ textDecoration: "none" }}>
                    {" "}
                    Sign up now!
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
export default Login;
