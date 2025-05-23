
// import Button from "../../ui/Button";
// import FileInput from "../../ui/FileInput";
// import Form from "../../ui/Form";
// import FormRow from "../../ui/FormRow";
// import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { Button, Col, Form, Input, Row } from "antd";
import UploadingImageInput from "../../ui/UploadingImageInput";
import useUpdateUser from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();





  function handleSubmit(values) {
    const { fullName, image } = values;
    console.log("values", values);
    if (!fullName) return;
    const data = {
      fullName,
      avatar: image[0]?.originFileObj,
    };
    updateUser(data);

  }

  return (
    <Form
      colon={false}
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 10 }}
      labelAlign="left"
      onFinish={handleSubmit}
      layout="horizontal"
      initialValues={{
        email,
        fullName: currentFullName,
      }}
    >
      <Form.Item label="Email address" name={"email"}>
        <Input
          disabled
        />
      </Form.Item>
      <Form.Item label="Full name" name={"fullName"}>
        <Input
        />
      </Form.Item>
      <Form.Item
        name="image"
        label="Upload Image"
        valuePropName="value"
        getValueFromEvent={(e) => e}
      >
        <UploadingImageInput />
      </Form.Item>
      <Form.Item
        label=" "
        wrapperCol={{ span: 8, offset: 2 }}
      >
        <Row gutter={16} justify="end">
          <Col>
            <Button htmlType="reset" danger>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleSubmit}
            >
              Update account
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form >
  );
}

export default UpdateUserDataForm;
