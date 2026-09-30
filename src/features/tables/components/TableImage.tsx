import { TableRestaurant } from "@mui/icons-material";
import { Box } from "@mui/material";

type Props = {
  src?: string;
  alt: string;
};

export default function TableImage({ src, alt }: Props) {
  if (!src) {
    return (
      <Box
        sx={{
          height: 140,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "action.hover",
        }}
      >
        <TableRestaurant
          sx={{
            fontSize: 64,
            color: "text.secondary",
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width: "100%",
        height: 140,
        objectFit: "cover",
        display: "block",
      }}
    />
  );
}
