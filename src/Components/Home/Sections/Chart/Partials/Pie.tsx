import React, { memo, useEffect } from 'react';
import HighCharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

// To enable context menu
Exporting(HighCharts);

type PieChartPropType = {
  series: HighCharts.SeriesPieOptions[],
  title?: HighCharts.TitleOptions,
  subTitle?: HighCharts.SubtitleOptions,
  plotOptions?:  HighCharts.PlotOptions,
};

const defaultTitleOptions: HighCharts.TitleOptions = {
  text: 'Product Categories',
  align: 'left',
};

const defaultSubtitleOptions: HighCharts.SubtitleOptions = {
  text: 'All available product categories',
  align: 'left',
};

const defaultPlotOptions: HighCharts.PlotOptions = {
  series: {
    allowPointSelect: true,
    cursor: 'pointer',
  }
};

const exporting: HighCharts.ExportingOptions = {
  buttons: {
    contextButton: {
      menuItems: [
        'viewFullscreen',
        'printChart',
        'downloadPNG',
        'downloadJPEG',
        'downloadPDF',
        'downloadSVG',
      ],
    },
  },
};

const PieChart = (props: PieChartPropType) => {
  const {
    title,
    subTitle,
    plotOptions,
    series,
  } = props
  useEffect(() => {
    chartRender();
  },[JSON.stringify(props)]);

  const chartRender = () => {
    HighCharts.chart({
      chart: {
        type: 'pie',
        renderTo: 'pie-chart-container'
      },
      title: {
        ...defaultTitleOptions,
        ...title
      },
      subtitle: {
        ...defaultSubtitleOptions,
        ...subTitle
      },
      plotOptions: {
        ...defaultPlotOptions,
        ...plotOptions,
      },
      series,
      exporting,
    });
  };

  return (
    <div className="pie-chart-container" id="pie-chart-container" />
  );
};


export default memo(PieChart)