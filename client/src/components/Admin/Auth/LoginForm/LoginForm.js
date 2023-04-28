import React from 'react';
import { Form } from 'semantic-ui-react';


export  function LoginForm() {
  return (
    <div>
      <h2>Login Form</h2>
      <Form>
        <Form.Input name="email" placeholder="Email" />
        <Form.Input name="password" type="password" placeholder="Password" />
        <Form.Button type='submit' primary fluid > 
            Login
        </Form.Button>
      </Form>
    </div>
  )
}
