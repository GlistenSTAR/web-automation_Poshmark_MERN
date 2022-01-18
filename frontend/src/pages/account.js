import Head from 'next/head';
import { Box, Container, Grid, Typography, TextField, Button } from '@mui/material';
import { AccountProfile } from '../components/account/account-profile';
import { AccountProfileDetails } from '../components/account/account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Account = () => {

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
    },
    validationSchema: Yup.object({
      url:Yup
      .string()
      .max(255)
        .required(
          'Url is required')
    }),
    onSubmit: () => {
      router.push('/');
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
              justifyContent: 'space-between',
              flexWrap: 'wrap',
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
              />
            </Typography>
            <Box sx={{ m: 1 }}>
              <Button
                color="primary"
                variant="contained"
                size="large"
              >
                Get Info
              </Button>
            </Box>
          </Box>
          
        </Container>
      </Box>
    </>
)};

Account.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Account;
