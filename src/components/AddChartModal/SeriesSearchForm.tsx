import { Form, FormInstance, Select, Spin, Tag, Typography } from 'antd';
import { ISeriesSearchFormValues, ScreenEnum } from '.';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { useLazySearchFredSeriesQuery } from '../../redux/rootApis';

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
const predefinedFilters = [
  'CPI',
  'GDP',
  'Inflation',
  'Unemployment',
  'M2',
  'Real GDP',
  'Unemployment Rate',
  '30 Year Mortgage Interest Rate',
  'M1',
];

const computeSelectOption = async (
  result: SeriesModule.IFredSeriesResponse
) => {
  // Example of an async operation for each series (e.g., fetch additional data)
  const options = await Promise.all(
    result.seriess.map(async (series) => {
      // Simulate fetching additional information per series
      const additionalData = await fetchAdditionalData(series.id);
      return {
        label: series.title,
        value: series.id,
        description: series.notes + ' ' + additionalData,
      };
    })
  );
  return options;
};

const fetchAdditionalData = async (seriesId: string) => {
  // Simulate an async call to fetch additional data for each series
  return new Promise<string>((resolve) =>
    setTimeout(() => resolve(`Additional data for ${seriesId}`), 1000)
  );
};

const SeriesSearchForm = ({ form, onScreenChange }: ISeriesSearchFormProps) => {
  const [options, setOptions] = useState<ISelectOptions[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [getFredSeries] = useLazySearchFredSeriesQuery();

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    onScreenChange(ScreenEnum.SETTINGS);
  };

  // Debounced function to fetch data based on search input
  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      if (value) {
        setLoading(true);
        const result = await getFredSeries(value).unwrap();
        const options = await computeSelectOption(result);
        setOptions(options);
        setLoading(false);
      } else {
        setOptions([]);
        setLoading(false);
      }
    }, 500),
    [getFredSeries]
  );

  // Handle search input change
  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  return (
    <>
      <Typography.Title level={4}>Chart Preview</Typography.Title>

      <Form
        form={form}
        layout="vertical"
        className="py-6"
        // TODO: For dev testing
        // initialValues={{ seriesId: 'GNPCA' }}
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
            loading={loading}
            showSearch
            placeholder="Search for series"
            onSearch={handleSearch}
            className="w-full h-10"
            options={options.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
            notFoundContent={loading ? <Spin className="p-4 mx-auto" /> : null}
            allowClear={true}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default SeriesSearchForm;
