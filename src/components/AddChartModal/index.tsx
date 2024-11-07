import React, { useState } from 'react';
import { Button, Form, Modal, Select } from 'antd';
import SeriesSearchForm from './SeriesSearchForm';
import ObservationSettingsForm from './ObservationSettings';

export enum ScreenEnum {
  SEARCH = 'search',
  SETTINGS = 'settings',
}

export interface ISeriesSearchFormValues {
  seriesId: string;
}

export interface IObservationsSettingsFormValues {
  seriesId: string;
  frequency: string;
  units: string;
  limit: string;
  observation_period: string;
}

const AddChartModal: React.FC = () => {
  const [screen, setScreen] = useState<ScreenEnum>(ScreenEnum.SEARCH);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [seriesSearchForm] = Form.useForm<ISeriesSearchFormValues>();
  const [observationsSettingsForm] =
    Form.useForm<IObservationsSettingsFormValues>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
            seriesId={seriesSearchForm.getFieldValue('seriesId') || null}
            onScreenChange={onScreenChange}
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

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Chart
      </Button>
      <Modal
        title="Search series"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form="series-search-form"
          >
            Continue
          </Button>,
        ]}
      >
        {renderScreens()}
      </Modal>
    </>
  );
};

export default AddChartModal;
