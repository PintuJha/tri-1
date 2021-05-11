import React from "react";
import {
  Typography,
  Button,
  Dialog,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";


let today = new Date();
let Tyear = today.getFullYear();
let Tmonth =
  today.getMonth() + 1 < 10
    ? "0" + (today.getMonth() + 1)
    : today.getMonth() + 1;
let Tday = today.getDate();
const TodayDate = Tyear + "-" + Tmonth + "-" + Tday;

export default class AddInventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPop: true,
    };
  }

  closePop = () => {
    this.setState({ isPop: false });
    this.props.closeInventoryPop();
  };

  render() {
    return (
      <Dialog
        onClose={() => this.closePop()}
        aria-labelledby="add-category-title"
        open={this.state.isPop}
      >
        <MuiDialogTitle disableTypography>
          <Typography variant="h6">Add Inventory</Typography>
        </MuiDialogTitle>
        <MuiDialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormGroup row>
                <label className="chanel-heading">
                  <span>CHANELS</span>
                </label>

                <FormControlLabel
                  control={<Checkbox name="checkedA" />}
                  label="MASTER"
                />
                <FormControlLabel
                  control={<Checkbox name="checkedA" />}
                  label="BCOM"
                />
                <FormControlLabel
                  control={<Checkbox name="checkedA" />}
                  label="AGODA"
                />
                <FormControlLabel
                  control={<Checkbox name="checkedA" />}
                  label="BCOM"
                />
                <FormControlLabel
                  control={<Checkbox name="checkedA" />}
                  label="BCOM"
                />
                <FormControlLabel
                  control={<Checkbox name="checkedA" />}
                  label="BCOM"
                />
                <FormControlLabel
                  control={<Checkbox name="checkedA" />}
                  label="BCOM"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="dateFrom"
                label="Form Date"
                type="date"
                defaultValue={TodayDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="dateTo"
                label="To"
                type="date"
                defaultValue={TodayDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Paper>
                <table class="table mt-4">
                  <thead>
                    <tr>
                      <th>Room Category</th>
                      <th>Availability</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>STANDARD</td>
                      <td>
                        <TextField
                          id="standard-number"
                          type="number"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>DELUXE</td>
                      <td>
                        <TextField
                          id="standard-number"
                          type="number"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>ROLAY</td>
                      <td>
                        <TextField
                          id="standard-number"
                          type="number"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Paper>
            </Grid>
          </Grid>
        </MuiDialogContent>
        <MuiDialogActions>
          <Button color="primary" variant="contained">
            Save
          </Button>
          <Button
            onClick={() => this.closePop()}
            color="secondary"
            variant="contained"
          >
            Close
          </Button>
        </MuiDialogActions>
      </Dialog>
    );
  }
}
