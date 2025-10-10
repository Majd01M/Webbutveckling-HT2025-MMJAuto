import { useState, useContext } from "react"; 
import { UserContext } from "../context/UserContext";
import { loginUser } from "../services/api";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setUser } = useContext(UserContext); // ✅ Correct useContext placement

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
  
      // Save user to both localStorage & context
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
  
      setMessage(`Welcome ${user.name} (role: ${user.role})`);
  
      // ✅ Play car sound
      const carSound = new Audio("/mixkit-fast-car-drive-by-1538.wav");
      carSound.volume = 0.7;
  
      await carSound.play().catch((err) => {
        console.warn("Autoplay blocked by browser:", err);
      });
  
      // ✅ Wait 1 second so the sound can play before redirecting
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
  
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        {message && <Alert severity="info">{message}</Alert>}

        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default LoginPage;