import { useState } from "react";
import { Box, Button, Typography, TextField, Alert, LinearProgress } from "@mui/material";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function SignUpPage({ onSignUp, onGoToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: "", submit: "" });
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

  const passwordStrength = () => {
    if (password.length >= 10) return 100;
    if (password.length >= 8) return 70;
    if (password.length >= 6) return 40;
    return 10;
  };

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", email: "", password: "", submit: "" };

    if (!name) {
      newErrors.name = "Name is required";
      valid = false;
    }

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
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      // Fake async signup delay
      await new Promise((res) => setTimeout(res, 1000));

      // Simulated successful signup
      onSignUp({ name, email, password });
    } catch {
      setErrors((prev) => ({ ...prev, submit: "Signup failed. Try again." }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ position: "relative", height: "100vh", width: "100vw", overflow: "hidden" }}>
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions}
        style={{ position: "absolute", inset: 0, zIndex: 0 }} />
      <Box sx={{
        position: "relative", zIndex: 1, p: 3, maxWidth: 400, mx: "auto", mt: "15vh",
        bgcolor: "rgba(255,255,255,0.85)", borderRadius: 2
      }}>
        <Typography variant="h4" align="center" gutterBottom>Sign Up</Typography>

        <TextField fullWidth label="Name" margin="normal" value={name}
          onChange={(e) => setName(e.target.value)}
          error={Boolean(errors.name)} helperText={errors.name} />

        <TextField fullWidth label="Email" margin="normal" value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(errors.email)} helperText={errors.email} />

        <TextField fullWidth label="Password" type="password" margin="normal" value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={Boolean(errors.password)} helperText={errors.password} />

        <LinearProgress
          variant="determinate"
          value={passwordStrength()}
          sx={{ mt: 1, height: 8, borderRadius: 5 }}
        />

        {errors.submit && <Alert severity="error" sx={{ mt: 1 }}>{errors.submit}</Alert>}

        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </Button>
        <Button fullWidth variant="text" sx={{ mt: 1 }} onClick={onGoToLogin}>
          Already have an account? Login
        </Button>
      </Box>
    </Box>
  );
}
