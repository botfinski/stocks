import { TextField, Typography, Box, Button } from "@mui/material"
import SearchResults from "../SearchResults/SearchResults"

const Search = ({
  handleSearch,
  inputRef,
  searchResults,
  error,
  isLoading,
  handleAdd,
}) => {
  return (
    <>
      <Box>
        <Typography variant="body1">Search</Typography>
        <TextField
          autoComplete="off"
          inputRef={inputRef}
          id="outlined-basic"
          label="Company Name"
          placeholder="Example: Apple"
          variant="outlined"
          onChange={handleSearch}
          fullWidth={true}
          sx={{ maxWidth: "80%" }}
        />
      </Box>
      <Box>
        {isLoading && <Typography variant="body1">Searching...</Typography>}
        {searchResults === "no-data" && (
          <Typography variant="body1">
            No results. Try different value.
          </Typography>
        )}
        {Array.isArray(searchResults) && searchResults.length > 0 && (
          <SearchResults searchResults={searchResults} handleAdd={handleAdd} />
        )}
        {error && (
          <>
            {error.message && (
              <Typography variant="body1">{error.message}</Typography>
            )}
            {error.Note && (
              <Typography variant="body1">
                To many calls to API. Wait a minute and try again.
              </Typography>
            )}
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{ display: "block" }}
            >
              Try Again
            </Button>
          </>
        )}
      </Box>
    </>
  )
}

export default Search
