import { useRef, useState } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import IndexPage from "./components/IndexPage/IndexPage"
import CompanyDetailsPage from "./components/CompanyDetailsPage/CompanyDetailsPage"
import { Container } from "@mui/material"

const App = () => {
  const [portfolio, setPortfolio] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [alertOpened, setAlertOpened] = useState(false)
  const [alertType, setAlertType] = useState(null)
  const [alertMessage, setAlertMessage] = useState("")
  const [page, setPage] = useState("index")
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [pageError, setPageError] = useState(false)
  const [pageDetails, setPageDetails] = useState(null)
  const inputRef = useRef(null)

  const handleSearch = () => {
    setError(false)
    setIsLoading(true)
    setSearchResults([])

    fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputRef.current.value}&apikey=${process.env.ALPHAVANTAGE_KEY}`
    )
      .then(res => res.json())
      .then(
        result => {
          setError(null)
          if (
            Array.isArray(result.bestMatches) &&
            result.bestMatches.length > 0
          ) {
            setSearchResults(result.bestMatches)
            setIsLoading(false)
          } else if (result.Note) {
            setError(result)
            setIsLoading(false)
          } else {
            setSearchResults("no-data")
            setIsLoading(false)
          }
        },
        error => {
          setError(error)
          setIsLoading(false)
        }
      )
  }

  const handleOpenAlert = type => {
    setAlertOpened(true)
  }

  const handleCloseAlert = (e, reason) => {
    if (reason === "clickaway") {
      return
    }
    setAlertOpened(false)
  }

  const handleAdd = symbol => {
    const selectedItem = searchResults.filter(
      filteredResult => filteredResult["1. symbol"] === symbol
    )[0]

    if (!portfolio.includes(selectedItem)) {
      setPortfolio(prevState => [...prevState, selectedItem])
      setAlertMessage("Company added to portfolio!")
      setAlertType("success")
      handleOpenAlert("success")
    } else {
      setAlertMessage("Company already in portfolio!")
      setAlertType("error")
      handleOpenAlert("item already in portfolio")
    }
  }

  const handleRemove = symbol => {
    setPortfolio(prevState =>
      prevState.filter(item => item["1. symbol"] !== symbol)
    )
  }

  const handleSetPage = (goTo, symbol) => {
    if (goTo === "details") {
      setPageError(false)
      setPageDetails(null)
      setIsPageLoading(true)

      fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.ALPHAVANTAGE_KEY}`
      )
        .then(res => res.json())
        .then(
          result => {
            if (Object.keys(result).length !== 0 && result.Note === undefined) {
              setPageError(null)
              setPageDetails(result)
              setIsPageLoading(false)
            } else if (result.Note) {
              setPageError(result)
              setIsPageLoading(false)
            } else {
              setPageDetails("no-data")
              setIsPageLoading(false)
            }
          },
          error => {
            setPageError(error)
            setIsPageLoading(false)
          }
        )
    } else {
      setPageDetails(null)
      setIsPageLoading(false)
    }
    setPage(goTo)
    setAlertOpened(false)
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: "#3f50b5",
      },
    },
    typography: {
      h1: {
        fontSize: 36,
        marginTop: "1rem",
      },
      h2: {
        fontSize: 24,
        marginBottom: "1rem",
      },
      body1: {
        marginBottom: "1rem",
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {page === "index" && (
          <IndexPage
            handleSearch={handleSearch}
            inputRef={inputRef}
            searchResults={searchResults}
            error={error}
            isLoading={isLoading}
            handleAdd={handleAdd}
            portfolio={portfolio}
            handleRemove={handleRemove}
            handleSetPage={handleSetPage}
            alertType={alertType}
            alertOpened={alertOpened}
            handleCloseAlert={handleCloseAlert}
            alertMessage={alertMessage}
            theme={theme}
          />
        )}
        {page === "details" && (
          <CompanyDetailsPage
            handleSetPage={handleSetPage}
            isPageLoading={isPageLoading}
            pageError={pageError}
            pageDetails={pageDetails}
          />
        )}
      </Container>
    </ThemeProvider>
  )
}

export default App
