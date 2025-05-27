// import Button from "../../ui/Button";
// import Form from "../../ui/Form";
// import FormRow from "../../ui/Form";
// import Input from "../../ui/Input";

import { Button, Card, Form, Input, Row } from 'antd';
import { useSignup } from './useSignup';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const [form] = Form.useForm(); // <-- Fix: use array destructuring, not object
  const { signup, isLoading } = useSignup();

  const handleSubmit = ({ fullName, email, password }) => {
    signup({ fullName, email, password }, { onSettled: () => form?.resetFields() });
  };
  const handleSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // Hook form.

  return (
    <Card style={{ width: '90%' }}>
      <Form
        layout="vertical"
        name="signup"
        requiredMark={false}
        size="large"
        form={form}
        onFinish={handleSubmit}
        onFinishFailed={handleSubmitFailed}
      >
        <Form.Item
          label="Full name"
          name={'fullName'}
          rules={[
            {
              required: true,
              message: 'Please input your full name!',
            },
            {
              type: 'string',
              message: 'The input is not valid full name!',
            },
            {
              min: 3,
              message: 'Full name must be at least 3 characters',
            },
          ]}
        >
          <Input
            type="text"
            id="fullName"
            placeholder="John Doe"
            autoComplete="name"
            autoFocus
            disabled={isLoading}
          />
        </Form.Item>
        <Form.Item
          label="Email address"
          name={'email'}
          rules={[
            {
              required: true,
              message: 'Please input your email address!',
            },
            {
              pattern: /\S+@\S+\.\S+/,
              message: 'The input is not valid E-mail!',
            },
          ]}
        >
          <Input type="email" id="email" placeholder="example@example.com" disabled={isLoading} />
        </Form.Item>
        <Form.Item
          label="Password (min 8 characters)"
          name={'password'}
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              min: 8,
              message: 'Password must be at least 8 characters',
            },
          ]}
          hasFeedback
        >
          <Input
            type="password"
            id="password"
            placeholder="At least 8 characters"
            disabled={isLoading}
          />
        </Form.Item>
        <Form.Item
          label="Repeat password"
          name={'passwordConfirm'}
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please repeat your password!',
            },
            {
              min: 8,
              message: 'Password must be at least 8 characters',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
          hasFeedback
        >
          <Input
            type="password"
            id="passwordConfirm"
            placeholder="Repeat password"
            disabled={isLoading}
          />
        </Form.Item>
        <Form.Item>
          <Row justify="end" align="middle" style={{ gap: 16 }} gutter={[16, 16]} wrap={false}>
            <Button htmlType="reset" disabled={isLoading}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
              Create new user
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default SignupForm;
