import {Button, Space, Table} from 'antd';
import React from "react";
import {useHistory} from "react-router-dom";

export const Teachers = () => {
  const history = useHistory();
  const columns = [
  {
    title: "Назва",
    dataIndex: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Група',
    dataIndex: 'group',
    sorter: {
      compare: (a, b) => a.lab1 - b.lab1,
      multiple: 3,
    },
  },
  {
    title: 'Число студентів',
    dataIndex: 'students',
    sorter: {
      compare: (a, b) => a.lab2 - b.lab2,
      multiple: 2,
    },
  },
      {
    title: 'Останнє оновлення',
    dataIndex: 'update',
    sorter: {
      compare: (a, b) => a.lab2 - b.lab2,
      multiple: 2,
    },
  },
      {
                title: 'Action',
                key: 'action',
                render: (item) => (
                    <Space size="middle">
                        <Button onClick={() => {history.push('teacher-marks')}}>Перейти до предмету</Button>
                    </Space>
                ),
            },
];

  const data = [
  {
    key: '1',
    name: 'Основи ООП',
    group: 'ІПС-31',
    students: 25,
      update: '25 / 05 / 2021'
  },

      {
    key: '2',
    name: 'Основи ООП',
    group: 'ІПС-32',
    students: 28,
      update: '02 / 05 / 2021'
  },
      {
    key: '3',
    name: 'Алгебра і Геометрія',
    group: 'К-28',
    students: 21,
      update: '05 / 04 / 2021'
  },
      {
    key: '4',
    name: 'Алгебра і Геометрія',
    group: 'К-29',
    students: 31,
      update: '28 / 05 / 2021'
  },
      {
    key: '5',
    name: 'Основи побудови компіляторів',
    group: 'ІПС-31',
    students: 25,
      update: '18 / 05 / 2021'
  },

];

  return (
    <div style={{width: '80vw'}} className={'home-page'}>
      <Table columns={columns} dataSource={data}/>
    </div>
  );
};