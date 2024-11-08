import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Modal } from 'antd';
import { removeObservations, updateObservations } from '../../redux/rootSlices';
import ReduxModule from '../../utils/modules/redux';
import { generateRandomId } from '../../utils/common';

interface IChartDropdownProps {
  chartData: SeriesModule.IObservationResponse;
}

const ChartDropdown = ({ chartData }: IChartDropdownProps) => {
  const dispatch = ReduxModule.useAppDispatch();

  const onDeleteChart = async () => {
    if (chartData?.id) {
      await dispatch(removeObservations({ chartId: chartData?.id }));
    }
  };

  const handleRemoveChart = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this chart?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: onDeleteChart,
    });
  };

  const handleDuplicateChart = async () => {
    if (chartData?.id) {
      // Create a new chart object with a new unique ID
      const duplicatedChart = { ...chartData, id: generateRandomId() };
      // Dispatch the update action to add the duplicated chart to the list
      await dispatch(updateObservations(duplicatedChart));
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Edit Chart',
      onClick: () => console.log('hello'),
    },
    {
      key: '2',
      label: 'Duplicate Chart',
      onClick: () => handleDuplicateChart(),
    },
    {
      key: '3',
      label: 'Remove Chart',
      onClick: () => handleRemoveChart(),
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
