import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm';
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm';
import Heading from '../ui/Heading';
import { Collapse, Card, Space } from 'antd';

const panelStyle = {
  // background: "var(--color-grey-0)",
  border: '2px dotted var(--color-brand-600)',
  borderRadius: 12,
  marginBottom: 16,
  overflow: 'hidden',
  padding: 0,
  // color: "var(--color-grey-900)", // Will be overridden by dark mode
};

function Account() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Heading as="h1">Update your account</Heading>
      <Card
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          // boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          borderRadius: 12,
          // background: "var(--color-grey-50)",
        }}
      >
        <Collapse
          accordion
          bordered={false}
          style={{
            borderRadius: 12,
            overflow: 'hidden',
            // background: "var(--color-grey-50)",
            // color: "var(--color-grey-900)",
          }}
          expandIconPosition="end"
        >
          <Collapse.Panel
            header={<b>Update user data</b>}
            key="1"
            style={{
              ...panelStyle,
              color: 'var(--color-grey-900)',
              // background: "var(--color-grey-0)",
            }}
          >
            <div style={{ padding: 24 }}>
              <UpdateUserDataForm />
            </div>
          </Collapse.Panel>
          <Collapse.Panel
            header={<b>Update password</b>}
            key="2"
            style={{
              ...panelStyle,
              // color: "var(--color-grey-900)",
              // background: "var(--color-grey-0)",
            }}
          >
            <div style={{ padding: 24 }}>
              <UpdatePasswordForm />
            </div>
          </Collapse.Panel>
        </Collapse>
      </Card>
    </Space>
  );
}

export default Account;
