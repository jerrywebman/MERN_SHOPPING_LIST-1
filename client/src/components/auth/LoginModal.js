import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
//its good to store ur form input state in your component

class LoginModal extends Component {
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            //check for register error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });//from the redux state
            } else {
                this.setState({ msg: null });
            }
        }
        // if authenticated close modal
        if (this.state.modal) {//make sure the modal is open
            if (isAuthenticated) {//and authenticated
                this.toggle();
            }
        }
    }

    toggle = () => {
        this.props.clearErrors();//clear errors once the modal closes
        this.setState({
            modal: !this.state.modal
        });
    }
    //this helps  captures the value entered inside the input and set the state to whatever 
    //is typed in 
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });

    }

    onSubmit = e => {
        //since its a form we need to prevent the normal way the form submits
        e.preventDefault();
        // get email and password from the component state
        const { email, password } = this.state;

        //create a user object to submit the email and password
        const user = {
            email,
            password
        }

        //attempt to login
        this.props.login(user);
    };


    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">Login</NavLink>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>

                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    //name is same in the state
                                    name="email"
                                    id=" Email"
                                    placeholder="Email"
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    //name is same in the state
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark" style={{ marginTop: '2rem' }} block>Login</Button>
                            </FormGroup>

                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({//error and auth is gotten from the root reducer
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});
export default connect(mapStateToProps, { login, clearErrors })(LoginModal);