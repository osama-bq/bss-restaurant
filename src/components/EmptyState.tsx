import { InboxOutlined } from "@mui/icons-material";
import { Box, Stack, Typography, alpha } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  icon?: ReactNode;
  title?: string;
  description?: ReactNode;
  action?: ReactNode;
  compact?: boolean;
  sx?: SxProps<Theme>;
};

export default function EmptyState({
  icon = <InboxOutlined />,
  title = "No data found",
  description,
  action,
  compact = false,
  sx,
}: Props) {
  const badgeSize = compact ? 48 : 72;

  return (
    <Stack
      spacing={compact ? 1.5 : 2}
      sx={[
        {
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 3,
          py: compact ? 3 : 6,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: badgeSize,
          height: badgeSize,
          borderRadius: "50%",
          color: "text.secondary",
          bgcolor: alpha(theme.palette.text.primary, 0.06),
          "& > svg": { fontSize: compact ? 24 : 36 },
        })}
      >
        {icon}
      </Box>

      <Stack spacing={0.5} sx={{ alignItems: "center" }}>
        <Typography
          variant={compact ? "subtitle2" : "subtitle1"}
          sx={{ fontWeight: 600 }}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ maxWidth: 360 }}
          >
            {description}
          </Typography>
        )}
      </Stack>

      {action}
    </Stack>
  );
}
