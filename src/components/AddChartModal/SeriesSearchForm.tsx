import { Form, FormInstance, message, Select, Spin, Typography } from 'antd';
import { ISeriesSearchFormValues, ScreenEnum } from '.';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { useLazySearchFredSeriesQuery } from '../../redux/rootApis';
import SeriesModule from '../../utils/modules/series';

interface ISelectOptions {
  label: string;
  value: string | number;
}

interface ISeriesSearchFormProps {
  form: FormInstance<ISeriesSearchFormValues>;
  onScreenChange: (screen: ScreenEnum) => void;
  defaultOptions?: ISelectOptions[];
}

const SeriesSearchForm = ({
  form,
  defaultOptions = [],
  onScreenChange,
}: ISeriesSearchFormProps) => {
  const [options, setOptions] = useState<ISelectOptions[]>(defaultOptions);
  const [loading, setLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const [getFredSeries] = useLazySearchFredSeriesQuery();

  const onFinish = (values: any) => {
    onScreenChange(ScreenEnum.SETTINGS);
  };

  // Debounced function to fetch data based on search input
  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      try {
        if (value) {
          setShowError(false);
          setLoading(true);
          const result = await getFredSeries(value).unwrap();
          const options = await SeriesModule.computeSelectOption(result);
          setOptions(options);
          setShowError(!!(options.length === 0));
        } else {
          setOptions([]);
        }
      } catch (error: any) {
        message.error('Error on series search');
      } finally {
        setLoading(false);
      }
    }, 500),

    [getFredSeries]
  );

  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  return (
    <>
      <Typography.Title level={4}>FRED Series</Typography.Title>

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
          validateStatus={showError ? 'error' : undefined} // Error status when no results
          help={
            showError
              ? 'No series found. Please try a different search term.'
              : undefined
          }
          rules={[{ required: true, message: 'Please select a series' }]}
        >
          <Select
            className="w-full h-10"
            placeholder="Search for series"
            onSearch={handleSearch}
            loading={loading}
            showSearch
            allowClear={true}
            options={options.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
            notFoundContent={loading ? <Spin className="p-4 mx-auto" /> : null}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default SeriesSearchForm;
