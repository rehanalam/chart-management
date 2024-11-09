import { useEffect, useState } from 'react';
import {
  Button,
  ButtonProps,
  Form,
  message,
  Modal,
  Select,
  Spin,
  Typography,
} from 'antd';
import SeriesSearchForm from './SeriesSearchForm';
import ObservationSettingsForm from './ObservationSettings';
import ChartPreview from './ChartPreview';
import { useGetFredSeriesQuery } from '../../redux/fredSeries/api';
import { ButtonType } from 'antd/es/button';
import SeriesModule from '../../utils/modules/series';
import dayjs, { Dayjs } from 'dayjs';

export enum ScreenEnum {
  SEARCH = 'search',
  SETTINGS = 'settings',
  CHART_PREVIEW = 'chart_preview',
}

export interface ISeriesSearchFormValues {
  seriesId: string;
}

export interface IObservationsSettingsFormValues {
  frequency: string;
  units: string;
  limit: number;
  observationPeriod: [Dayjs, Dayjs] | [string, string];
}

interface IAddChartModalProp {
  isEdit?: boolean;
  defaultChartData?: SeriesModule.IObservationState;
}

const AddChartModal = ({
  isEdit = false,
  defaultChartData,
}: IAddChartModalProp) => {
  const [screen, setScreen] = useState<ScreenEnum>(
    defaultChartData?.id ? ScreenEnum.SETTINGS : ScreenEnum.SEARCH
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [seriesSearchForm] = Form.useForm<ISeriesSearchFormValues>();
  const [observationsSettingsForm] =
    Form.useForm<IObservationsSettingsFormValues>();

  const seriesId =
    seriesSearchForm.getFieldValue('seriesId') || defaultChartData?.seriesId;

  const { data: seriesData, isLoading } = useGetFredSeriesQuery(
    seriesId || '',
    {
      skip: !seriesId,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (defaultChartData) {
      seriesSearchForm.setFieldValue('seriesId', defaultChartData.seriesId);

      observationsSettingsForm.setFieldsValue({
        ...defaultChartData.observationSettings,
        observationPeriod: [
          dayjs(defaultChartData.observationSettings?.observationPeriod[0]),
          dayjs(defaultChartData.observationSettings?.observationPeriod[1]),
        ],
      });
    }
  }, [defaultChartData]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    observationsSettingsForm.resetFields();
    seriesSearchForm.resetFields();
    setScreen(isEdit ? ScreenEnum.SETTINGS : ScreenEnum.SEARCH);
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
          seriesId && (
            <ChartPreview
              isEdit={isEdit}
              formData={observationsSettingsForm.getFieldsValue() || null}
              seriesId={seriesId}
              seriesData={seriesData}
              defaultChartData={defaultChartData}
              onScreenChange={onScreenChange}
              onCloseModal={handleCancel}
            />
          )
        );
      default:
      case ScreenEnum.SEARCH:
        return (
          <SeriesSearchForm
            form={seriesSearchForm}
            onScreenChange={onScreenChange}
            {...(seriesData && {
              defaultOptions: [
                {
                  label: seriesData?.seriess[0].title,
                  value: seriesId,
                },
              ],
            })}
          />
        );
    }
  };

  const renderFooter = () => {
    switch (screen) {
      case ScreenEnum.SETTINGS:
        return [
          <Button
            key="settings-back"
            type="default"
            onClick={() => setScreen(ScreenEnum.SEARCH)}
          >
            Back
          </Button>,
          <Button
            key="settings-submit"
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
      {isEdit ? (
        <Typography.Text className="w-full" onClick={showModal}>
          Edit Chart
        </Typography.Text>
      ) : (
        <Button type="primary" onClick={showModal}>
          Create Chart
        </Button>
      )}

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={renderFooter()}
        width="700px"
        destroyOnClose={true}
      >
        {renderScreens()}
      </Modal>
    </>
  );
};

export default AddChartModal;
