import React from "react";
import { Box, Typography, Container, Link, useTheme } from "@mui/material";

const Footer: React.FC = () => {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: theme.palette.primary.dark,
                color: theme.palette.common.white,
                py: 3,
                mt: 'auto',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                >
                    <Typography variant="body2">
                        <b>
                            © {new Date().getFullYear()} YourCompany. All rights reserved.
                        </b>
                    </Typography>

                    <Box display="flex" gap={2}>
                        <Link href="/privacy" color="inherit" underline="hover">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" color="inherit" underline="hover">
                            Terms of Service
                        </Link>
                        <Link href="/contact" color="inherit" underline="hover">
                            Contact
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
