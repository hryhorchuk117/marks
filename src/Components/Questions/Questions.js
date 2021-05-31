import React, {Fragment} from 'react';
import firebase from "firebase";
import { Button, Modal, Table, Space } from 'antd';


class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            currQuestion: {},
            visible: false
        }

        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.showInfo = this.showInfo.bind(this);
    }


    componentDidMount() {
        const questionsRef = firebase.firestore().collection('Questions');

        questionsRef
            .get()
            .then((snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("All data in 'questions' collection", data);
                this.setState({
                    questions: data
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

    showInfo(group) {
        this.setState({
            currQuestion: group,
            visible: true,
        });
    }

    deleteQuestion(id) {
        console.log('id to del', id);
        firebase
            .firestore()
            .collection("Questions")
            .doc(id)
            .delete()
            .then(() => console.log("Document deleted")) // Document deleted
            .catch((error) => console.error("Error deleting document", error));

        let newQuestions = this.state.questions;
        //newQuestions.push({topic: '1', author: '2', condition_ru: '3', condition_ua: '3', condition_url: '3'})
        newQuestions = newQuestions.filter(item => item.id !== id);
        this.setState({
            questions: newQuestions
        });

    }

    render() {

        const columns = [
            {
                title: 'Topic',
                dataIndex: 'topic',
                key: 'topic',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Lesson Topic',
                dataIndex: 'lessonTopic',
                key: 'lessonTopic',
            },
            {
                title: 'Student Name',
                dataIndex: 'studentName',
                key: 'studentName',
            },
            {
                title: 'Group Name',
                dataIndex: 'studentGroupName',
                key: 'studentGroupName',
            },

            {
                title: 'Actions',
                key: 'action',
                render: (item) => (
                    <Space size="middle">
                        <Button onClick={() => this.deleteQuestion(item.id)}>Delete</Button>
                        <Button onClick={() => this.showInfo(item)}>Show all info</Button>
                    </Space>
                ),
            },
        ];


        return (
            <Fragment>
                {/*this.state.questions.map((item, key) =>
                    <div style={{marginTop: '2vh', paddingBottom: '1vh', border: '1px solid black'}}>
                        <h2>{key}. Topic: {item.topic}</h2>
                        <h3>Author: {item.author}</h3>
                        <h3>Condition_ru: {item.condition_ru}</h3>
                        <h3>Condition_ua: {item.condition_ua}</h3>
                        <a href={item.condition_url} target="_blank" rel={'noreferrer'}><Button>condition_url</Button></a>
                        <Button onClick={() => this.deleteQuestion(item.id)}>Delete</Button>
                    </div>)*/}


                <Table columns={columns} dataSource={this.state.questions} />

                {this.state.currQuestion && <Modal title={this.state.currQuestion.studentName} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    {console.log(this.state.currQuestion)}
                    <h2><b>Group Name: </b> {this.state.currQuestion.groupName}</h2>
                    <h2><b>Student: </b> {this.state.currQuestion.studentName}</h2>
                    <h2><b>Lesson Topic: </b> {this.state.currQuestion.lessonTopic}</h2>
                    <h2><b>Topic: </b> {this.state.currQuestion.topic}</h2>
                    <h2><b>Last Message: </b> {this.state.currQuestion.lastMessage}</h2>
                </Modal>}


            </Fragment>
        );
    }
}

export default Questions;