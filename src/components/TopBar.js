import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TopBar({ onLogin, username }) {
  const [fullname, setFullname] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem(username);
        const headers = { Authorization: `Bearer ${token}` };
        const data = await axios.get("http://localhost:3030/home", {
          headers,
        });

        setFullname(data.data.first_name + data.data.last_name);
      } catch (error) {
        console.error(error);
      }
    };
    if (username) fetchData();
  }, []);
  return (
    <AppBar position="absolute">
      {/* phần tiêu đề của app */}
      <Toolbar>
        <Typography variant="h3" color={"inherit"}>
          Welcome to my app
        </Typography>

        {onLogin && (
          <div style={{ marginLeft: "auto" }}>
            <p>Hello {fullname}</p>
            <Link to="/logout" type="button">
              <button>Log out</button>
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
