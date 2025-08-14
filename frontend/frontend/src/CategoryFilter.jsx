import { Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";

function CategoryFilter({ categories, onSelect }) {
  const [selected, setSelected] = useState(categories[0] || "");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    onSelect(value);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Filter by Category
        </Typography>
        <FormControl fullWidth size="small">
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={selected}
            label="Category"
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
}

export default CategoryFilter;
