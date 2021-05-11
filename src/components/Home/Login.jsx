import React from "react";
import Grid from '@material-ui/core/Grid';
// import logo from "./components/images/logo.png";
import Paper from '@material-ui/core/Paper';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography, 
  Button,
  TextField
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uName: "",
      uNameError: "",
      hotelCode: "",
      hotelCodeError: "",
      pwd: "",
      pwdError: "",
      uType: 0,
      uTypeError: "",
      showPassword:false,
    };
  }

  callLogin = () => {
    let uName = this.state.uName;
    let hotelCode = this.state.hotelCode;
    let pwd = this.state.pwd;
    let uType = this.state.uType;

    if (hotelCode.trim() == "" && hotelCode.trim().length == 0) {
      this.setState({
        hotelCodeError: "Please enter hotel code.",
      });
      return false;
    }

    if (uName.trim() == "" && uName.trim().length == 0) {
      this.setState({
        uNameError: "Please enter user name.",
      });
      return false;
    }

    if (pwd.trim() == "" && pwd.trim().length == 0) {
      this.setState({
        pwdError: "Please enter password.",
      });
      return false;
    }

    if (uType == 0) {
      this.setState({
        uTypeError: "Please select user type.",
      });
      return false;
    }

    localStorage.setItem("loginName", uName);
    localStorage.setItem("hotelID",2);
    this.props.onLogin(true);
  };

  reset = () => {
    this.setState({
      uName: "",
      uNameError: "",
      hotelCode: "",
      hotelCodeError: "",
      pwd: "",
      pwdError: "",
      uType: 0,
      uTypeError: "",
    });
  };

  render() {
    return (
      <>

      <div className="login-bg">
        <Typography className="text-center login-box" style={{height:"100vh"}}>
        <Grid container>

        <Grid item xs={12}>
          <Typography gutterBottom className="text-left">
          <img className="login-logo" src="https://static.dezeen.com/uploads/2019/04/ikea-logo-new-hero-1-852x479.jpg"/>
          </Typography>
          </Grid>


        <Grid item xs={12}>
          <Typography gutterBottom>
            <h4 className="login-head">--- Trifecta ---</h4>
            <p className="login-head">
              <b>Hotel Management Software</b>
            </p>
            <h2 className="login-head">LOGIN</h2>
          </Typography>
          </Grid>
         
        <Grid item xs={12}>
          <FormControl variant="outlined" className="mb-4 w-100">
              <TextField
                id="hotelcode"
                label="Hotel Code *"
                variant="outlined"
                value={this.state.hotelCode}
                onChange={(e) => this.setState({ hotelCode: e.target.value })}
              />
              <FormHelperText style={{ color: "red" }}>
                {this.state.hotelCodeError}
              </FormHelperText>
            </FormControl>
        </Grid>

        <Grid item xs={12}>
        <FormControl variant="outlined" className="mb-4 w-100">
              <TextField
                id="fullName"
                label="User Name *"
                variant="outlined"
                value={this.state.uName}
                onChange={(e) => this.setState({ uName: e.target.value })}
              />
              <FormHelperText style={{ color: "red" }}>
                {this.state.uNameError}
              </FormHelperText>
            </FormControl>
        </Grid>

        <Grid item xs={12}>
        <FormControl variant="outlined" className="mb-4 w-100">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password *
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={this.state.showPassword ? "text" : "password"}
                  value={this.state.pwd}
                  onChange={(e) => this.setState({ pwd: e.target.value })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          this.setState({
                            showPassword: !this.state.showPassword,
                          })
                        }
                        edge="end"
                      >
                        {this.state.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.pwdError}
                </FormHelperText>
              </FormControl>
        </Grid>

        <Grid item xs={12}>
        <FormControl className="w-100" variant="outlined" style={{ minWidth: 150 }}>
              <InputLabel id="demo-simple-select-outlined-label">
                USER TYPE *
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Third Party"
                value={this.state.uType}
                onChange={(e) => this.setState({ uType: e.target.value })}
              >
                <MenuItem value="0">Select</MenuItem>
                <MenuItem value="1">Admin</MenuItem>
                <MenuItem value="2">Front Office</MenuItem>
              </Select>
              <FormHelperText style={{ color: "red" }}>
                {this.state.uTypeError}
              </FormHelperText>
            </FormControl>
        </Grid>



        </Grid>



        
         

         

          <Typography
            className="mt-4"
            style={{ justifyContent: "center !important" }}
          >
            <Button
              autoFocus
              className="save-btn  mr-2"
              onClick={() => this.callLogin()}
            >
              Login
            </Button>
            <Button className="close-btn" onClick={()=>this.reset()}>Reset</Button>
          </Typography>
        </Typography>
        </div>
      
      </>
    );
  }
}
