import { Form, Input, Button, Checkbox, Table, Tag } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import './styles.scss';
import React from "react";

export const TeacherMarks = () => {
  const columns = [
  {
    title: "Ім'я",
    dataIndex: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Лабораторна 1',
    dataIndex: 'lab1',
    sorter: {
      compare: (a, b) => a.lab1 - b.lab1,
      multiple: 3,
    },
  },
  {
    title: 'Лабораторна 2',
    dataIndex: 'lab2',
    sorter: {
      compare: (a, b) => a.lab2 - b.lab2,
      multiple: 2,
    },
  },
  {
    title: 'Лабораторна 3',
    dataIndex: 'lab3',
    sorter: {
      compare: (a, b) => a.lab3 - b.lab3,
      multiple: 1,
    },
  }, {
    title: 'Модуль',
    dataIndex: 'module',
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 4,
    },
  },
           {
    title: 'Зміни',
    key: 'tags',
    dataIndex: 'tags',
    render: () => (
      <>
            <Tag color={'geekblue'}>
              Редагувати
            </Tag>
        <Tag color={'volcano'}>
              Видалити
            </Tag>
      </>
    ),
  },
];

  const data = [
  {
    key: '1',
    name: 'Борисюк Василина-Катерина',
    lab1: 98,
    lab2: 60,
    lab3: 70,
    module: 70,
  },
  {
    key: '2',
    name: 'Волохоненко Богдан',
    lab1: 86,
    lab2: 72,
    lab3: 42,
    module: 95,
  },
      {
    key: '3',
    name: 'Гайдученко Ілля',
    lab1: 66,
    lab2: 71,
    lab3: 82,
    module: 77,
  },
      {
    key: '4',
    name: 'Григорчук Максим',
    lab1: 99,
    lab2: 95,
    lab3: 97,
    module: 91,
  },
      {
    key: '5',
    name: 'Домбровський Станіслав',
    lab1: 52,
    lab2: 0,
    lab3: 0,
    module: 40,
  },
      {
    key: '6',
    name: 'Ковальчук Максим',
    lab1: 89,
    lab2: 73,
    lab3: 87,
    module: 92,
  },
      {
    key: '7',
    name: 'Кореневський Ілля',
    lab1: 69,
    lab2: 74,
    lab3: 90,
    module: 76,
  },
      {
    key: '8',
    name: 'Краснощок Іван',
    lab1: 100,
    lab2: 91,
    lab3: 92,
    module: 73,
  },
      {
    key: '9',
    name: 'Кузьмич Анастасія',
    lab1: 87,
    lab2: 89,
    lab3: 81,
    module: 72,
  },
      {
    key: '10',
    name: 'Куценко Євгеній',
    lab1: 100,
    lab2: 100,
    lab3: 85,
    module: 94,
  },
];

  return (
    <div style={{width: '80vw'}} className={'home-page'}>
      <Table columns={columns} dataSource={data}/>
    </div>
  );
};