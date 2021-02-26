import React from "react";

import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
//firebase
import { signInWithEmailAndPassword } from "../../firebase/firebase.utils";
//redux
import { connect } from "react-redux";
import { setCurrentUserAction } from "../../redux/user/user.action";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      user: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    const { email, password } = this.state;
    const { setCurrentUser } = this.props;

    event.preventDefault();
    signInWithEmailAndPassword(email, password).then((user) => {
      setCurrentUser(user);
    });

    this.props.history.push("/chat");
  }

  render() {
    const { user } = this.state;
    console.log("page render");
    console.log(user);
    return (
      <div className="sign-in">
        <h2>I already have account </h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            label="Email"
            value={this.state.email}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            type="password"
            name="password"
            label="Password"
            value={this.state.password}
            handleChange={this.handleChange}
            required
          />
          <div className="buttons">
            <CustomButton type="submit"> Sign In </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUserAction(user)),
});

export default connect(null, mapDispatchToProps)(SignIn);
