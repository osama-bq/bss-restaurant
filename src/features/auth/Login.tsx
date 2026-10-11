import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import {
  InsightsOutlined,
  ReceiptLongOutlined,
  TableRestaurantOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { keyframes } from "@mui/material/styles";
import type { ReactNode } from "react";
import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";

import logo from "../../assets/logo.svg";

const BRAND = "BSS Restaurant";

const DEFAULT_PASS = "Admin@123";

const FEATURES = [
  {
    icon: <ReceiptLongOutlined fontSize="small" />,
    title: "Live order tracking",
    description: "Follow every order from the kitchen to the table.",
  },
  {
    icon: <TableRestaurantOutlined fontSize="small" />,
    title: "Tables & staff",
    description: "See the floor status and assign your team in a click.",
  },
  {
    icon: <InsightsOutlined fontSize="small" />,
    title: "Sales insights",
    description: "Revenue, expenses and top sellers at a glance.",
  },
];

const driftA = keyframes`
  0% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(80px, 120px) scale(1.15); }
  100% { transform: translate(-40px, 60px) scale(0.9); }
`;

const driftB = keyframes`
  0% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(-100px, -80px) scale(0.85); }
  100% { transform: translate(60px, -120px) scale(1.1); }
`;

const glowSx = {
  position: "absolute",
  borderRadius: "50%",
  pointerEvents: "none",
  willChange: "transform",
  "@media (prefers-reduced-motion: reduce)": { animation: "none" },
} as const;

const inputSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "background.paper",
    borderRadius: 1,
  },
};

export default function LoginPage() {
  const navigation = useNavigation();
  const actionData = useActionData() as { error?: string } | undefined;
  const [showPassword, setShowPassword] = useState(false);

  const isSubmitting = navigation.state === "submitting";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr" },
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          p: 6,
          color: "common.white",
          bgcolor: "grey.900",
        }}
      >
        <Box
          aria-hidden
          sx={(theme) => ({
            ...glowSx,
            top: -220,
            right: -160,
            width: 720,
            height: 720,
            background: `radial-gradient(
              circle,
              ${alpha(theme.palette.primary.main, 0.45)} 0%,
              ${alpha(theme.palette.primary.main, 0)} 70%
            )`,
            filter: "blur(14px)",
            animation: `${driftA} 9s ease-in-out infinite alternate`,
          })}
        />

        <Box
          aria-hidden
          sx={(theme) => ({
            ...glowSx,
            bottom: -220,
            left: -160,
            width: 620,
            height: 620,
            background: `radial-gradient(circle, ${alpha(theme.palette.info.main, 0.28)}, transparent 65%)`,
            filter: "blur(10px)",
            animation: `${driftB} 13s ease-in-out infinite alternate`,
          })}
        />

        <Stack
          direction="row"
          spacing={3}
          sx={{ alignItems: "center", position: "relative" }}
        >
          <LogoTile size={48} />

          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {BRAND}
          </Typography>
        </Stack>

        <Stack spacing={2} sx={{ position: "relative", maxWidth: 520 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, lineHeight: 1.15, letterSpacing: -0.5 }}
          >
            Run your restaurant floor with confidence.
          </Typography>

          <Typography variant="body1" sx={{ color: "grey.400" }}>
            Manage orders, tables, staff and sales from one clean dashboard, so
            service keeps moving and decisions are backed by real numbers.
          </Typography>
        </Stack>

        <Stack
          spacing={2.5}
          sx={(theme) => ({
            position: "relative",
            maxWidth: 520,
            p: 3,
            borderRadius: 2,
            border: 1,
            borderColor: alpha(theme.palette.common.white, 0.12),
            bgcolor: alpha(theme.palette.common.white, 0.05),
            backdropFilter: "blur(8px)",
          })}
        >
          {FEATURES.map((feature) => (
            <Stack
              key={feature.title}
              direction="row"
              spacing={2}
              sx={{ alignItems: "center" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  color: "primary.light",
                  bgcolor: "grey.800",
                }}
              >
                {feature.icon}
              </Box>

              <div>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {feature.title}
                </Typography>

                <Typography variant="body2" sx={{ color: "grey.400" }}>
                  {feature.description}
                </Typography>
              </div>
            </Stack>
          ))}
        </Stack>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          bgcolor: "background.default",
        }}
      >
        <Stack spacing={4} sx={{ width: "100%", maxWidth: 420 }}>
          <Stack
            direction="row"
            spacing={1.5}
            sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          >
            <LogoTile size={40} bordered />

            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {BRAND}
            </Typography>
          </Stack>

          <Stack spacing={0.5}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Welcome back
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Sign in to continue to your dashboard.
            </Typography>
          </Stack>

          <Stack component={Form} method="post" spacing={2.5}>
            {actionData?.error && (
              <Alert severity="error" variant="outlined">
                {actionData.error}
              </Alert>
            )}

            <Stack spacing={1}>
              <FieldLabel htmlFor="username">Username</FieldLabel>

              <TextField
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                fullWidth
                required
                autoComplete="username"
                defaultValue="admin@mail.com"
                sx={inputSx}
              />
            </Stack>

            <Stack spacing={1}>
              <FieldLabel htmlFor="password">Password</FieldLabel>

              <TextField
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                fullWidth
                required
                autoComplete="current-password"
                defaultValue={DEFAULT_PASS}
                sx={inputSx}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          size="small"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Stack>

            <Button
              loading={isSubmitting}
              loadingPosition="start"
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={(theme) => ({
                mt: 1,
                py: 1.4,
                borderRadius: 1,
                boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
              })}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <Typography
      component="label"
      htmlFor={htmlFor}
      variant="body2"
      sx={{ fontWeight: 600, color: "text.secondary" }}
    >
      {children}
    </Typography>
  );
}

function LogoTile({ size, bordered }: { size: number; bordered?: boolean }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: 1,
        bgcolor: "common.white",
        border: bordered ? 1 : 0,
        borderColor: "divider",
      }}
    >
      <Box
        component="img"
        src={logo}
        alt={BRAND}
        sx={{ width: "95%", height: "95%", objectFit: "contain" }}
      />
    </Box>
  );
}
