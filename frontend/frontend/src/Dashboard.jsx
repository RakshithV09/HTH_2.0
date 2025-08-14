import { useState, useEffect } from "react";
import {
  Box, Toolbar, Typography, Grid, Card, CardContent, Skeleton,
  Snackbar, Alert, IconButton, Badge, Menu, MenuItem, ListItemText,
  Divider, ListItemIcon, Dialog, DialogTitle, DialogContent,
  DialogActions, Button, Drawer, List, ListItemButton, Avatar, Tooltip
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import GridViewIcon from "@mui/icons-material/GridView";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";

import DateFilter from "./DateFilter";
import FinancialChart from "./FinancialChart";
import ExtraCharts from "./ExtraCharts";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";
import HeatmapChart from "./HeatmapChart";
import RadarChart from "./RadarChart";

// Sidebar with colourful background
function Sidebar() {
  const menuItems = [
    { text: "KPI Overview", icon: <DashboardIcon />, target: "kpi-section" },
    { text: "Financial Trends", icon: <BarChartIcon />, target: "financial-section" },
    { text: "Heatmap", icon: <GridViewIcon />, target: "heatmap-section" },
    { text: "Radar Analysis", icon: <BubbleChartIcon />, target: "radar-section" },
  ];
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        "& .MuiDrawer-paper": {
          background: "linear-gradient(180deg, #2575fc 0%, #6a11cb 100%)",
          color: "white"
        }
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={index}
            onClick={() => scrollToSection(item.target)}
            sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}
          >
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

// Bottom-left user profile widget
function UserProfile({ user, onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const getInitials = (name) => {
    if (!name) return "";
    return name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        left: 20,
        display: "flex",
        alignItems: "center",
        bgcolor: "background.paper",
        borderRadius: 3,
        boxShadow: 3,
        px: 2,
        py: 1,
        cursor: "pointer",
        zIndex: (theme) => theme.zIndex.tooltip + 1,
      }}
      onClick={handleOpen}
    >
      <Tooltip title="User Profile">
        <Avatar
          src={user.avatarUrl || ""}
          alt={user.name}
          sx={{ width: 40, height: 40, bgcolor: user.avatarUrl ? undefined : "primary.main" }}
        >
          {!user.avatarUrl && getInitials(user.name)}
        </Avatar>
      </Tooltip>
      <Typography
        variant="body1"
        sx={{ ml: 1, fontWeight: "medium", display: { xs: "none", sm: "block" } }}
      >
        {user.name}
      </Typography>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ elevation: 3, sx: { mt: 1.5 } }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <AccountCircleIcon sx={{ mr: 1 }} /> Profile
        </MenuItem>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

export default function Dashboard() {
  const sampleKpis = [
    { name: "Revenue", value: 250000, color: "primary" },
    { name: "Expenses", value: 150000, color: "error" },
    { name: "Cash Flow", value: 100000, color: "success" },
    { name: "Profit Margin", value: 40, color: "secondary", suffix: "%" },
  ];
  const categories = ["All", "Marketing", "Sales", "Operations", "HR"];
  const [filteredKpis, setFilteredKpis] = useState(sampleKpis);
  const [loading, setLoading] = useState(true);

  const [selectedKpi, setSelectedKpi] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleKpiClick = (kpi) => { setSelectedKpi(kpi); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedKpi(null); };

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const showSnackbar = (msg, severity = "info") => setSnackbar({ open: true, message: msg, severity });
  const handleCloseSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Welcome to the dashboard!", severity: "info", read: false },
  ]);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const handleBellClick = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const markAsRead = (id) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const addNotification = (msg, severity = "info") => setNotifications((prev) => [
    { id: Date.now(), text: msg, severity, read: false }, ...prev
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      addNotification("Data loaded successfully!", "success");
      showSnackbar("Data loaded successfully!", "success");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDateFilter = (start, end) => addNotification(
    `Date filter applied: ${start.format("YYYY-MM-DD")} → ${end.format("YYYY-MM-DD")}`, "info"
  );
  const handleSearch = (query) => {
    if (!query) return setFilteredKpis(sampleKpis);
    const lowerQuery = query.toLowerCase();
    setFilteredKpis(sampleKpis.filter((kpi) => kpi.name.toLowerCase().includes(lowerQuery)));
    addNotification(`Search applied: "${query}"`, "info");
  };
  const handleCategorySelect = (category) => addNotification(`Category selected: ${category}`, "info");

  const getKpiChartData = (kpi) => ({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: `${kpi.name} Trend`,
      data: [50, 60, 55, 70, 65, kpi.value],
      borderColor: "#ff9a9e",
      backgroundColor: "rgba(255,154,158,0.4)",
      fill: true
    }],
  });

  // THEMING (light/dark toggle)
  const [darkMode, setDarkMode] = useState(false);
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      background: { default: "#f0f4ff", paper: "#ffffff" },
      text: { primary: "#000000" }
    }
  });
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: { default: "#121212", paper: "#1e1e1e" },
      text: { primary: "#ffffff" }
    }
  });

  // Example current user object
  const currentUser = { name: "FinAI User", avatarUrl: "" };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Box sx={{ display: "flex", bgcolor: "background.default", color: "text.primary" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1, p: 3, ml: "240px",
            minHeight: "100vh",
            bgcolor: "background.default",
            color: "text.primary"
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Dashboard</Typography>
            <Box>
              <IconButton color="inherit" onClick={handleBellClick}>
                <Badge badgeContent={unreadCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton sx={{ ml: 1 }} onClick={() => setDarkMode(!darkMode)} color="inherit">
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          </Toolbar>

          {/* Notifications Menu */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}
            PaperProps={{ sx: { width: 350, maxHeight: 400 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, py: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Notifications</Typography>
              <Box>
                <Button size="small" onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}>
                  Mark all as read
                </Button>
                <Button size="small" color="error" onClick={() => setNotifications([])}>Clear all</Button>
              </Box>
            </Box>
            <Divider />
            {notifications.length === 0 ? (
              <MenuItem sx={{ justifyContent: 'center', py: 3 }}>
                <Typography variant="body2" color="text.secondary">No notifications</Typography>
              </MenuItem>
            ) : notifications.map((n) => {
              let icon;
              switch (n.severity) {
                case "success": icon = <CheckCircleIcon color="success" />; break;
                case "error": icon = <ErrorIcon color="error" />; break;
                case "warning": icon = <WarningIcon color="warning" />; break;
                default: icon = <InfoIcon color="info" />;
              }
              return (
                <MenuItem key={n.id} onClick={() => { markAsRead(n.id); handleCloseMenu(); }}
                  sx={{
                    bgcolor: n.severity === "success" ? "rgba(76, 175, 80, 0.1)" :
                            n.severity === "error" ? "rgba(244, 67, 54, 0.1)" :
                            n.severity === "warning" ? "rgba(255, 152, 0, 0.1)" :
                            "rgba(33, 150, 243, 0.1)",
                    "&:hover": {
                      bgcolor: n.severity === "success" ? "rgba(76, 175, 80, 0.2)" :
                              n.severity === "error" ? "rgba(244, 67, 54, 0.2)" :
                              n.severity === "warning" ? "rgba(255, 152, 0, 0.2)" :
                              "rgba(33, 150, 243, 0.2)",
                    }
                  }}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={n.text}
                    secondary={new Date(n.id).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    primaryTypographyProps={{ fontWeight: n.read ? 400 : 700 }}
                  />
                </MenuItem>
              );
            })}
          </Menu>

          {/* Filters */}
          <DateFilter onFilter={handleDateFilter} />
          <CategoryFilter categories={categories} onSelect={handleCategorySelect} />
          <SearchBar onSearch={handleSearch} />

          {/* KPI Section */}
          <Box id="kpi-section">
            <Grid container spacing={3}>
              {loading ? Array.from(new Array(4)).map((_, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card><CardContent>
                    <Skeleton variant="text" width="60%" height={30} />
                    <Skeleton variant="text" width="40%" height={40} />
                  </CardContent></Card>
                </Grid>
              )) : filteredKpis.map((kpi, index) => (
                <Grid item xs={12} md={4} key={kpi.name}>
                  <motion.div onClick={() => handleKpiClick(kpi)} style={{ cursor: "pointer" }}
                    whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                    <Card
                      sx={{
                        background:
                          kpi.color === "primary" ? "linear-gradient(135deg, #6a11cb, #2575fc)" :
                          kpi.color === "error" ? "linear-gradient(135deg, #ff6b6b, #ff8787)" :
                          kpi.color === "success" ? "linear-gradient(135deg, #4ECDC4, #45B7AF)" :
                          "linear-gradient(135deg, #f7971e, #ffd200)",
                        color: "white"
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>{kpi.name}</Typography>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                          {kpi.suffix ? `${kpi.value}${kpi.suffix}` : `₹ ${kpi.value.toLocaleString()}`}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Charts */}
          <Box id="financial-section" sx={{ mt: 4 }}>
            {loading ? <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} /> :
              <FinancialChart darkMode={darkMode} />}
          </Box>
          <Box sx={{ mt: 4 }}>{loading ? <Skeleton variant="rectangular" height={250} /> :
            <ExtraCharts darkMode={darkMode} />}</Box>
          <Box id="heatmap-section" sx={{ mt: 4 }}>{loading ? <Skeleton variant="rectangular" height={200} /> :
            <HeatmapChart darkMode={darkMode} />}</Box>
          <Box id="radar-section" sx={{ mt: 4 }}>{loading ? <Skeleton variant="rectangular" height={250} /> :
            <RadarChart darkMode={darkMode} />}</Box>

          {/* Drill-Down Modal */}
          <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
            {selectedKpi && (
              <>
                <DialogTitle>{selectedKpi.name} — Details</DialogTitle>
                <DialogContent>
                  <Typography variant="h6" gutterBottom>
                    Current Value:{" "}
                    {selectedKpi.suffix ? `${selectedKpi.value}${selectedKpi.suffix}` :
                      `₹ ${selectedKpi.value.toLocaleString()}`}
                  </Typography>
                  <Line data={getKpiChartData(selectedKpi)} options={{ responsive: true }} />
                </DialogContent>
                <DialogActions><Button onClick={handleCloseModal}>Close</Button></DialogActions>
              </>
            )}
          </Dialog>

          {/* Snackbar */}
          <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}>
            <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>{snackbar.message}</Alert>
          </Snackbar>
        </Box>

        {/* User Profile Widget */}
        <UserProfile
          user={currentUser}
          onLogout={() => console.log("Logging out...")}
        />
      </Box>
    </ThemeProvider>
  );
}
