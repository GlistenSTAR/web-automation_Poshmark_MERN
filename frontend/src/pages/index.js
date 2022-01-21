import Head from 'next/head';
import { Box, Button, Container, Grid, InputLabel, TextField, MenuItem, FormControl, Select, Formik } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { BACKEND_URL } from '../utils/base.js'

const Dashboard = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
        first_name:'a',
        second_name:'a',
        email:'a@a.co',
        username:'a',
        password:'a',
        gender:'male',
        country:'us'
    },
    validationSchema: Yup.object({
      first_name:Yup
      .string()
      .max(255)
        .required(
          'First Name is required'),
      second_name:Yup
      .string()
      .max(255)
        .required(
          'Second Name is required'),
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      username:Yup
          .string()
          .max(255)
            .required(
              'User Name is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required'),
      gender: Yup
        .string()
        .required(
          'Select The Gender'),
      country: Yup
        .string()
        .required(
            'Select The Country')
    }),
    onSubmit: (values) => {
        axios.post(`${BACKEND_URL}/api/users/register`, values)
          .then(res => {
            console.log(res)
          })
          .catch(err =>
            console.log(err)
          )
    }
  });
  return (
    <>
      <Head>
        <title>
          SignUp Poshmark | Material Kit
        </title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <form onSubmit={formik.handleSubmit}>
            <Grid
                container
                spacing={3}
            >
              <Grid
                item
                lg={6}
                sm={6}
                xl={6}
                xs={12}
              >
                <h1 style={{margin:'20px'}}>Sign Up On Poshmark</h1>
                <TextField
                  error={Boolean(formik.touched.first_name && formik.errors.first_name)}
                  fullWidth
                  helperText={formik.touched.first_name && formik.errors.first_name}
                  label="First Name"
                  margin="normal"
                  name="first_name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.first_name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(formik.touched.second_name && formik.errors.second_name)}
                  fullWidth
                  helperText={formik.touched.second_name && formik.errors.second_name}
                  label="Second Name"
                  margin="normal"
                  name="second_name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.second_name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(formik.touched.username && formik.errors.username)}
                  fullWidth
                  helperText={formik.touched.username && formik.errors.username}
                  label="User Name"
                  margin="normal"
                  name="username"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                  variant="outlined"
                />
                <FormControl fullWidth margin='normal'>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="gender"
                    value={formik.values.gender}
                    label="Gender"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="gender"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="unspecified">Unspecified</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin='normal'>
                  <InputLabel id="demo-simple-select-label">Country</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="country"
                    value={formik.values.country}
                    label="Country"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="country"
                  >
                    <MenuItem value="us">United States</MenuItem>
                    <MenuItem value="ca">Canada</MenuItem>
                    <MenuItem value="au">Australia</MenuItem>
                    <MenuItem value="in">India</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ py: 2 }} >
                  <Button
                    color="primary"
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign Up Now
                  </Button>
                </Box>
              </Grid>
              <Grid
                item
                xl={6}
                lg={6}
                sm={6}
                xs={12}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <img
                    alt="Under development"
                    src="/static/images/signup.png"
                    style={{
                      marginTop: 0,
                      display: "inline-block",
                      maxWidth: '100%',
                      width: 560,
                      height: 800
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </>
)};

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
