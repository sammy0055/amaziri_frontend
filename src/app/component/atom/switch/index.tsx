"use client";
import Switch from "@mui/joy/Switch";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

export default function Switcher() {
  return (
    <Stack direction="row" spacing={2}>
      <Switch
        slotProps={{
          track: {
            children: (
              <>
                <Typography
                  component="span"
                  level="inherit"
                  sx={{ ml: "10px" }}
                >
                  On
                </Typography>
                <Typography component="span" level="inherit" sx={{ mr: "8px" }}>
                  Off
                </Typography>
              </>
            ),
          },
        }}
        sx={{
          "--Switch-thumbSize": "2rem",
          "--Switch-trackWidth": "5rem",
          "--Switch-trackHeight": "3rem",
          "--Switch-trackBorderRadius": "none",
        }}
      />
    </Stack>
  );
}
