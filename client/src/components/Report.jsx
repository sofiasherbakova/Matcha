import React from 'react';
import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';

const Report = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="secondary" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Report user</ModalHeader>
        <ModalBody>
            <label>Please, let us know the reason why this user should be blocked:</label>
            <label>
              <Input type="select" name="select" id="exampleSelect">
                <option>Pornography</option>
                <option>Spam</option>
                <option>Offensive behavior</option>
                <option>Fraud</option>
              </Input>
            </label>
            <Input type="textarea" placeholder="Descride the reason for the report" rows={5} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
          <Button color="danger" onClick={toggle}>Report</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Report;