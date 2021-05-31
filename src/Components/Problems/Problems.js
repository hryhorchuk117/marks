import React, {Fragment} from 'react';
import firebase from "firebase";
import { Button, Modal, Table, Tag, Space } from 'antd';


class Problems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problems: [],
            visible: false
        }

        this.deleteProblem = this.deleteProblem.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }


    componentDidMount() {
        const problemsRef = firebase.firestore().collection('Tasks');

        problemsRef
            .get()
            .then((snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("All data in 'problems' collection", data);
                this.setState({
                    problems: data
                });
            });
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = () => {
        console.log(document.getElementById('problem-topic'));
        let addItem = {
            topic: document.getElementById('problem-topic').value,
            author: document.getElementById('problem-author').value,
            condition_ru: document.getElementById('problem-condition_ru').value,
            condition_ua: document.getElementById('problem-condition_ua').value,
            condition_url: document.getElementById('problem-condition_url').value,
        }

        firebase
            .firestore()
            .collection("Tasks")
            .add(addItem)
            .then((ref) => {
                console.log("Added doc with ID: ", ref.id);
            });
        let newProblems = this.state.problems;
        document.getElementById('problem-topic').value = '';
        document.getElementById('problem-author').value = '';
        document.getElementById('problem-condition_ru').value = '';
        document.getElementById('problem-condition_ua').value = '';
        document.getElementById('problem-condition_url').value = '';
        newProblems.push(addItem);
        newProblems = newProblems.filter(item => item.id !== 'id');
        this.setState({
            problems: newProblems,
            visible: false,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };

    deleteProblem(id) {
        console.log('id to del', id);
        firebase
            .firestore()
            .collection("Tasks")
            .doc(id)
            .delete()
            .then(() => console.log("Document deleted")) // Document deleted
            .catch((error) => console.error("Error deleting document", error));

        let newProblems = this.state.problems;
        //newProblems.push({topic: '1', author: '2', condition_ru: '3', condition_ua: '3', condition_url: '3'})
        newProblems = newProblems.filter(item => item.id !== id);
        this.setState({
            problems: newProblems
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
                title: 'Author',
                dataIndex: 'author',
                key: 'author',
            },
            {
                title: 'Condition',
                dataIndex: 'condition_ru',
                key: 'condition_ru',
            },

            {
                title: 'Action',
                key: 'action',
                render: (item) => (
                    <Space size="middle">
                        <Button onClick={() => this.deleteProblem(item.id)}>Delete</Button>
                    </Space>
                ),
            },
        ];


        return (
            <Fragment>
                {/*this.state.problems.map((item, key) =>
                    <div style={{marginTop: '2vh', paddingBottom: '1vh', border: '1px solid black'}}>
                        <h2>{key}. Topic: {item.topic}</h2>
                        <h3>Author: {item.author}</h3>
                        <h3>Condition_ru: {item.condition_ru}</h3>
                        <h3>Condition_ua: {item.condition_ua}</h3>
                        <a href={item.condition_url} target="_blank" rel={'noreferrer'}><Button>condition_url</Button></a>
                        <Button onClick={() => this.deleteProblem(item.id)}>Delete</Button>
                    </div>)*/}


                <Modal title="Add new problem" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <form id={'problem-form'}>
                        <input className={'ant-input'} id={'problem-topic'} placeholder="Topic" style={{marginTop: '2vh'}}/>
                        <input className={'ant-input'} id={'problem-author'} placeholder="Author" style={{marginTop: '2vh'}}/>
                        <input className={'ant-input'} id={'problem-condition_ru'} placeholder="Condition_ru" style={{marginTop: '2vh'}}/>
                        <input className={'ant-input'} id={'problem-condition_ua'} placeholder="Condition_ua" style={{marginTop: '2vh'}}/>
                        <input className={'ant-input'} id={'problem-condition_url'} placeholder="Condition_url" style={{marginTop: '2vh'}}/>
                    </form>
                </Modal>

                <Table columns={columns} dataSource={this.state.problems} />

                <Button style={{marginTop: '2vh'}} onClick={() => this.showModal()}>Add problem</Button>


            </Fragment>
        );
    }
}

export default Problems;