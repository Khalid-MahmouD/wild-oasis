import { useUser } from "./useUser";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import UploadingImageInput from "../../ui/UploadingImageInput";
import useUpdateUser from "./useUpdateUser";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName, avatar: currentAvatar },
    },
  } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const [form] = Form.useForm();

  function handleSubmit(values) {
    const { fullName, image } = values;
    if (!fullName) return;

    const data = {
      fullName,
      avatar: image && image[0] && image[0].originFileObj ? image[0].originFileObj : undefined,
    };

    updateUser(data, {
      onSuccess: () => {
        form.setFieldsValue({
          image: undefined,
        });
      }
    });
  }

  const initialImage = currentAvatar
    ? [
      {
        uid: '-1',
        name: 'avatar.png',
        status: 'done',
        url: currentAvatar,
      },
    ]
    : [];

  return (
    <Form
      form={form}
      colon={false}
      wrapperCol={{ span: 12 }}
      labelAlign="left"
      onFinish={handleSubmit}
      layout="horizontal"
      initialValues={{
        email,
        fullName: currentFullName,
        image: initialImage,
      }}
    >
      <Form.Item label="Email address" name="email">
        <Input disabled />
      </Form.Item>
      <Divider />
      <Form.Item
        label="Full name"
        name="fullName"
        rules={[
          { required: true, message: "Full name is required" },
          { min: 3, message: "Full name must be at least 3 characters" },
        ]}
      >
        <Input disabled={isUpdating} />
      </Form.Item>
      <Divider />
      <Form.Item
        name="image"
        label="Upload Image"
        valuePropName="value"
        getValueFromEvent={(e) => e}
        rules={[
          {
            validator: (_, value) => {
              if (!value || value.length === 0) {
                return Promise.reject(new Error("Please upload an image"));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <UploadingImageInput disabled={isUpdating} />
      </Form.Item>
      <Divider />
      <Form.Item
        label=" "
        wrapperCol={{ span: 12, offset: 4 }}
      >
        <Row gutter={16} justify="end">
          <Col>
            <Button
              disabled={isUpdating}
              htmlType="reset"
              danger
              onClick={() => form.resetFields()}
            >
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              loading={isUpdating}
              disabled={isUpdating}
            >
              Update account
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </ Form >
  );
}

export default UpdateUserDataForm;
