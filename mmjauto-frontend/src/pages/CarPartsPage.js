import { useEffect, useState } from "react";
import { getCarParts } from "../services/api";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  TextField,
} from "@mui/material";

export default function CarPartsPage() {
  const [carParts, setCarParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchParts = async (query = "") => {
    try {
      const data = await getCarParts(query);
      setCarParts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching car parts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParts();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchParts(value);
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Car Parts
      </Typography>

      {/* 🔍 Search Bar */}
      <TextField
        label="Search for car parts"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={3}>
        {carParts.length > 0 ? (
          carParts.map((part) => (
            <Grid item xs={12} sm={6} md={4} key={part._id}>
              <Card sx={{ boxShadow: 3 }}>
                {part.image && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={part.image}
                    alt={part.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{part.name}</Typography>
                  <Typography color="text.secondary">
                    Category: {part.category || "N/A"}
                  </Typography>
                  <Typography>Price: ${part.price}</Typography>
                  <Typography>Stock: {part.stock}</Typography>
                  {part.carModel && (
                    <Typography>
                      Compatible Model: {part.carModel.brand}{" "}
                      {part.carModel.name} ({part.carModel.year})
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>
            No car parts found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}
