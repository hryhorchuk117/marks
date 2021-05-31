import {PageHeader, Button, Drawer} from "antd";
import {UnorderedListOutlined} from '@ant-design/icons';
import './styles.scss';
import {useState} from "react";
import { useHistory } from "react-router-dom";
import {FundOutlined} from '@ant-design/icons'

export const Header = () => {
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const history = useHistory();

    const onClose = () => {
        setIsDrawerVisible(false);
    }

    /*<Button onClick={() => setIsDrawerVisible(true)} style={{float: 'right', marginTop: '-35px',background: '#0093df', border: 'none', boxShadow: 'none'}} key="1" type="primary">
                  <UnorderedListOutlined />
                </Button>,*/
    return <div>
        <PageHeader
            className="site-page-header"
            onBack={() => window.history.back()}
            title={<span style={{cursor: 'pointer'}} onClick={() => history.push('')}>logging.live</span>}
            extra={[
                <Button onClick={() => history.push('/login')} style={{float: 'right', marginTop: '-35px', borderRadius: '10px'}} variant="primary">Увійти як викладач</Button>
            ]}
  />
        <Drawer
            title={"Меню"}
            placement="right"
            closable={false}
            onClose={onClose}
            visible={isDrawerVisible}
          >
            <Button onClick={() => {history.push('login'); setIsDrawerVisible(false)}}>Ввійти як викладач</Button>
          </Drawer>
    </div>
}