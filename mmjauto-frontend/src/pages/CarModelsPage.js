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
  const [carModels, setCarModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchModels = async () => {
      const data = await getCarModels();
      setCarModels(data);
      setFilteredModels(data);
      setLoading(false);
    };
    fetchModels();
  }, []);

  // filter by search input
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredModels(
      carModels.filter(
        (model) =>
          model.brand.toLowerCase().includes(value) ||
          model.name.toLowerCase().includes(value) ||
          model.year.toString().includes(value)
      )
    );
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Car Models
      </Typography>

      {/* 🔍 Search input */}
      <TextField
        fullWidth
        label="Search for car models"
        variant="outlined"
        value={search}
        onChange={handleSearch}
        sx={{ mb: 4 }}
      />

      <Grid container spacing={3}>
        {filteredModels.map((model) => (
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
                <Typography color="text.secondary">
                  Year: {model.year}
                </Typography>
                <Typography color="text.secondary">
                  Type: {model.type}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
