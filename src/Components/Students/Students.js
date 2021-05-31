import React, {Fragment} from 'react';
import firebase from "firebase";
import { Button, Modal, Table, Tag, Space } from 'antd';


class Students extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            currStudent: {},
            visible: false,
            visibleCurr: false
        }

        this.deleteStudent = this.deleteStudent.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.showInfo = this.showInfo.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleOkCurr = this.handleOkCurr.bind(this);
    }


    componentDidMount() {
        const studentsRef = firebase.firestore().collection('Students');

        studentsRef
            .get()
            .then((snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("All data in 'students' collection", data);
                this.setState({
                    students: data
                });
            });
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOkCurr = () => {
        this.setState({
            visibleCurr: false,
        });
    };

    handleCancelCurr = () => {
        this.setState({
            visibleCurr: false
        });
    };

    handleOk = () => {
        let addItem = {
            name: document.getElementById('student-name').value,
            surname: document.getElementById('student-surname').value,
            groupName: document.getElementById('student-group').value,
            subgroupName: document.getElementById('student-subgroup').value,
            email: document.getElementById('student-email').value,
            patronymic: document.getElementById('student-patronymic').value,
        }

        firebase
            .firestore()
            .collection("Students")
            .add(addItem)
            .then((ref) => {
                console.log("Added doc with ID: ", ref.id);
            });
        let newStudents = this.state.students;
        document.getElementById('student-name').value = '';
        document.getElementById('student-surname').value = '';
        document.getElementById('student-patronymic').value = '';
        document.getElementById('student-group').value = '';
        document.getElementById('student-subgroup').value = '';
        document.getElementById('student-email').value = '';
        newStudents.push(addItem);
        newStudents = newStudents.filter(item => item.id !== 'id');
        this.setState({
            students: newStudents,
            visible: false,
        });
    };

    showInfo(group) {
        this.setState({
            currStudent: group,
            visibleCurr: true,
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };

    deleteStudent(id) {
        console.log('id to del', id);
        firebase
            .firestore()
            .collection("Students")
            .doc(id)
            .delete()
            .then(() => console.log("Document deleted")) // Document deleted
            .catch((error) => console.error("Error deleting document", error));

        let newStudents = this.state.students;
        newStudents= newStudents.filter(item => item.id !== id);
        this.setState({
            students: newStudents
        });

    }

    render() {
        const columns = [
            {
                title: 'Name',
                key: 'topic',
                render: item => <a>{item.name + ' ' + item.surname}</a>,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Group',
                dataIndex: 'groupName',
                key: 'groupName',
            },
            {
                title: 'Status',
                key: 'status',
                render: item => (
                    <>
                        <Tag color={'geekblue'} key={'OK'}>
                            {'OK'}
                        </Tag>
                    </>
                ),
            },

            {
                title: 'Action',
                key: 'action',
                render: (item) => (
                    <Space size="middle">
                        <Button onClick={() => this.deleteStudent(item.id)}>Delete</Button>
                        <Button onClick={() => this.showInfo(item)}>Show all info</Button>
                    </Space>
                ),
            },
        ];


        return (
            <Fragment>
                <Modal title="Add new student" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <form id={'student-form'}>
                        <input className={'ant-input'} id={'student-name'} placeholder="Name" style={{marginTop: '2vh'}}/>
                        <input className={'ant-input'} id={'student-surname'} placeholder="Surname" style={{marginTop: '2vh'}}/>
                        <input className={'ant-input'} id={'student-patronymic'} placeholder="Patronymic" style={{marginTop: '2vh'}}/>
                        <input className={'ant-input'} id={'student-group'} placeholder="Group" style={{marginTop: '2vh'}}/>
                        <input className={'ant-input'} id={'student-subgroup'} placeholder="Subgroup" style={{marginTop: '2vh'}}/>
                        <input className={'ant-input'} id={'student-email'} placeholder="Email" style={{marginTop: '2vh'}}/>
                    </form>
                </Modal>

                {this.state.currStudent && <Modal title={this.state.currStudent.surname} visible={this.state.visibleCurr} onOk={this.handleOkCurr} onCancel={this.handleCancelCurr}>
                    {console.log(this.state.currStudent)}
                    <h2><b>Name: </b> {this.state.currStudent.name + ' ' + this.state.currStudent.surname}</h2>
                    <h2><b>Group: </b> {this.state.currStudent.groupName}</h2>
                    <h2><b>Subgroup: </b> {this.state.currStudent.subgroupName}</h2>
                    <h2><b>Email: </b> {this.state.currStudent.email}</h2>
                    <h2><b>Status: </b> {'OK'}</h2>
                </Modal>}

                <Table columns={columns} dataSource={this.state.students} />

                <Button style={{marginTop: '2vh'}} onClick={() => this.showModal()}>Add student</Button>

            </Fragment>
        );
    }
}

export default Students;