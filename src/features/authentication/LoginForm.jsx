import { useState } from 'react';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRowVertical from '../../ui/FormRowVertical';
import { login } from '../../services/ApiAuth';
import { useLogin } from './useLogin';
import SpinnerMini from '../../ui/SpinnerMini';
import { Form as AntdForm, Input as AntdInput, Button as AntdButton } from 'antd';
import { useForm } from 'antd/es/form/Form';
function LoginForm() {
  const { form } = useForm();
  const { login, isLoading } = useLogin();

  function handleSubmit(values) {
    if (!values.email || !values.password) return;

    login(
      { email: values.email, password: values.password },
      {
        onSettled: () => {
          form?.resetFields();
        },
      },
    );
  }

  return (
    <>
      {/* <Form onSubmit={handleSubmit}>
        <FormRowVertical label="Email address">
          <Input
            type="email"
            id="email"
            // This makes this form better for password managers
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </FormRowVertical>
        <FormRowVertical label="Password">
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button size="large" disabled={isLoading}>{!isLoading ? 'Login' : <SpinnerMini />}</Button>
        </FormRowVertical>
      </Form> */}

      <AntdForm
        initialValues={{
          email: 'km@test.com',
          password: '12345',
        }}
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={handleSubmit}
        style={{
          maxWidth: 1800,
          // margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <AntdForm.Item
          label="Email address"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <AntdInput
            size="large"
            type="email"
            id="email"
            autoComplete="username"
            disabled={isLoading}
          />
        </AntdForm.Item>
        <AntdForm.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <AntdInput.Password
            size="large"
            id="password"
            autoComplete="current-password"
            disabled={isLoading}
          />
        </AntdForm.Item>
        <AntdForm.Item>
          <AntdButton htmlType="submit" type="primary" block size="large" disabled={isLoading}>
            {!isLoading ? 'Login' : <SpinnerMini />}
          </AntdButton>
        </AntdForm.Item>
      </AntdForm>
    </>
  );
}

export default LoginForm;
