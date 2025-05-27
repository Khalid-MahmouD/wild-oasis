import { Col } from 'antd';
import Heading from '../ui/Heading';
import UpdateSettingsForm from '../features/settings/UpdateSettingsForm';

function Settings() {
  return (
    <Col style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Col>
  );
}

export default Settings;
