import {
  DatePicker,
  Form,
  FormInstance,
  InputNumber,
  message,
  Select,
} from 'antd';
import { useGetFredObservationsByIdMutation } from '../../redux/rootApis';
import { IObservationsSettingsFormValues, ScreenEnum } from '.';
import { useEffect } from 'react';
import FormItem from 'antd/es/form/FormItem';
import dayjs from 'dayjs';

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
const DEFAULT_OBSERVATION_START = '1776-07-04';
const DEFAULT_OBSERVATION_END = '2024-12-31';

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
  const [getObservationsById, { data: observationResp }] =
    useGetFredObservationsByIdMutation();

  const getObservations = async (body: IObservationsSettingsFormValues) => {
    if (seriesId) {
      try {
        await getObservationsById(body).unwrap();
      } catch {
        message.success('Error on getting observation data');
      }
    }
  };

  const onFinish = ({ observation_period, ...otherValues }: any) => {
    // Extract start and end dates from the form
    const observationStart = observation_period
      ? observation_period[0].format('YYYY-MM-DD')
      : DEFAULT_OBSERVATION_START;
    const observationEnd = observation_period
      ? observation_period[1].format('YYYY-MM-DD')
      : DEFAULT_OBSERVATION_END;

    getObservations({
      ...otherValues,
      observationStart,
      observationEnd,
      seriesId,
    });
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
      {JSON.stringify(unitOptions)}
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
        <InputNumber
          min={1}
          max={9999}
          defaultValue={100000}
          style={{ width: '100%' }}
        />
      </Form.Item>
    </Form>
  );
};

export default ObservationSettingsForm;
