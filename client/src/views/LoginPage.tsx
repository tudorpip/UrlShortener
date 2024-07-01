import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "reactstrap";
const exportedUrl = process.env.REACT_APP_DEPLOYED_URL;
export function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [invalidLoginError, setInvalidLoginError] = useState<boolean>(false);
  const [unknownError, setUnknownError] = useState<boolean>(false);
  const navigate = useNavigate();
  const endpoint = "/user/login";
  const fullURL = exportedUrl + endpoint;
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(fullURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (response.ok) {
        const res = await response.json();
        localStorage.setItem("token", res.token);
        navigate("/main");
      } else {
        setInvalidLoginError(true);
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
      setUnknownError(true);
    }
  }
  // Rest of your component...
  return (
    <Container className="md-5 mt-5 small-container">
      <h1 className="text-center">Log in</h1>
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
            <div>
              <Button color="primary">Log in!</Button>
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
  );
}
export default LoginPage;
