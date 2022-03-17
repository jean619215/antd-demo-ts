
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

import ResultPage from './page/ResultPage';
import { requestReelEstatesData } from '../apis/realEstate';

const StyleManPanel = styled.div`
  margin: 50px;
`;

export interface IRealEstateData {
  id: number,
  city: string,
  state: string,
  type: string,
  price: number
}

export const TYPES: Array<string> = [
  'Apartment',
  'Single-family',
  'Townhomes',
  'Condo'
]

enum PageType {
  ResultPage = 'resultPage',
  TablePage = 'tablePage',
  InputPage = 'inputPage'
}

export default function MainPanel() {
  const [loading, setLoading] = useState<boolean>(false);
  const [pageType, setPageType] = useState<PageType>(PageType.ResultPage);
  const [realEstateData, setData] = useState<Array<IRealEstateData>>([]);

  useEffect(() => {
    setLoading(true);
    getReelEstatesData();
  }, [])

  async function getReelEstatesData() {
    const res = await requestReelEstatesData();
    setData(res.properties);
    setLoading(false);
  }

  return (
    <StyleManPanel>
      {loading ? (
        <Spin />
      ) : (pageType === PageType.ResultPage) ? (
        <ResultPage data={realEstateData} />
      ) :  null}
    </StyleManPanel>
  );
}