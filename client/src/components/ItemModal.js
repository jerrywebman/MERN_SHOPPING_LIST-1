import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
//its good to store ur form input state in your component

class ItemModal extends Component {
    state = {
        modal: false,
        name: '',
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool
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

        //assigning the new user varialble to the newItem variable
        const newItem = {
            // id: uuid(),
            name: this.state.name
        }
        //add item via addItem action
        this.props.addItem(newItem);

        //close modal
        this.toggle();

    }

    render() {
        return (
            <div>
                {this.props.isAuthenticated ? <Button
                    color="dark"
                    style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}
                >Add Item</Button> : <h4 className="mb-3 ml-4">Please Log in to manage items</h4>}


                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input
                                    type="text"
                                    //name is same in the state
                                    name="name"
                                    id=" item"
                                    placeholder="Add Shopping Item"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark" style={{ marginTop: '2rem' }} block>Add Item</Button>
                            </FormGroup>

                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { addItem })(ItemModal);