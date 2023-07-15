import React, { useEffect, useState } from 'react';
// @mui
import { Pagination, Box } from '@mui/material';
//
import MyContractItem from './MyContractItem';

export default function MyContractsList({contracts, updateContracts}) {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;
  const [currentContracts, setCurrentContracts] = useState([]);

  useEffect(() => {
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const slicedContracts = contracts.slice(indexOfFirstJob, indexOfLastJob);
    setCurrentContracts(slicedContracts);
  }, [contracts, currentPage, jobsPerPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleContractRefused = (serviceId) => {
    const updatedContracts = contracts.filter(contract => contract.serviceId !== serviceId);
    updateContracts(updatedContracts);
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
        {(currentContracts).map((contract, index) =>
           <MyContractItem key={contract._id} contract={contract}  onContractRefused={handleContractRefused} />
        )}
      </Box>

      {contracts.length > jobsPerPage && (
      <Pagination
        count={Math.ceil(contracts.length / jobsPerPage)}
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
      )}
    </>
  );
}

