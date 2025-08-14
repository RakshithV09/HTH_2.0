import { useState } from "react";
import { Grid, Card, CardContent, Typography, Button, ButtonGroup } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function DateFilter({ onFilter }) {
  const [startDate, setStartDate] = useState(dayjs().startOf("month"));
  const [endDate, setEndDate] = useState(dayjs());

  const applyPreset = (preset) => {
    let start;
    let end = dayjs();
    if (preset === "7d") start = dayjs().subtract(7, "day");
    if (preset === "month") start = dayjs().startOf("month");
    if (preset === "quarter") start = dayjs().subtract(3, "month").startOf("month");
    setStartDate(start);
    setEndDate(end);
    onFilter(start, end);
  };

  const handleApply = () => onFilter(startDate, endDate);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Filter By Date
        </Typography>

        {/* Preset Buttons */}
        <ButtonGroup variant="outlined" sx={{ mb: 2 }}>
          <Button onClick={() => applyPreset("7d")}>Last 7 Days</Button>
          <Button onClick={() => applyPreset("month")}>This Month</Button>
          <Button onClick={() => applyPreset("quarter")}>Last Quarter</Button>
        </ButtonGroup>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{ textField: { size: "small" } }}
              />
            </Grid>
            <Grid item>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{ textField: { size: "small" } }}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleApply}>
                Apply
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
}

export default DateFilter;
