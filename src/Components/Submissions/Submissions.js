import React, {Fragment} from 'react';
import firebase from "firebase";
import { Button, Modal, Table, Tag, Space } from 'antd';


class Submissions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submissions: [],
            currSubmission: {},
            visible: false
        }

        this.showInfo = this.showInfo.bind(this);
        this.deleteSubmission = this.deleteSubmission.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }


    componentDidMount() {
        const submissionsRef = firebase.firestore().collection('Submissions');

        submissionsRef
            .get()
            .then((snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("All data in 'submissions' collection", data);
                this.setState({
                    submissions: data
                });
            });
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = () => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };

    showInfo(submission) {
        this.setState({
            currSubmission: submission,
            visible: true,
        });
    }

    deleteSubmission(id) {
        console.log('id to del', id);
        firebase
            .firestore()
            .collection("Submissions")
            .doc(id)
            .delete()
            .then(() => console.log("Document deleted")) // Document deleted
            .catch((error) => console.error("Error deleting document", error));

        let newSubmissions = this.state.submissions;
        newSubmissions = newSubmissions.filter(item => item.id !== id);
        this.setState({
            submissions: newSubmissions
        });

    }

    render() {

        const columns = [
            {
                title: 'Lesson Topic',
                dataIndex: 'lessonTopic',
                key: 'lessonTopic',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Group Name',
                dataIndex: 'groupName',
                key: 'groupName',
            },
            {
                title: 'Student Name',
                dataIndex: 'studentName',
                key: 'studentName',
            },
            {
                title: 'Task #',
                dataIndex: 'taskNumber',
                key: 'taskNumber',
            },

            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
                render: status => (
                    <>
                        <Tag color={status.toUpperCase() === 'NONE' ? 'volcano' : 'geekblue'} key={status}>
                            {status.toUpperCase()}
                        </Tag>
                    </>
                ),
            },

            {
                title: 'Action',
                key: 'action',
                render: (item) => (
                    <Space size="middle">
                        <Button onClick={() => this.deleteSubmission(item.id)}>Delete</Button>
                        <Button onClick={() => {this.showInfo(item)}}>Show all info</Button>
                    </Space>
                ),
            },
        ];


        return (
            <Fragment>

                <Table columns={columns} dataSource={this.state.submissions} />

                {this.state.currSubmission && <Modal title={this.state.currSubmission.studentName} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    {console.log('this.state.currSubmission', this.state.currSubmission)}
                    <h2><b>Group Name: </b> {this.state.currSubmission.groupName}</h2>
                    <h2><b>Student: </b> {this.state.currSubmission.studentName}</h2>
                    <h2><b>Lesson Topic: </b> {this.state.currSubmission.lessonTopic}</h2>
                    <h2><b>Last Message: </b> {this.state.currSubmission.lastMessageText}</h2>
                    {this.state.currSubmission.hasOwnProperty('imageUrls') && this.state.currSubmission.imageUrls.map(item => (<img style={{width: '100%', marginTop: '5vh'}} src={item} alt={'submission-img'}/>))}
                </Modal>}

            </Fragment>
        );
    }
}

export default Submissions;