import React, {useEffect} from 'react';
import { Link } from  'react-router-dom';
import {Button, Space, Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";

import {
    getGroupsRequest,
} from '../../actions/index'

export const HomePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const groups = useSelector(state => state?.groups);
    console.log('groups', groups);
    let newGroups = [];
    if (groups) {
        newGroups = [{...groups[0]}, {...groups[0]}, {...groups[0]}, {...groups[0]}, {...groups[0]}, {...groups[0]},{...groups[0]},{...groups[0]},{...groups[0]},{...groups[0]},{...groups[0]},{...groups[0]},{...groups[0]},{...groups[0]}, ];
        newGroups[0].name = 'К-10';newGroups[0].year = 1;
        newGroups[1].name = 'К-11';newGroups[1].year = 1;
        newGroups[2].name = 'К-12';newGroups[2].year = 1;
        newGroups[3].name = 'К-13';newGroups[3].year = 1;
        newGroups[4].name = 'К-14';newGroups[4].year = 1;
        newGroups[5].name = 'К-15';newGroups[5].year = 1;
        newGroups[6].name = 'К-16';newGroups[6].year = 1;
        newGroups[7].name = 'К-17';newGroups[7].year = 1;
        newGroups[8].name = 'К-18';newGroups[8].year = 1;
        newGroups[9].name = 'К-19';newGroups[9].year = 1;
        newGroups[10].name = 'К-28';newGroups[10].year = 2;
        newGroups[11].name = 'К-29';newGroups[11].year = 2;
        newGroups[12].name = 'ІПС-31'; newGroups[12].year = 3;
        newGroups[13].name = 'ІПС-32';newGroups[13].year = 3;
    }

    const columns = [
            {
                title: 'Курс',
                dataIndex: 'year',
                key: 'year',
            },
            {
                title: 'Група',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Факультет',
                dataIndex: 'condition_ru',
                key: 'condition_ru',
                render: text => <a>{'Кібернетика'}</a>,
            },

            {
                title: 'Action',
                key: 'action',
                render: (item) => (
                    <Space size="middle">
                        <Button onClick={() => history.push('/marks')}>Переглянути оцінки</Button>
                    </Space>
                ),
            },
        ];

    useEffect(() => {
        dispatch(getGroupsRequest());
    }, []);
        return (
            <div className={'home-page'}>
                <h2>Оберіть свою групу для того, щоб можна можна було переглянути оцінки</h2>
                <div style={{paddingTop: '3vh', width: '600px', margin: 'auto'}}>
                    <Table columns={columns} dataSource={newGroups}/>
                </div>
            </div>
        );
}

export default HomePage;