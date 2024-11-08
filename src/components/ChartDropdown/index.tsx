import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';

const ChartDropdown = () => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Edit Chart',
      onClick: () => console.log('hello'),
    },
    {
      key: '2',
      label: 'Duplicate Chart',
    },
    {
      key: '3',
      label: 'Remove Chart',
      danger: true,
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <Button>
        <MoreOutlined className="font-bold" />
      </Button>
    </Dropdown>
  );
};

export default ChartDropdown;
