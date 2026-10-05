import { AddPhotoAlternateOutlined, Close } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useRef } from "react";

export type ImagePickerValue = {
  fileName: string;
  base64: string;
  preview: string;
};

type Props = {
  value: ImagePickerValue | null;
  onChange: (value: ImagePickerValue | null) => void;
  label?: string;
  disabled?: boolean;
};

export default function ImagePicker({
  value,
  onChange,
  label = "Profile image",
  disabled = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    const preview = await readFileAsDataUrl(file);

    onChange({
      fileName: file.name,
      preview,
      base64: preview.split(",")[1] ?? "",
    });

    event.target.value = "";
  };

  return (
    <Stack spacing={1}>
      <Typography variant="body2" fontWeight={600}>
        {label}
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 84,
            height: 84,
            borderRadius: 2,
            overflow: "hidden",
            border: 1,
            borderColor: "divider",
            bgcolor: "action.hover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {value?.preview ? (
            <Box
              component="img"
              src={value.preview}
              alt="Selected"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <AddPhotoAlternateOutlined color="disabled" />
          )}
        </Box>

        <Stack spacing={0.75}>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="outlined"
              disabled={disabled}
              onClick={() => inputRef.current?.click()}
            >
              {value ? "Change image" : "Choose image"}
            </Button>

            {value && (
              <IconButton
                size="small"
                disabled={disabled}
                onClick={() => onChange(null)}
              >
                <Close fontSize="small" />
              </IconButton>
            )}
          </Stack>

          <Typography variant="caption" color="text.secondary">
            JPG, PNG or other image formats
          </Typography>
        </Stack>
      </Stack>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </Stack>
  );
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Unable to read image."));
      }
    };

    reader.onerror = () => {
      reject(reader.error ?? new Error("Unable to read image."));
    };

    reader.readAsDataURL(file);
  });
}
