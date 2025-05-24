import { Form, Input, Button, Row, Col, Divider } from "antd";
import useUpdateUser from "./useUpdateUser";

function UpdatePasswordForm() {
  const [form] = Form.useForm();
  const { updateUser, isUpdating } = useUpdateUser();

  const handleFinish = (values) => {
    updateUser(
      { password: values.password },
      {
        onSuccess: () => form.resetFields(),
      }
    );
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      labelAlign="left"
      onFinish={handleFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
    >
      <Form.Item
        label="Password (min 8 characters)"
        name="password"
        rules={[
          { required: true, message: "This field is required" },
          { min: 8, message: "Password needs a minimum of 8 characters" },
        ]}
        hasFeedback
      >
        <Input.Password autoComplete="current-password" disabled={isUpdating} />
      </Form.Item>

      <Form.Item
        label="Confirm password"
        name="passwordConfirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          { required: true, message: "This field is required" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Passwords need to match")
              );
            },
          }),
        ]}
      >
        <Input.Password autoComplete="new-password" disabled={isUpdating} />
      </Form.Item>

      <Divider />

      <Form.Item
        wrapperCol={{ span: 8, offset: 6 }}
      >
        <Row gutter={16} justify="end">
          <Col>
            <Button onClick={() => form.resetFields()} danger type="default" htmlType="reset" disabled={isUpdating}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit" loading={isUpdating} disabled={isUpdating}>
              Update password
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
}

export default UpdatePasswordForm;
