import { useEffect, useState, useContext, useCallback } from "react";
import { getWishlist, removeFromWishlist } from "../services/api";
import { UserContext } from "../context/UserContext";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  const fetchWishlist = useCallback(async () => {
    if (user && user.role === "customer") {
      try {
        const data = await getWishlist(user.token);
        setWishlist(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
        setWishlist([]);
        setLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleRemove = async (partId) => {
    try {
      if (!user) return alert("You must be logged in");

      const updated = await removeFromWishlist(partId, user.token);
      setWishlist(updated); // update immediately
      alert("✅ Removed from wishlist");
    } catch (err) {
      console.error("Failed to remove from wishlist:", err.response?.data || err.message);
      alert("❌ Failed to remove from wishlist");
    }
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        ❤️ My Wishlist
      </Typography>

      {wishlist.length === 0 ? (
        <Typography textAlign="center" mt={3}>
          No favorites yet. Add some car parts!
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {wishlist.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <Card
                sx={{
                  boxShadow: 3,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                {item.image && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={item.image}
                    alt={item.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${item.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Category: {item.category}
                  </Typography>
                  <Box textAlign="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleRemove(item._id)}
                    >
                      Remove
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}