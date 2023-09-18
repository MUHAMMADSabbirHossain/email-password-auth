import './App.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from './firebase.init';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';


const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameBlur = event => {
    setName(event.target.value);
  };

  const handleEmailBlur = (event) => {
    // console.log(event.target.value);
    setEmail(event.target.value);
  };

  const handlePasswordBlur = event => {
    // console.log(event.target.value);
    setPassword(event.target.value);
  };

  const handleRegisteredChange = event => {
    // console.log(event.target.checked);
    setRegistered(event.target.checked);
  }

  const handleFormSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError("password Should contian at least one special character.")
      return;
    }
    setValidated(true);
    setError("");

    if (registered) {
      console.log(email, password);

      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
        })
        .catch(error => {
          console.log(error);
          setError(error.message);
        });
    }
    else {
      // console.log("Form submitted", email, password);
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          setEmail("");
          setPassword("");
          verifyEmail();
          setUserName();
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
        });
    };
  };

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("email sent");
      });
  };

  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        console.log("updatting name");
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log("Email Verification Send")
      });
  };

  return (
    <div>

      {/* <form action="" onSubmit={handleFormSubmit}>
        <input onBlur={handleEmailBlur} type="email" name="" id="" placeholder='Email' />
        <br />
        <input onBlur={handlePasswordBlur} type="password" name="" id="" placeholder='Password' />
        <br />
        <button type="submit">Submit</button>
      </form> */}

      <div className="registration w-50 mx-auto mt-5">
        <h2 className='text-primary'>Please {registered ? "Login" : "Register!!!"}</h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          {
            !registered && <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Your Name</Form.Label>
              <Form.Control onBlur={handleNameBlur} type="text" placeholder="User name" required />
              <Form.Control.Feedback type='invalid'>
                Please provide your name.
              </Form.Control.Feedback>
            </Form.Group>
          }

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type='invalid'>
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already Registered" />
          </Form.Group>


          <p className='text-danger'>{error}</p>
          <p className='text-success'>You have successfully entered.</p>

          <Button onClick={handlePasswordReset} variant='link'>Forget Passwrod?</Button>
          <Button variant="primary" type="submit">
            {registered ? "Login" : "Register"}
          </Button>
        </Form>
      </div>

    </div>
  );
}

export default App;
