import { useGetFredCategoryQuery } from "../../redux/fredCategories/api";


const Dashboard = () => {
      const {data, isLoading} = useGetFredCategoryQuery(undefined,{refetchOnMountOrArgChange: true});
console.log('hello')
 return  <div>

    {JSON.stringify(data)}
 </div>
}

export default Dashboard