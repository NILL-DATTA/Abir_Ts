import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LockResetIcon from "@mui/icons-material/LockReset";
import useUserStore from "@/store/store";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";

const Header: React.FC = () => {
  const cookie = new Cookies();
  const { token, logout } = useUserStore();
  const router = useRouter();
  const [hasMounted, setHasMounted] = React.useState(false);
  const theme = useTheme();
  const myName = cookie.get("name");

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const handleToggle = () => {
    if (token) {
      logout();
      router.push("/auth/login");
    } else {
      router.push("/auth/login");
    }
  };

  const buttonStyle = {
    textTransform: "none",
    fontWeight: 500,
    borderRadius: 2,
    px: 2.5,
    py: 0.8,
    transition: "all 0.3s ease",
    fontSize: "0.95rem",
    boxShadow: "none",
    "&:hover": {
      bgcolor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
  };

  return (
    <AppBar position="static" elevation={4} sx={{ bgcolor: theme.palette.primary.dark }}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: { xs: 2, md: 6 },
          py: 1.5,
        }}
      >
        <Typography
          variant="h6"
          color="inherit"
          sx={{
            fontWeight: 700,
            fontSize: "1.2rem",
            userSelect: "none",
          }}
        >
          {token ? `Welcome, ${myName}` : "Welcome"}
        </Typography>

        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center"}}>
          {token && (
            <>
              <Tooltip title="Create New List" arrow>
                <Button
                  color="inherit"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => router.push("/cms/createList")}
                  sx={buttonStyle}
                >
                  Create
                </Button>
              </Tooltip>

              <Tooltip title="View Lists" arrow>
                <Button
                  color="inherit"
                  startIcon={<ListAltIcon />}
                  onClick={() => router.push("/cms/list")}
                  sx={buttonStyle}
                >
                  List
                </Button>
              </Tooltip>

              <Tooltip title="Update Password" arrow>
                <Button
                  color="inherit"
                  startIcon={<LockResetIcon />} // ✅ Updated icon here
                  onClick={() => router.push("/auth/updatePassword")}
                  sx={buttonStyle}
                >
                  Update Password
                </Button>
              </Tooltip>
            </>
          )}

          <Tooltip title={token ? "Logout" : "Login"} arrow>
            <Button
              color="inherit"
              onClick={handleToggle}
              sx={{
                ...buttonStyle,
                "&:hover": {
                  bgcolor: token ? theme.palette.error.main : theme.palette.primary.light,
                  color: token ? theme.palette.error.contrastText : theme.palette.primary.contrastText,
                },
              }}
            >
              {token ? "Logout" : ""}
            </Button>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
