import { useEffect } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useGetFredObservationsByIdMutation } from '../../redux/rootApis';
import { IObservationsSettingsFormValues, ScreenEnum } from '.';
import { Button, message, Spin } from 'antd';
import dayjs from 'dayjs';
import {
  DEFAULT_OBSERVATION_END,
  DEFAULT_OBSERVATION_START,
} from './ObservationSettings';
import { LoadingOutlined } from '@ant-design/icons';
import LineChartAntd from '../Charts/LineChartAntd';
import LinearChartNivo from '../Charts/LinearChartNivo';
import ReduxModule from '../../utils/modules/redux';
import { updateObservations } from '../../redux/rootSlices';
import LinearChart from '../Charts/LinearChart';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IChartPreviewProps {
  seriesId: string;
  formData: IObservationsSettingsFormValues | null;
  onScreenChange: (screen: ScreenEnum) => void;
  onCloseModal?: () => void;
}

const ChartPreview = ({
  formData,
  seriesId,
  onScreenChange,
  onCloseModal,
}: IChartPreviewProps) => {
  const dispatch = ReduxModule.useAppDispatch();

  const [getObservationsById, { data: observationResp, isLoading }] =
    useGetFredObservationsByIdMutation();

  const getObservations = async (body: SeriesModule.IObservationPayload) => {
    try {
      await getObservationsById(body).unwrap();
    } catch {
      message.success('Error on getting observation data');
    }
  };

  const onAddChartClick = async () => {
    if (observationResp) {
      await dispatch(updateObservations(observationResp));
      onCloseModal?.();
      onScreenChange(ScreenEnum.SEARCH);
    }
  };

  useEffect(() => {
    if (formData) {
      const { observationPeriod, ...otherValues } = formData;
      // Extract start and end dates from the form
      const observationStart = observationPeriod
        ? dayjs(observationPeriod[0]).format('YYYY-MM-DD')
        : DEFAULT_OBSERVATION_START;
      const observationEnd = observationPeriod
        ? dayjs(observationPeriod[1]).format('YYYY-MM-DD')
        : DEFAULT_OBSERVATION_END;

      if (seriesId) {
        getObservations({
          ...otherValues,
          observationStart,
          observationEnd,
          seriesId,
        });
      }
    }
  }, [formData]);

  return (
    <div className="flex flex-col">
      {isLoading && <Spin indicator={<LoadingOutlined spin />} size="large" />}
      {observationResp && <LinearChart observationData={observationResp} />}

      <div className="flex justify-end pt-4 gap-2 ">
        <Button
          type="default"
          onClick={() => onScreenChange(ScreenEnum.SETTINGS)}
        >
          Back
        </Button>
        <Button type="primary" onClick={onAddChartClick}>
          Add Chart
        </Button>
      </div>
    </div>
  );
};

export default ChartPreview;
