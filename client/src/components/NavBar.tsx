import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { Logo } from "../components/Logo";

interface NavBarProps {
  isAuthenticated: boolean;
}

export const NavBar: FC<NavBarProps> = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  return (
    <div className="nav-bar">
      <div className="left">
        <Logo />
      </div>
      <div className="right">
        {isAuthenticated ? (
          <>
            <Button
              color="primary"
              size="lg"
              className="me-5"
              onClick={() => {
                navigate("/admin/overview");
              }}
            >
              Dashboard
            </Button>
            <Button
              outline
              color="primary"
              size="lg"
              className="me-5"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/auth");
                window.location.reload();
              }}
            >
              Log out
            </Button>
          </>
        ) : (
          <>
            <Button
              outline
              color="primary"
              size="lg"
              className="me-5"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </Button>
            <Button
              color="primary"
              size="lg"
              className="me-5"
              onClick={() => navigate("/auth/register")}
            >
              Sign up
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
