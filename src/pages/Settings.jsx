import { Col, Row } from "antd";
import Heading from "../ui/Heading";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

function Settings() {
  return (
    <Col>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Col>
  );
}

export default Settings;
