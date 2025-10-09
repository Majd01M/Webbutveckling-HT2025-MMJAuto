import { useEffect, useState } from "react";
import { getCarModels } from "../services/api";
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

export default function CarModelsPage() {
  const [carModels, setCarModels] = useState([]); // ✅ fixed name
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchModels = async (query = "") => {
  try {
    const data = await getCarModels();

    const filtered = data.filter((model) => {
      const combined = `${model.brand} ${model.name}`.toLowerCase();
      return (
        combined.includes(query.toLowerCase()) ||
        model.year.toString().includes(query)
      );
    });

    setCarModels(filtered);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching car models:", error);
    setLoading(false);
  }
};


  useEffect(() => {
    fetchModels();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchModels(value);
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Car Models
      </Typography>

      <TextField
        fullWidth
        label="Search for car models"
        variant="outlined"
        value={search}
        onChange={handleSearch}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={3}>
        {carModels.map((model) => (
          <Grid item xs={12} sm={6} md={4} key={model._id}>
            <Card sx={{ boxShadow: 3 }}>
              {model.image && (
                <CardMedia
                  component="img"
                  height="180"
                  image={model.image}
                  alt={model.name}
                />
              )}
              <CardContent>
                <Typography variant="h6">
                  {model.brand} {model.name}
                </Typography>
                <Typography color="text.secondary">Year: {model.year}</Typography>
                <Typography color="text.secondary">Type: {model.type}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
