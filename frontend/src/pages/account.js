import Head from 'next/head';
import { Box, Container, Grid, Typography, TextField, Button } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { BACKEND_URL } from '../utils/base.js'

const Account = () => {
  const isValidUrl = (url) => {
    try {
        return url.includes("https://www.poshmark.com/closet/") 
                || url.includes("https://poshmark.com/closet/") 
                || url.includes("https://posh.mk/") 
    } catch (e) {
        return false;
    }
    return true;
};

  const formik = useFormik({
    initialValues: {
      url:''
    },
    validationSchema: Yup.object({
      url:Yup
        .string()
        .max(255)
        .required(
          'Url is required')
        .test('is-url-valid', 'URL is not valid', (value) => isValidUrl(value)),
    }),
    onSubmit: (values) => {
      axios.post(`${BACKEND_URL}/api/users/getUserInfo`, values)
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
          Get UserInfo | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Container maxWidth="lg">
            <Typography
              sx={{ mb: 3 }}
              variant="h4"
            >
              Get UserInfo
            </Typography>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                m: -1
              }}
            >
              <Typography
                sx={{ width:'80%'}}
                variant="h6"
              >
                <TextField
                  error={Boolean(formik.touched.url && formik.errors.url)}
                  fullWidth
                  helperText={formik.touched.url && formik.errors.url}
                  label="Url://"
                  margin="normal"
                  name="url"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.url}
                  variant="outlined"
                  placeholder='Please write the poshmark account url.'
                />
              </Typography>
              <Box sx={{ m: 1 }}>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  type='submit'
                >
                  Get Info
                </Button>
              </Box>
            </Box>
          </Container>
        </form>          
      </Box>
    </>
)};

Account.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Account;
