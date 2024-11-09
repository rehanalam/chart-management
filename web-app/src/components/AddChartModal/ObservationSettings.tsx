import {
  DatePicker,
  Form,
  FormInstance,
  InputNumber,
  Select,
  Typography,
} from 'antd';
import { IObservationsSettingsFormValues, ScreenEnum } from '.';
import FormItem from 'antd/es/form/FormItem';
import dayjs from 'dayjs';
import SeriesModule from '../../utils/modules/series';
import { useEffect } from 'react';

const { RangePicker } = DatePicker;

// Default values for observation_start and observation_end
export const DEFAULT_OBSERVATION_START = '2015-07-04';
export const DEFAULT_OBSERVATION_END = '2024-12-31';

const unitOptions = Object.keys(SeriesModule.UnitsEnum).map((key) => ({
  label: SeriesModule.UnitsEnum[key as keyof typeof SeriesModule.UnitsEnum],
  value: key.toLowerCase(),
}));

interface IObservationSettingsFormProps {
  form: FormInstance<IObservationsSettingsFormValues>;
  seriesId: string | null;
  seriesData?: SeriesModule.IFredSeriesResponse;
  onScreenChange: (screen: ScreenEnum) => void;
}

const ObservationSettingsForm = ({
  form,
  seriesData,
  onScreenChange,
}: IObservationSettingsFormProps) => {
  const onFinish = ({ observation_period, ...otherValues }: any) => {
    onScreenChange(ScreenEnum.CHART_PREVIEW);
  };

  return (
    <>
      <Typography.Title level={4}>Observation Settings</Typography.Title>
      <div className="bg-gray-50 p-4 rounded-md ">
        <Typography.Title level={5}>
          {seriesData?.seriess[0].title}
        </Typography.Title>
        <Typography.Paragraph className="!m-0">
          {seriesData?.seriess[0].notes}
        </Typography.Paragraph>
      </div>
      <Form
        form={form}
        layout="vertical"
        className="py-6"
        onFinish={onFinish}
        name="observation-setting-form"
      >
        <FormItem
          name="units"
          label="Units"
          rules={[{ required: true, message: 'Field Required' }]}
        >
          <Select
            showSearch
            placeholder="Select Units"
            className="w-full"
            options={unitOptions}
          />
        </FormItem>
        <FormItem
          name="frequency"
          label="Frequency"
          rules={[{ required: true, message: 'Field Required' }]}
        >
          {seriesData?.seriess && (
            <Select
              showSearch
              placeholder="Select Frequency"
              className="w-full"
              options={SeriesModule.getFilteredFrequencyOptions(
                seriesData?.seriess?.[0]?.frequency,
                seriesData?.seriess?.[0]?.frequency_short
              )}
            />
          )}
        </FormItem>
        <Form.Item
          name="observationPeriod"
          label="Observation Period"
          rules={[{ required: true, message: 'Field Required' }]}
        >
          <RangePicker
            format="YYYY-MM-DD"
            allowClear={false}
            className="w-full"
            defaultPickerValue={[
              dayjs(DEFAULT_OBSERVATION_START),
              dayjs(DEFAULT_OBSERVATION_END),
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Results Limit"
          name="limit"
          rules={[
            {
              required: true,
              message: 'Field Required',
            },
            {
              type: 'number',
              min: 1,
              max: 9999,
              message: 'Limit must be between 1 and 100000',
            },
          ]}
        >
          <InputNumber min={1} max={9999} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </>
  );
};

export default ObservationSettingsForm;
