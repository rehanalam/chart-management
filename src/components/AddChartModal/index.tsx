import { useState } from 'react';
import { Button, Form, message, Modal, Select, Spin } from 'antd';
import SeriesSearchForm from './SeriesSearchForm';
import ObservationSettingsForm from './ObservationSettings';
import ChartPreview from './ChartPreview';
import { useGetFredSeriesQuery } from '../../redux/fredSeries/api';

export enum ScreenEnum {
  SEARCH = 'search',
  SETTINGS = 'settings',
  CHART_PREVIEW = 'chart_preview',
}

export interface ISeriesSearchFormValues {
  seriesId: string;
}

export interface IObservationsSettingsFormValues {
  seriesId: string;
  frequency: string;
  units: string;
  limit: string;
  observationPeriod: string;
  graphTitle: string;
}

interface IAddChartModalProp {
  btnText?: string;
}

const AddChartModal = ({ btnText }: IAddChartModalProp) => {
  const [screen, setScreen] = useState<ScreenEnum>(ScreenEnum.SEARCH);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [seriesSearchForm] = Form.useForm<ISeriesSearchFormValues>();
  const [observationsSettingsForm] =
    Form.useForm<IObservationsSettingsFormValues>();

  const seriesId = seriesSearchForm.getFieldValue('seriesId');

  const { data: seriesData, isLoading } = useGetFredSeriesQuery(
    seriesId || '',
    {
      skip: !seriesId,
      refetchOnMountOrArgChange: true,
    }
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setScreen(ScreenEnum.SEARCH);
    observationsSettingsForm.resetFields();
    seriesSearchForm.resetFields();
  };

  const onScreenChange = (screen: ScreenEnum) => {
    setScreen(screen);
  };

  const renderScreens = () => {
    switch (screen) {
      case ScreenEnum.SETTINGS:
        return (
          <ObservationSettingsForm
            form={observationsSettingsForm}
            seriesId={seriesId || null}
            onScreenChange={onScreenChange}
            seriesData={seriesData}
          />
        );
      case ScreenEnum.CHART_PREVIEW:
        return (
          <ChartPreview
            formData={observationsSettingsForm.getFieldsValue() || null}
            seriesId={seriesId || null}
            onScreenChange={onScreenChange}
            onCloseModal={handleCancel}
            seriesData={seriesData}
          />
        );
      default:
      case ScreenEnum.SEARCH:
        return (
          <SeriesSearchForm
            form={seriesSearchForm}
            onScreenChange={onScreenChange}
          />
        );
    }
  };

  const renderFooter = () => {
    switch (screen) {
      case ScreenEnum.SETTINGS:
        return [
          <Button type="default" onClick={() => setScreen(ScreenEnum.SEARCH)}>
            Back
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form="observation-setting-form"
          >
            Create Chart
          </Button>,
        ];
      case ScreenEnum.CHART_PREVIEW:
        return [];
      default:
      case ScreenEnum.SEARCH:
        return [
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form="series-search-form"
          >
            Continue
          </Button>,
        ];
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {btnText ? btnText : 'Create Chart'}
      </Button>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={renderFooter()}
        width="700px"
      >
        {renderScreens()}
      </Modal>
    </>
  );
};

export default AddChartModal;
