import { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody, Label, Button } from "reactstrap";
import { Control, Errors, LocalForm } from "react-redux-form";

const minLength = (length) => (val) => val && (val.length >= length);
const maxLength = (length) => (val) => !val || val.length <= length;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  toggleModal() {
      return () => {
        this.setState(
            {
              isModalOpen: !this.state.isModalOpen
            }
        );
      }
  }
  handleSubmitForm(values) {
    alert(JSON.stringify(values));
    this.toggleModal()();
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
  }

  render() {
    return (
      <Fragment>
        <Fragment>
          <Button onClick={this.toggleModal()}><span className="fa fa-pencil fa-md px-1"></span>Submit Comment </Button>
        </Fragment>
        <Fragment>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal()}>
            <ModalHeader toggle={this.toggleModal()}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={this.handleSubmitForm}>
              <div className="form-group">
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select  className="form-control" model=".rating" id="rating">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </div>
                <div className="form-group">
                  <Label htmlFor="author">Your Name</Label>
                  <Control.text 
                  placeholder="Your Name" 
                  className="form-control" 
                  model=".author" 
                  id="author"
                  validators={{
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                  }}
                  ></Control.text>
                   <Errors className="text-danger my-2"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}/>
                </div>
                <div className="form-group">
                  <Label htmlFor="comment">Comment</Label>
                  <Control.textarea rows="6" className="form-control" model=".comment" id="comment"></Control.textarea>
                </div>
                <Button type="submit" className="my-2" value="submit" color="primary">
                  Submit
                </Button>
              </LocalForm>
            </ModalBody>
          </Modal>
        </Fragment>
      </Fragment>
    );
  }
}

export default CommentForm;
