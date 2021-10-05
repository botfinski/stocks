import { Snackbar, Alert as MuiAlert } from "@mui/material"

const Alert = ({ alertType, alertOpened, handleCloseAlert, alertMessage }) => {
  return (
    <Snackbar
      open={alertOpened}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
    >
      <MuiAlert
        onClose={handleCloseAlert}
        severity={alertType}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {alertMessage}
      </MuiAlert>
    </Snackbar>
  )
}

export default Alert
