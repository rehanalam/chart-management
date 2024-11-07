import { DatePicker } from 'antd';
import {
  useGetFredCategoryChildrenQuery,
  useGetFredCategoryQuery,
  useGetFredCategoryRelatedQuery,
} from '../../redux/fredCategories/api';
import AddChartModal from '../AddChartModal';

const Dashboard = () => {
  const { data: categoryData } = useGetFredCategoryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: categoryChildData } = useGetFredCategoryChildrenQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: categoryRelatedData, isLoading } =
    useGetFredCategoryRelatedQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

  console.log(categoryData);

  return (
    <div>
      <AddChartModal />
    </div>
  );
};

export default Dashboard;
