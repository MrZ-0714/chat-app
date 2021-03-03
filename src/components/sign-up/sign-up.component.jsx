//packages
import React from "react";
import "./sign-up.styles.scss";
//components
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
//firebase
import {
  createUserWithEmailAndPassword,
  createUserProfileDocument,
} from "../../firebase/firebase.utils";
//redux
import { connect } from "react-redux";
import { setCurrentUserAction } from "../../redux/user/user.action";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    const { setCurrentUser } = this.props;

    if (password !== confirmPassword) {
      alert("Passwords does not match, please check and confirm");
      return;
    }
    const user = await createUserWithEmailAndPassword(email, password);
    await createUserProfileDocument(user, { displayName });

    setCurrentUser(user);
    if (user) {
      this.props.history.push("/chat");
    } else {
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      alert("There is something wrong with the registration, try again.");
    }
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <div className="sign-up">
        <h2 className="title">I do not have a account</h2>
        <span>Sign up with email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="Display Name"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit">Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUserAction(user)),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
