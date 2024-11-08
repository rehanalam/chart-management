import { DatePicker, Typography } from 'antd';
import {
  useGetFredCategoryChildrenQuery,
  useGetFredCategoryQuery,
  useGetFredCategoryRelatedQuery,
} from '../../redux/fredCategories/api';
import AddChartModal from '../AddChartModal';
import ReduxModule from '../../utils/modules/redux';
import LinearChart from '../Charts/LinearChart';
import ChartDropdown from '../ChartDropdown';
import ChartComponent from '../Charts';

const Dashboard = () => {
  const chartsData = ReduxModule.useAppSelector(
    (state) => state.seriesObservations
  );

  // const { data: categoryData } = useGetFredCategoryQuery(undefined, {
  //   refetchOnMountOrArgChange: true,
  // });
  // const { data: categoryChildData } = useGetFredCategoryChildrenQuery(
  //   undefined,
  //   {
  //     refetchOnMountOrArgChange: true,
  //   }
  // );

  // const { data: categoryRelatedData, isLoading } =
  //   useGetFredCategoryRelatedQuery(undefined, {
  //     refetchOnMountOrArgChange: true,
  //   });

  // console.log(categoryData);

  return (
    <div>
      <div className="flex border-b-2 border-b-blue-500 h-20 justify-between items-center px-10">
        <Typography.Title level={4}>FRED Dashboard</Typography.Title>
        <AddChartModal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {chartsData?.observationChartsData &&
          chartsData.observationChartsData.map((data, index) => (
            <div key={index} className="p-8 bg-slate-100 rounded-3xl">
              <div className="flex justify-between">
                <ChartDropdown />
              </div>
              {data?.chartSettings && (
                <ChartComponent
                  observationData={data}
                  settings={data.chartSettings}
                />
              )}
              {/* <div className="pt-4">
                <AddChartModal btnText="Edit Chart" />
              </div> */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
