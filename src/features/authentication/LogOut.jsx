import { Button } from 'antd';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from './useLogout';

function LogOut() {
  const { logout, isLoading } = useLogout();
  function handleLogout() {
    logout();
  }
  return (
    <Button
      type="primary"
      onClick={handleLogout}
      disabled={isLoading}
      loading={isLoading}
      icon={<HiArrowRightOnRectangle />}
    ></Button>
  );
}

export default LogOut;
