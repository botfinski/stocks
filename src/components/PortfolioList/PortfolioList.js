import {
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TableCell,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import DeleteIcon from "@mui/icons-material/Delete"
import { tableCellClasses } from "@mui/material/TableCell"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))

const PortfolioList = ({ portfolio, handleRemove, handleSetPage, theme }) => {
  return (
    <>
      {portfolio.length > 0 ? (
        <>
          <Typography variant="body1">Your portfolio</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Company Name</StyledTableCell>
                  <StyledTableCell align="center">Symbol</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {portfolio.map(item => (
                  <TableRow
                    key={item["1. symbol"]}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography
                        variant="body1"
                        onClick={() =>
                          handleSetPage("details", item["1. symbol"])
                        }
                        sx={{
                          marginBottom: 0,
                          textDecoration: "underline",
                          cursor: "pointer",
                          color: `${theme.palette.primary.main}`,
                        }}
                      >
                        {item["2. name"]}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">{item["1. symbol"]}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        edge="end"
                        aria-label="remove"
                        onClick={() => handleRemove(item["1. symbol"])}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Typography variant="body1">Your portfolio is empty</Typography>
      )}
    </>
  )
}

export default PortfolioList
