import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Form, useNavigation } from "react-router-dom";

import logo from "../../assets/logo.png";

export default function LoginPage() {
  const navigation = useNavigation();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: 380,
          p: 4,
          borderRadius: 2,
        }}
      >
        {/* Logo + Brand */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="BSS Restaurant"
            sx={{
              width: 70,
              height: 70,
              objectFit: "contain",
              mb: 1,
            }}
          />

          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            BSS Restaurant
          </Typography>
        </Box>

        {/* Login Form */}
        <Box
          component={Form}
          method="post"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            name="username"
            label="Username"
            type="text"
            fullWidth
            required
            autoComplete="username"
            defaultValue="admin@mail.com"
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            required
            autoComplete="current-password"
            defaultValue="Admin@123"
          />

          <Button
            loading={navigation.state === "submitting"}
            loadingPosition="start"
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{
              mt: 1,
              py: 1.3,
            }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
