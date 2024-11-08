import { Card, Typography } from 'antd';

import AddChartModal from '../AddChartModal';
import ReduxModule from '../../utils/modules/redux';
import ChartDropdown from '../ChartDropdown';
import ChartComponent from '../Charts';

const Dashboard = () => {
  const chartsData = ReduxModule.useAppSelector(
    (state) => state.seriesObservations
  );

  return (
    <div>
      <div className="flex border-b-2 border-b-blue-500 h-20 justify-between items-center px-10">
        <Typography.Title level={4}>FRED Dashboard</Typography.Title>
        <AddChartModal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 h-screen">
        {chartsData?.observationChartsData &&
          chartsData.observationChartsData.map((data, index) => (
            <Card
              key={data.id}
              className="h-fit w-full"
              title={
                <div className="flex justify-between items-center">
                  <Typography.Text ellipsis={true} className="w-[80%]">
                    {data.chartSettings?.title}
                  </Typography.Text>
                  <ChartDropdown chartData={data} />
                </div>
              }
              bordered={false}
            >
              {data?.chartSettings && (
                <ChartComponent
                  observationData={data}
                  settings={data.chartSettings}
                />
              )}
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
