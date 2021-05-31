import React, {Fragment} from 'react';
import firebase from "firebase";
import { Button, Modal, Table, Space } from 'antd';


class Group extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            currGroup: {},
            visible: false,
            visibleCurr: false
        }

        this.deleteGroup = this.deleteGroup.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleCancelCurr = this.handleCancelCurr.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleOkCurr = this.handleOkCurr.bind(this);
        this.showInfo = this.showInfo.bind(this);
    }


    componentDidMount() {
        const groupsRef = firebase.firestore().collection('Group');

        groupsRef
            .get()
            .then((snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("All data in 'groups' collection", data);
                this.setState({
                    groups: data
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

    deleteGroup(id) {
        console.log('id to del', id);
        firebase
            .firestore()
            .collection("Group")
            .doc(id)
            .delete()
            .then(() => console.log("Document deleted")) // Document deleted
            .catch((error) => console.error("Error deleting document", error));

        let newGroups = this.state.groups;
        //newGroups.push({topic: '1', author: '2', condition_ru: '3', condition_ua: '3', condition_url: '3'})
        newGroups = newGroups.filter(item => item.id !== id);
        this.setState({
            groups: newGroups
        });

    }

    showInfo(group) {
        this.setState({
            currGroup: group,
            visibleCurr: true,
        });
    }

    render() {

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Action',
                key: 'action2',
                render: (item) => (
                    <Space size="middle">
                        <Button onClick={() => {this.showInfo(item)}}>Show all info</Button>
                    </Space>
                ),
            },

            {
                title: 'Action',
                key: 'action',
                render: (item) => (
                    <Space size="middle">
                        <Button onClick={() => this.deleteGroup(item.id)}>Delete</Button>
                    </Space>
                ),
            },
        ];


        return (
            <Fragment>
                {/*this.state.groups.map((item, key) =>
                    <div style={{marginTop: '2vh', paddingBottom: '1vh', border: '1px solid black'}}>
                        <h2>{key}. Topic: {item.topic}</h2>
                        <h3>Author: {item.author}</h3>
                        <h3>Condition_ru: {item.condition_ru}</h3>
                        <h3>Condition_ua: {item.condition_ua}</h3>
                        <a href={item.condition_url} target="_blank" rel={'noreferrer'}><Button>condition_url</Button></a>
                        <Button onClick={() => this.deleteGroup(item.id)}>Delete</Button>
                    </div>)*/}


                <Modal title="Add new group" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <form id={'group-form'}>
                        <h1>TODO</h1>
                    </form>
                </Modal>

                {this.state.currGroup && <Modal title={this.state.currGroup.name} visible={this.state.visibleCurr} onOk={this.handleOkCurr} onCancel={this.handleCancelCurr}>

                </Modal>}

                <Table columns={columns} dataSource={this.state.groups} />

                <Button style={{marginTop: '2vh'}} onClick={() => this.showModal()}>Add group</Button>


            </Fragment>
        );
    }
}

export default Group;