import {
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
  message,
  Select,
} from 'antd';
import {
  useGetFredObservationsByIdMutation,
  useGetFredSeriesQuery,
} from '../../redux/rootApis';
import { IObservationsSettingsFormValues, ScreenEnum } from '.';
import { useEffect } from 'react';
import FormItem from 'antd/es/form/FormItem';
import dayjs from 'dayjs';
import ChartPreview from './ChartPreview';

const { RangePicker } = DatePicker;

export enum UnitsEnum {
  LIN = 'Levels (No transformation)',
  CHG = 'Change',
  CH1 = 'Change from Year Ago',
  PCH = 'Percent Change',
  PC1 = 'Percent Change from Year Ago',
  PCA = 'Compounded Annual Rate of Change',
  CCH = 'Continuously Compounded Rate of Change',
  CCA = 'Continuously Compounded Annual Rate of Change',
  LOG = 'Natural Log',
}

enum FrequencyEnum {
  q = 'Quarterly',
  sa = 'Semiannual',
  a = 'Annual',

  //   TODO: API not accepting these values
  // Frequencies without period descriptions
  //   d = 'Daily',
  //   w = 'Weekly',
  //   bw = 'Biweekly',
  //   m = 'Monthly',  //   // Frequencies with period descriptions
  //   wef = 'Weekly, Ending Friday',
  //   weth = 'Weekly, Ending Thursday',
  //   wew = 'Weekly, Ending Wednesday',
  //   wetu = 'Weekly, Ending Tuesday',
  //   wem = 'Weekly, Ending Monday',
  //   wesu = 'Weekly, Ending Sunday',
  //   wesa = 'Weekly, Ending Saturday',
  //   bwew = 'Biweekly, Ending Wednesday',
  //   bwem = 'Biweekly, Ending Monday',
}

// Default values for observation_start and observation_end
export const DEFAULT_OBSERVATION_START = '2015-07-04';
export const DEFAULT_OBSERVATION_END = '2024-12-31';

const unitOptions = Object.keys(UnitsEnum).map((key) => ({
  label: UnitsEnum[key as keyof typeof UnitsEnum],
  value: key.toLowerCase(),
}));

const frequencyOptions = Object.keys(FrequencyEnum).map((key) => ({
  label: FrequencyEnum[key as keyof typeof FrequencyEnum],
  value: key,
}));

interface IObservationSettingsFormProps {
  form: FormInstance<IObservationsSettingsFormValues>;
  seriesId: string | null;
  onScreenChange: (screen: ScreenEnum) => void;
}

const ObservationSettingsForm = ({
  form,
  seriesId,
  onScreenChange,
}: IObservationSettingsFormProps) => {
  const { data: seriesInfo } = useGetFredSeriesQuery(seriesId || '', {
    skip: !seriesId,
    refetchOnMountOrArgChange: true,
  });

  const onFinish = ({ observation_period, ...otherValues }: any) => {
    onScreenChange(ScreenEnum.CHART_PREVIEW);
  };

  useEffect(() => {
    if (seriesInfo) {
      form.setFieldValue('graphTitle', seriesInfo.seriess[0].title);
    }
  }, [seriesInfo]);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        className="py-6"
        onFinish={onFinish}
        name="observation-setting-form"
      >
        <FormItem name="graphTitle" label="Graph Title">
          <Input />
        </FormItem>
        <FormItem name="units" label="Units">
          <Select
            showSearch
            placeholder="Select Units"
            className="w-full"
            options={unitOptions}
          ></Select>
        </FormItem>
        <FormItem name="frequency" label="Frequency">
          <Select
            showSearch
            placeholder="Select Frequency"
            className="w-full"
            options={frequencyOptions}
          ></Select>
        </FormItem>
        <Form.Item
          name="observation_period"
          label="Observation Period"
          rules={[{ required: true, message: 'Please select a date range' }]}
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
              message: 'Please enter a limit value',
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
