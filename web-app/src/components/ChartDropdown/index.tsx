import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Modal } from 'antd';
import { removeObservations, addObservations } from '../../redux/rootSlices';
import ReduxModule from '../../utils/modules/redux';
import { generateRandomId } from '../../utils/common';
import AddChartModal from '../AddChartModal';
import SeriesModule from '../../utils/modules/series';

interface IChartDropdownProps {
  chartData: SeriesModule.IObservationState;
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
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: onDeleteChart,
    });
  };

  const handleDuplicateChart = async () => {
    if (chartData?.id) {
      const duplicatedChart = { ...chartData, id: generateRandomId() };
      await dispatch(addObservations(duplicatedChart));
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <AddChartModal isEdit={true} defaultChartData={chartData} />,
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
      <Button size="small">
        <MoreOutlined className="font-bold" />
      </Button>
    </Dropdown>
  );
};

export default ChartDropdown;
