import { Grid, Typography, Button } from "@mui/material"

const CompanyDetailsPage = ({
  handleSetPage,
  isPageLoading,
  pageError,
  pageDetails,
}) => {
  function numFormatter(num) {
    if (num > 1000000000) {
      return (num / 1000000000).toFixed(2) + " bln"
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(2) + " mln"
    } else {
      return num
    }
  }

  return (
    <Grid container columnSpacing={8} rowSpacing={4}>
      <Grid item xs={12}>
        <Typography variant="h1">Company Details</Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={() => handleSetPage("index")}>
          Go Back
        </Button>
      </Grid>
      <Grid item xs={12}>
        {isPageLoading && (
          <Typography variant="body1">Loading company data...</Typography>
        )}
        {pageDetails && pageDetails !== "no-data" && (
          <>
            <Typography variant="h2">{pageDetails.Name}</Typography>
            <Typography variant="body1">
              <strong>Address:</strong> {pageDetails.Address}
            </Typography>
            <Typography variant="body1">
              <strong>Market capitalization:</strong>{" "}
              {numFormatter(+pageDetails.MarketCapitalization)}
            </Typography>
            <Typography variant="body1">{pageDetails.Description}</Typography>
          </>
        )}
        {pageDetails === "no-data" && (
          <Typography variant="body1">Company has no related data</Typography>
        )}
        {pageError && (
          <>
            {pageError.message && (
              <Typography variant="body1">{pageError.message}</Typography>
            )}
            {pageError.Note && (
              <Typography variant="body1">
                To many calls to API. Wait a minute and try again
              </Typography>
            )}
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default CompanyDetailsPage
