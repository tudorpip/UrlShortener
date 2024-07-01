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
export function SignUpPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const navigate = useNavigate();
  const endpoint = "/user/create";
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
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const errorDetails = await response.json();
        setError(true);
        console.error("Failed to submit form", errorDetails);
      }
    } catch (error) {
      setErrorMessage(true);
      console.error("Network error:", error);
    }
  }
  return (
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
            <div>
              <Button color="primary">Sign up!</Button>
            </div>
          </Form>
        </Col>
      </Row>
      {error && (
        <h3 className="text-center mt-5" style={{ color: "red" }}>
          There is already an account with this email or username
        </h3>
      )}
      {errorMessage && (
        <h3 className="text-center mt-5" style={{ color: "red" }}>
          Something unexpected happened. Please try again later.
        </h3>
      )}
    </Container>
  );
}
export default SignUpPage;
