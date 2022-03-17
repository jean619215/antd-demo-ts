
import { useState, useEffect } from 'react';
import { Table, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { IRealEstateData } from '../MainPanel';


interface IResultPageProps {
    data: Array<IRealEstateData>
}

const columns = [
    {
        title: 'State',
        dataIndex: 'state',
        key: 'state',
    },
    {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
    },
    {
        title: 'Houses',
        dataIndex: 'house',
        key: 'price',
    },
    {
        title: 'Avg. Price',
        dataIndex: 'avgPrice',
        key: 'avgPrice',
    }
]

interface IFormattedData {
    key: number,
    state: string,
    city: string,
    house: number,
    avgPrice: number
}

export default function ResultPage({ data }: IResultPageProps) {
    const [formattedData, setFormattedData] = useState<Array<IFormattedData>>([]);
    const [slectedState, setSlectedState] = useState<number>(0);
    const [options, setOptions] = useState<Array<string>>([]);

    useEffect(() => {
        //format data
        formatteData()
    }, [])

    function formatteData() {
        let formated: any = {};
        let output: any = [];
        let count: number = 0;
        data.map(obj=> {
            if (!formated[obj.state]) {
                formated[obj.state] = [obj];
            } else {
                formated[obj.state].push(obj);
            }
        });

        setOptions(Object.keys(formated));

        for (let fkey in formated) {
            const citys: any = {};
            formated[fkey].map((obj: any) => {
                if (!citys[obj.city]) {
                    citys[obj.city] = [obj];
                } else {
                    citys[obj.city].push(obj);
                }
            });

            for (const ckey in citys) {

                const house = citys[ckey].length;
                const sumPrice = citys[ckey].reduce((preValue: any, cValue: any) => {
                    return preValue + cValue.price;
                }, 0);

                output.push({
                    key: `${count}`,
                    state: fkey,
                    city: ckey,
                    house,
                    avgPrice: Math.round(sumPrice / citys[ckey].length)
                });
                count++;
            }
        }
        setFormattedData(output);
    }

    const menuOnClick = ({ key }:any) => {
        setSlectedState(parseInt(key));
    };

    const menu = (
        <Menu onClick={menuOnClick}>
        { options.map( (obj,index)=> {
            return  <Menu.Item key={index}>{obj}</Menu.Item>
          }
        )}
        </Menu>
      );

    return (
        <>
            <Dropdown  overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    {options[slectedState]} <DownOutlined />
                </a>
            </Dropdown>
            <Table key={'ResultPage'} dataSource={formattedData.filter(obj=> obj.state === options[slectedState] )} columns={columns} />
        </>
    );
}

