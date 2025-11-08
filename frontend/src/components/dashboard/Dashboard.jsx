import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getUsers } from '../../services/api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  TablePagination,
  Box,
  Typography,
  Button,
  CircularProgress
} from '@mui/material';
import { Settings, Delete } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Custom green theme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#86efac', // green-300
        dark: '#4ade80', // green-400
      },
    },
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data.users);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
      console.log(err)
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberedEmail');
    navigate('/login');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get random status
  const getRandomStatus = () => {
    const statuses = ['Active', 'Inactive', 'Suspended'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  // Get random role
  const getRandomRole = () => {
    const roles = ['Admin', 'Publisher', 'Reviewer', 'Moderator'];
    return roles[Math.floor(Math.random() * roles.length)];
  };

  // Status chip colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return { bgcolor: '#cefad0', color: '#166534' };
      case 'Inactive':
        return { bgcolor: '#fffacd', color: '#78350f' };
      case 'Suspended':
        return { bgcolor: '#fee2e2', color: '#7f1d1d' };
      default:
        return { bgcolor: '#e5e7eb', color: '#dc2626' };
    }
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f0fdf4',
          }}
        >
          <CircularProgress sx={{ color: '#86efac' }} />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: '#f0fdf4', py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
              User Dashboard
            </Typography>
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{
                bgcolor: '#ef4444',
                '&:hover': { bgcolor: '#dc2626' },
                textTransform: 'none',
                borderRadius: '8px',
                color: "#fff"
              }}
            >
              Logout
            </Button>
          </Box>

          {error && (
            <Box sx={{ mb: 3, p: 2, bgcolor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px' }}>
              <Typography sx={{ color: '#dc2626' }}>{error}</Typography>
            </Box>
          )}

          {/* Table */}
          <Paper
            elevation={3}
            sx={{
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#86efac' }}>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1f2937' }}>#</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1f2937' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1f2937' }}>Date Created</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1f2937' }}>Role</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1f2937' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1f2937' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) => {
                      const status = getRandomStatus();
                      const role = getRandomRole();
                      const globalIndex = page * rowsPerPage + index + 1;
                      
                      return (
                        <TableRow
                          key={user._id}
                          sx={{
                            '&:hover': { bgcolor: '#f0fdf4' },
                            transition: 'background-color 0.2s',
                          }}
                        >
                          <TableCell>{globalIndex}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar
                                src={`https://i.pravatar.cc/150?img=${globalIndex}`}
                                alt={user.name}
                                sx={{ width: 40, height: 40 }}
                              />
                              <Typography sx={{ fontWeight: 500 }}>{user.name}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ color: '#6b7280' }}>
                            {new Date(user.createdAt || user.dob).toLocaleDateString('en-US', {
                              month: '2-digit',
                              day: '2-digit',
                              year: 'numeric',
                            })}
                          </TableCell>
                          <TableCell sx={{ color: '#6b7280' }}>{role}</TableCell>
                          <TableCell>
                            <Chip
                              label={status}
                              size="small"
                              sx={{
                                ...getStatusColor(status),
                                fontWeight: 500,
                                fontSize: '0.75rem',
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <IconButton
                                size="small"
                                sx={{
                                  bgcolor: '#dbeafe',
                                  color: '#2563eb',
                                  '&:hover': { bgcolor: '#bfdbfe' },
                                }}
                              >
                                <Settings fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                sx={{
                                  bgcolor: '#fee2e2',
                                  color: '#dc2626',
                                  '&:hover': { bgcolor: '#fecaca' },
                                }}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
              component="div"
              count={users.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
              sx={{
                borderTop: '1px solid #e5e7eb',
                '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                  color: '#6b7280',
                },
              }}
            />
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;