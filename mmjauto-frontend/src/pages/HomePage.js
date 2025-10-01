import { Container, Typography, Box, Button } from "@mui/material";

export default function HomePage() {
  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url("/Home.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "500px",
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          mb: 4,
        }}
      >
        
      </Box>

      {/* Content */}
      <Typography variant="h5" gutterBottom>
        Find Car Models and Spare Parts Easily
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Browse our collection of car models and parts. Create an account to start managing your wishlist!
      </Typography>

      <Button variant="contained" color="primary" href="/carmodels">
        Explore Car Models
      </Button>
    </Container>
  );
}
