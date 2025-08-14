import { useState } from "react";
import { Box, Button, Typography, TextField, FormHelperText, Alert } from "@mui/material";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function LoginPage({ onLogin, onGoToSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", submit: "" });
  const [loading, setLoading] = useState(false);

  const particlesInit = async (main) => { await loadFull(main); };

  const particlesOptions = {
    background: { color: { value: "#0d47a1" } },
    fpsLimit: 60,
    particles: {
      number: { value: 50 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 3 },
      move: { enable: true, speed: 1, direction: "none", outModes: "bounce" },
    },
    interactivity: { events: { onHover: { enable: true, mode: "repulse" } } },
  };

  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "", submit: "" };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      // Fake async login delay
      await new Promise((res) => setTimeout(res, 1000));

      // Simulated successful login (replace with real API call)
      onLogin({ email, password });
    } catch {
      setErrors((prev) => ({ ...prev, submit: "Invalid login credentials" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ position: "relative", height: "100vh", width: "100vw", overflow: "hidden" }}>
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions}
        style={{ position: "absolute", inset: 0, zIndex: 0 }} />
      <Box sx={{
        position: "relative", zIndex: 1, p: 3, maxWidth: 400, mx: "auto", mt: "20vh",
        bgcolor: "rgba(255,255,255,0.85)", borderRadius: 2
      }}>
        <Typography variant="h4" align="center" gutterBottom>Login</Typography>

        <TextField fullWidth label="Email" margin="normal" value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(errors.email)} helperText={errors.email} />

        <TextField fullWidth label="Password" type="password" margin="normal" value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={Boolean(errors.password)} helperText={errors.password} />

        {errors.submit && <Alert severity="error" sx={{ mt: 1 }}>{errors.submit}</Alert>}

        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSubmit} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
        <Button fullWidth variant="text" sx={{ mt: 1 }} onClick={onGoToSignUp}>
          Don't have an account? Sign Up
        </Button>
      </Box>
    </Box>
  );
}
