import React, { useRef, useState } from 'react';
import { Scope } from '@unform/core';
import { Form } from '@unform/web';
import api from './services/api';

import * as Yup from 'yup';

import Input from './components/Input';
import './styles.css';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip_code, setZipCode] = useState('');

  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    const data_user = {
      name,
      email,
      phone,
    };

    const data_address = {
      street,
      number,
      city,
      state,
      zip_code,
    };

    try {
      await api.post('users', data_user);
      await api.post('address', data_address);

      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
          .email('Enter a valid e-mail address')
          .required('Email is required'),
        address: Yup.object().shape({
          street: Yup.string().required('Street is required'),
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data);
      formRef.current.setErrors({});
      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <img
        src="https://infomarketpesquisa.com/wp-content/themes/stamina/assets/img/logo.png"
        width="175"
        height="150"
        alt="Unform"
      />

      <Input
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Full name"
      />
      <Input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="E-mail"
        type="email"
      />
      <Input
        name="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        label="Phone"
      />

      <Scope path="address">
        <Input
          name="street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          label="Street name"
        />
        <Input
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          label="Number"
        />
        <Input
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          label="City"
        />
        <Input
          name="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          label="State"
        />
        <Input
          name="zip_code"
          value={zip_code}
          onChange={(e) => setZipCode(e.target.value)}
          label="ZIP code"
        />
      </Scope>

      <button type="submit">Save</button>
    </Form>
  );
}
