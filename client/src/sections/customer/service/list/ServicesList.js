import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Pagination, Box } from '@mui/material';
//
import { ServiceItem, ServiceItemSkeleton } from '../item';

export default function ServicesList({ jobs, loading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;
 

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Box
        sx={{
          columnGap: 4,
          display: 'grid',
          rowGap: { xs: 4, md: 5 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {(loading ? [...Array(9)] : currentJobs).map((job, index) =>
          job ? <ServiceItem key={job._id} job={job} /> : <ServiceItemSkeleton key={index} />
        )}
      </Box>

      <Pagination
        count={Math.ceil(jobs.length / jobsPerPage)}
        color="primary"
        size="large"
        page={currentPage}
        onChange={handlePageChange}
        sx={{
          my: 10,
          '& .MuiPagination-ul': {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}

ServicesList.propTypes = {
  jobs: PropTypes.array,
  loading: PropTypes.bool,
};
