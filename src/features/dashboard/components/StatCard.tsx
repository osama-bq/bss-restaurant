import { Card, CardContent, Skeleton, Stack, Typography } from "@mui/material";

type Props = {
  title: string;
  value: string | number;
  secondary: string;
  loading?: boolean;
};

export default function StatCard({
  title,
  value,
  secondary,
  loading = false,
}: Props) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>

          {loading ? (
            <>
              <Skeleton variant="text" width="45%" height={42} />
              <Skeleton variant="text" width="70%" />
            </>
          ) : (
            <>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {value}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {secondary}
              </Typography>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
