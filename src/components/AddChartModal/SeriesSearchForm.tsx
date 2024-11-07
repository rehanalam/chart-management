import { Form, FormInstance, Select, Typography } from 'antd';
import { ISeriesSearchFormValues, ScreenEnum } from '.';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { useGetFredSeriesMutation } from '../../redux/rootApis';

const { Title, Paragraph } = Typography;
const { Option } = Select;

interface ISeriesSearchFormProps {
  form: FormInstance<ISeriesSearchFormValues>;
  onScreenChange: (screen: ScreenEnum) => void;
}

interface ISelectOptions {
  label: string;
  value: string | number;
  description: string;
}

const computeSelectOption = (result: SeriesModule.IFredSeriesResponse) => {
  return result.seriess.map((series, index) => {
    return {
      label: series.title,
      value: series.id,
      description: series.notes,
    };
  });
};

const SeriesSearchForm = ({ form, onScreenChange }: ISeriesSearchFormProps) => {
  const [options, setOptions] = useState<ISelectOptions[]>([]);

  const [getFredSeries] = useGetFredSeriesMutation();

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    onScreenChange(ScreenEnum.SETTINGS);
  };

  // Debounced function to fetch data based on search input
  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      if (value) {
        const result = await getFredSeries(value).unwrap();
        console.log(computeSelectOption(result));
        setOptions(computeSelectOption(result));
      } else {
        setOptions([]);
      }
    }, 300),
    [getFredSeries]
  );

  // Handle search input change
  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{}}
      className="py-6"
      onFinish={onFinish}
      name="series-search-form"
    >
      <Form.Item
        name="seriesId"
        label="Search Series"
        rules={[{ required: true, message: 'Please select a series' }]}
        tooltip="This is a required field"
      >
        <Select
          showSearch
          placeholder="Search for series"
          onSearch={handleSearch}
          className="w-full"
          options={options}
        >
          {/* {options.map((option: ISelectOptions) => (
            <Option key={`${option.value}`} value={option.value}>
              <Title level={5}>{option.label}</Title>
              <Paragraph>{option.description}</Paragraph>
            </Option>
          ))} */}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default SeriesSearchForm;
