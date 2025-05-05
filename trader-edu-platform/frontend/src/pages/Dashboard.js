import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

import { AuthContext } from '../context/AuthContext';

// Register Chart.js components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

// Mock data - in a real app, this would come from API
const mockRecommendations = [
  { id: 1, title: "Technical Analysis Basics", level: "Beginner", match: 98 },
  { id: 2, title: "Risk Management Strategies", level: "Intermediate", match: 92 },
  { id: 3, title: "Advanced Chart Patterns", level: "Advanced", match: 85 }
];

const mockProgress = {
  completion: 65,
  courses: [
    { id: 1, title: "Trading Fundamentals", progress: 100, totalLessons: 12, completedLessons: 12 },
    { id: 2, title: "Technical Analysis", progress: 60, totalLessons: 10, completedLessons: 6 },
    { id: 3, title: "Risk Management", progress: 30, totalLessons: 8, completedLessons: 2 }
  ]
};

const mockPerformance = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Simulation Performance',
      data: [0, 12, 8, 24, 18, 30],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
      fill: false
    }
  ]
};

const mockSkills = {
  labels: ['Technical Analysis', 'Fundamental Analysis', 'Risk Management', 'Trading Psychology'],
  datasets: [
    {
      label: 'Skills',
      data: [70, 50, 60, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1,
    },
  ],
};

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [progress, setProgress] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setProgress(mockProgress);
      setRecentActivity([
        { id: 1, type: 'course', title: 'Completed lesson on Candlestick Patterns', date: '2 hours ago' },
        { id: 2, type: 'simulator', title: 'Trading simulation: +8.2% return', date: '1 day ago' },
        { id: 3, type: 'course', title: 'Started Risk Management course', date: '3 days ago' }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome back, {user ? user.username : 'Trader'}!
      </Typography>
      
      <Grid container spacing={3}>
        {/* AI Recommendations */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              AI Recommendations for You
            </Typography>
            
            <List>
              {recommendations.map((recommendation) => (
                <React.Fragment key={recommendation.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <LightbulbIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={recommendation.title}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {recommendation.level} Level
                          </Typography>
                          {` — ${recommendation.match}% match for your learning profile`}
                        </>
                      }
                    />
                    <Button 
                      variant="contained" 
                      size="small" 
                      component={Link} 
                      to={`/courses/${recommendation.id}`}
                    >
                      Start Learning
                    </Button>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
        
        {/* Overall Progress */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Your Progress
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={progress.completion} 
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                  {`${Math.round(progress.completion)}%`}
                </Typography>
              </Box>
            </Box>
            
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Course Completion:
            </Typography>
            
            {progress.courses.map((course) => (
              <Box key={course.id} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">{course.title}</Typography>
                  <Typography variant="body2">{`${course.completedLessons}/${course.totalLessons}`}</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={course.progress} 
                  sx={{ height: 6, borderRadius: 3 }} 
                />
              </Box>
            ))}
            
            <Box sx={{ mt: 'auto' }}>
              <Button 
                fullWidth 
                variant="outlined" 
                component={Link} 
                to="/courses"
              >
                View All Courses
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* Performance Charts */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Trading Simulation Performance
            </Typography>
            
            <Box sx={{ height: 300, position: 'relative' }}>
              <Line 
                data={mockPerformance}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Return (%)'
                      }
                    }
                  }
                }}
              />
            </Box>
            
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained"
                startIcon={<ShowChartIcon />}
                component={Link}
                to="/simulator"
              >
                Go to Simulator
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* Skills Assessment */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Your Trading Skills
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
              <Doughnut 
                data={mockSkills}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </Box>
          </Paper>
        </Grid>
        
        {/* Recent Activity */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Recent Activity
            </Typography>
            
            <List>
              {recentActivity.map((activity) => (
                <React.Fragment key={activity.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar>
                        {activity.type === 'course' ? <MenuBookIcon /> : <TrendingUpIcon />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.title}
                      secondary={activity.date}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard; 