import { Grid, Typography } from "@mui/material"
import Search from "../Search/Search"
import PortfolioList from "../PortfolioList/PortfolioList"
import Alert from "../Alert/Alert"

const IndexPage = ({
  handleSearch,
  inputRef,
  searchResults,
  error,
  isLoading,
  handleAdd,
  portfolio,
  handleRemove,
  handleSetPage,
  alertType,
  alertOpened,
  handleCloseAlert,
  alertMessage,
  theme,
}) => {
  return (
    <Grid container columnSpacing={8} rowSpacing={4}>
      <Grid item xs={12}>
        <Typography variant="h1">Stocks Portfolio Dashboard</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Search
          handleSearch={handleSearch}
          inputRef={inputRef}
          searchResults={searchResults}
          error={error}
          isLoading={isLoading}
          handleAdd={handleAdd}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <PortfolioList
          portfolio={portfolio}
          handleRemove={handleRemove}
          handleSetPage={handleSetPage}
          theme={theme}
        />
      </Grid>
      <Alert
        alertType={alertType}
        alertOpened={alertOpened}
        handleCloseAlert={handleCloseAlert}
        alertMessage={alertMessage}
      />
    </Grid>
  )
}

export default IndexPage
