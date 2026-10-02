import { ShoppingCartOutlined } from "@mui/icons-material";
import { Badge, Fab, Stack, Typography } from "@mui/material";

type Props = {
  itemCount: number;
  subtotal: number;
  onClick: () => void;
};

export default function CartButton({ itemCount, subtotal, onClick }: Props) {
  if (itemCount === 0) return null;

  return (
    <Fab
      variant="extended"
      color="primary"
      onClick={onClick}
      sx={{
        position: "fixed",
        right: { xs: 16, md: 24 },
        bottom: { xs: 16, md: 24 },
        zIndex: (theme) => theme.zIndex.fab,
        "& .cart-subtotal": {
          width: 0,
          overflow: "hidden",
          transition: "all 0.3s ease",
        },
        "&:hover .cart-subtotal": {
          width: "6ch",
        },
      }}
    >
      <Badge badgeContent={itemCount} color="secondary" sx={{ mr: 1 }}>
        <ShoppingCartOutlined />
      </Badge>

      <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Cart
        </Typography>
        <Typography className="cart-subtotal" variant="body2">
          ৳{subtotal}
        </Typography>
      </Stack>
    </Fab>
  );
}
