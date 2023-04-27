import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import "./RegisterForm.scss";

export  function RegisterForm() {

    const [error, setError] = useState("");

  return (
    <div>
      <Form className='register-form'>
      <Form.Input name="email" placeholder="E-mail"/>
      <Form.Input name="password" placeholder="Password"/>
      <Form.Input name="confirmtPassword" placeholder="Confirm Password"/>
      <Form.Checkbox name="conditionsAccepted" label="I have read and accept the privacy policy"/>
      <Form.Button type='submit' primary fluid>
      Create Account
      </Form.Button>
      {/* <p className='register-form__error'>An error has occurred</p> */}
      <p className='register-form__error'>{error}</p>
      </Form>
    </div>
  )
}
