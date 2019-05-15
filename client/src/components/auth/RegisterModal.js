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
    NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';

//its good to store ur form input state in your component

class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired
    };

    toggle = () => {
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

        const { name, email, password } = this.state;

        //create user object
        const newUser = {
            name,
            email,
            password
        };

        //attempt to register
        this.props.register(newUser);

    }
    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">Register</NavLink>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    //name is same in the state
                                    name="name"
                                    id=" name"
                                    placeholder="name"
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

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
                                    color="dark" style={{ marginTop: '2rem' }} block>Register</Button>
                            </FormGroup>

                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})
export default connect(mapStateToProps, { register })(RegisterModal);