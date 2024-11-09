import { Form, Input, Select } from 'antd';
import { debounce } from 'lodash';
import { useCallback, useEffect } from 'react';
import SeriesModule from '../../utils/modules/series';
import { generateRandomId } from '../../utils/common';

interface IChartSettingsFormProps {
  settings: SeriesModule.IChartSettings;
  onSettingsChange: (newSettings: SeriesModule.IChartSettings) => void;
}

const lineStyleOptions = [
  { value: 'solid', label: 'Solid' },
  { value: 'dotted', label: 'Dotted' },
  { value: 'dashed', label: 'Dashed' },
];

const chartTypeOptions = [
  { value: 'line', label: 'Line' },
  { value: 'bar', label: 'Bar' },
];

const ChartSettingsForm = ({
  settings,
  onSettingsChange,
}: IChartSettingsFormProps) => {
  const [form] = Form.useForm<SeriesModule.IChartSettings>();
  const chartTypeWatch = Form.useWatch('chartType', form);

  useEffect(() => {
    form.setFieldsValue({ ...settings });
  }, [settings]);

  // Debounced handler for specific fields
  const debouncedSettingsChange = useCallback(
    debounce((newSettings: SeriesModule.IChartSettings) => {
      onSettingsChange(newSettings);
    }, 500),
    [onSettingsChange]
  );

  // Use effect to clear debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSettingsChange.cancel();
    };
  }, [debouncedSettingsChange]);

  // Only debounce title and yAxisLabel; immediately update for others
  const handleFormChange = (
    changedValues: Partial<SeriesModule.IChartSettings>,
    allValues: SeriesModule.IChartSettings
  ) => {
    if (changedValues.title || changedValues.yAxisLabel) {
      debouncedSettingsChange(allValues);
    } else {
      onSettingsChange(allValues);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={settings}
      onValuesChange={handleFormChange}
      className="mb-4 border-b py-6"
      name="chart-settings-form"
    >
      <div className="grid grid-cols-2 gap-4">
        <Form.Item label="Chart Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Y-Axis Label" name="yAxisLabel">
          <Input />
        </Form.Item>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Form.Item label="Line Color" name="lineColor">
          <Input type="color" />
        </Form.Item>
        <Form.Item label="Chart Type" name="chartType">
          <Select options={chartTypeOptions} />
        </Form.Item>
        {chartTypeWatch === 'line' && (
          <Form.Item label="Line Style" name="lineStyle">
            <Select options={lineStyleOptions} />
          </Form.Item>
        )}
      </div>
    </Form>
  );
};

export default ChartSettingsForm;
