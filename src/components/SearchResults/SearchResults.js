import {
  List,
  ListItem,
  IconButton,
  ListItemText,
  Typography,
} from "@mui/material"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"

const SearchResults = ({ searchResults, handleAdd }) => {
  return (
    <List>
      {searchResults.map(result => (
        <ListItem
          disableGutters
          alignItems="center"
          key={result["1. symbol"]}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="add"
              onClick={() => handleAdd(result["1. symbol"])}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          }
        >
          <Typography
            variant="body1"
            sx={{ minWidth: "100px" }}
          >{`${result["1. symbol"]}`}</Typography>
          <ListItemText primary={`${result["2. name"]}`} />
        </ListItem>
      ))}
    </List>
  )
}

export default SearchResults
