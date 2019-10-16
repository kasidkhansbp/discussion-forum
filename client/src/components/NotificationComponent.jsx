import React, {useState} from 'react';
import Toast from 'react-bootstrap/Toast';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {on,trigger} from '../services/remote/handlers';

export const notify = (msg) => {
    trigger('notification',msg)
}

export default function NotificationComponent() {
    const [show, setShow] = useState(false);
    const [msg,setMsg] = useState('');
    on('notification',(msg)=>{
      setShow(true);
      setMsg(msg)
    })
    return (
    <div className="toast-container">
      <Row>
        <Col xs={20}>
          <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Body>{msg}</Toast.Body>
          </Toast>
        </Col>
      </Row>
      </div>
    );
  }
  