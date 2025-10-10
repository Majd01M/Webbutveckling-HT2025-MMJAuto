// src/pages/CarPartsPage.js
import { useEffect, useState, useContext, useCallback } from "react";
import { getCarParts, addToWishlist, getWishlist } from "../services/api";
import { UserContext } from "../context/UserContext";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";

export default function CarPartsPage() {
  const [carParts, setCarParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const { user } = useContext(UserContext);

  const fetchParts = async (query = "") => {
    try {
      const data = await getCarParts(query);
      setCarParts(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching car parts:", err);
      setLoading(false);
    }
  };

  // Fetch wishlist
  const fetchWishlist = useCallback(async () => {
    if (user && user.role === "customer") {
      try {
        const data = await getWishlist(user.token);
        // Ensure wishlist is always an array
        setWishlist(Array.isArray(data) ? data : data.wishlist || []);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
        setWishlist([]);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchParts();
    fetchWishlist();
  }, [fetchWishlist]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchParts(value);
  };

  const handleAddToWishlist = async (partId) => {
    if (!user || user.role !== "customer") {
      alert("You must be logged in as a customer to add to wishlist");
      return;
    }
    try {
      await addToWishlist(partId, user.token);
      await fetchWishlist(); // refresh wishlist
      alert("✅ Added to wishlist");
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
      alert("❌ Failed to add to wishlist");
    }
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Car Parts</Typography>

      <TextField
        label="Search for car parts"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={3}>
        {carParts.length > 0 ? carParts.map((part) => {
          const inWishlist = wishlist.some((w) => w._id === part._id);
          return (
            <Grid item xs={12} sm={6} md={4} key={part._id}>
              <Card sx={{ boxShadow: 3 }}>
                {part.image && <CardMedia component="img" height="180" image={part.image} alt={part.name} />}
                <CardContent>
                  <Typography variant="h6">{part.name}</Typography>
                  <Typography>Price: ${part.price}</Typography>
                  <Typography>Category: {part.category}</Typography>
                  {user && user.role === "customer" && (
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ mt: 2 }}
                      disabled={inWishlist}
                      onClick={() => handleAddToWishlist(part._id)}
                    >
                      {inWishlist ? "❤️ In Wishlist" : "❤️ Add to Wishlist"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        }) : (
          <Typography>No car parts found.</Typography>
        )}
      </Grid>
    </Container>
  );
}