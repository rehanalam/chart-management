import { DatePicker, Form, FormInstance, message, Select } from 'antd';
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
  // Frequencies without period descriptions
  d = 'Daily',
  w = 'Weekly',
  bw = 'Biweekly',
  m = 'Monthly',
  q = 'Quarterly',
  sa = 'Semiannual',
  a = 'Annual',

  // Frequencies with period descriptions
  wef = 'Weekly, Ending Friday',
  weth = 'Weekly, Ending Thursday',
  wew = 'Weekly, Ending Wednesday',
  wetu = 'Weekly, Ending Tuesday',
  wem = 'Weekly, Ending Monday',
  wesu = 'Weekly, Ending Sunday',
  wesa = 'Weekly, Ending Saturday',
  bwew = 'Biweekly, Ending Wednesday',
  bwem = 'Biweekly, Ending Monday',
}

// Default values for observation_start and observation_end
const DEFAULT_OBSERVATION_START = '1776-07-04';
const DEFAULT_OBSERVATION_END = '9999-12-31';

const unitOptions = Object.values(UnitsEnum).map((value) => ({
  label: value,
  value,
}));

const frequencyOptions = Object.values(FrequencyEnum).map((value) => ({
  label: value,
  value,
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

  const onFinish = (values: any) => {
    // Extract start and end dates from the form
    const observationStart = values.observation_period
      ? values.observation_period[0].format('YYYY-MM-DD')
      : DEFAULT_OBSERVATION_START;
    const observationEnd = values.observation_period
      ? values.observation_period[1].format('YYYY-MM-DD')
      : DEFAULT_OBSERVATION_END;

    console.log('Observation Start:', observationStart);
    console.log('Observation End:', observationEnd);
  };

  const getObservations = async () => {
    if (seriesId) {
      try {
        await getObservationsById(seriesId).unwrap();
      } catch {
        message.success('Error on getting observation data');
      }
    }
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
          style={{ width: '100%' }}
          defaultPickerValue={[
            dayjs(DEFAULT_OBSERVATION_START),
            dayjs(DEFAULT_OBSERVATION_END),
          ]}
        />
      </Form.Item>
    </Form>
  );
};

export default ObservationSettingsForm;
