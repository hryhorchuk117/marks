import React, {Fragment} from 'react';
import firebase from "firebase";
import { Button, Modal, Table, Tag, Space } from 'antd';


class Teachers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teachers: [],
            currTeacher: {},
            visible: false,
            visibleCurr: false
        }

        this.deleteTeacher = this.deleteTeacher.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.showInfo = this.showInfo.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleOkCurr = this.handleOkCurr.bind(this);
    }


    componentDidMount() {
        const teachersRef = firebase.firestore().collection('Teachers');

        teachersRef
            .get()
            .then((snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("All data in 'teachers' collection", data);
                this.setState({
                    teachers: data
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
            name: document.getElementById('teacher-name').value,
            surname: document.getElementById('teacher-surname').value,
            groupName: document.getElementById('teacher-group').value,
            email: document.getElementById('teacher-email').value,
            patronymic: document.getElementById('teacher-patronymic').value,
        }

        firebase
            .firestore()
            .collection("Teachers")
            .add(addItem)
            .then((ref) => {
                console.log("Added doc with ID: ", ref.id);
            });
        let newTeachers = this.state.teachers;
        document.getElementById('teacher-name').value = '';
        document.getElementById('teacher-surname').value = '';
        document.getElementById('teacher-patronymic').value = '';
        document.getElementById('teacher-group').value = '';
        document.getElementById('teacher-email').value = '';
        newTeachers.push(addItem);
        newTeachers = newTeachers.filter(item => item.id !== 'id');
        this.setState({
            teachers: newTeachers,
            visible: false,
        });
    };

    showInfo(group) {
        this.setState({
            currTeacher: group,
            visibleCurr: true,
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };

    deleteTeacher(id) {
        console.log('id to del', id);
        firebase
            .firestore()
            .collection("Teachers")
            .doc(id)
            .delete()
            .then(() => console.log("Document deleted")) // Document deleted
            .catch((error) => console.error("Error deleting document", error));

        let newTeachers = this.state.teachers;
        newTeachers= newTeachers.filter(item => item.id !== id);
        this.setState({
            teachers: newTeachers
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
                        <Button onClick={() => this.deleteTeacher(item.id)}>Delete</Button>
                        <Button onClick={() => this.showInfo(item)}>Show all info</Button>
                    </Space>
                ),
            },
        ];


        return (
            <Fragment>
                <Modal title="Add new teacher" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <form id={'teacher-form'}>
                        <input className={'ant-input'} id={'teacher-name'} placeholder="Name" style={{marginTop: '2vh'}}/>
                        <input className={'ant-input'} id={'teacher-surname'} placeholder="Surname" style={{marginTop: '2vh'}}/>
                        <input className={'ant-input'} id={'teacher-patronymic'} placeholder="Patronymic" style={{marginTop: '2vh'}}/>
                        <input className={'ant-input'} id={'teacher-group'} placeholder="Group" style={{marginTop: '2vh'}}/>
                        <input className={'ant-input'} id={'teacher-email'} placeholder="Email" style={{marginTop: '2vh'}}/>
                    </form>
                </Modal>

                {this.state.currTeacher && <Modal title={this.state.currTeacher.surname} visible={this.state.visibleCurr} onOk={this.handleOkCurr} onCancel={this.handleCancelCurr}>
                    {console.log(this.state.currTeacher)}
                    <h2><b>Name: </b> {this.state.currTeacher.name + ' ' + this.state.currTeacher.surname + ' ' + this.state.currTeacher.patronymic}</h2>
                    <h2><b>Groups: </b> 7 клас</h2>
                    {console.log(this.state.currTeacher.groups)}
                    <h2><b>Email: </b> {this.state.currTeacher.email}</h2>
                    <h2><b>Status: </b> {'OK'}</h2>
                </Modal>}

                <Table columns={columns} dataSource={this.state.teachers} />

                <Button style={{marginTop: '2vh'}} onClick={() => this.showModal()}>Add teacher</Button>

            </Fragment>
        );
    }
}

export default Teachers;