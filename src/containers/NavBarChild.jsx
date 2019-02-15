import React from 'react';
import Redirect from "react-router/Redirect";
import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import "bootstrap/dist/css/bootstrap.css";


class NavBarChild extends React.Component {
    constructor(props) {
        super(props);

        this.handleToggle = this.handleToggle.bind(this);

        this.state = {
            activeKey: '1',
            activeMenuIndex: 0,
            activeSubMenuIndex: 0,
            show: false,
        };
        this.onCategoryChange = this.onCategoryChange.bind(this);
    }

    handleToggle() {
        this.setState({ show: !this.state.show });
    }
    onCategoryChange(category) {
        console.log(category);
        this.props.onCategoryChange(category);
    }
    render() {

        let categoryIndex = this.props.categoryIndex;
        // if (this.props.categories) {
            return (
                <Panel key={categoryIndex} eventKey={categoryIndex}>
                    <Panel.Heading>
                        <Panel.Title toggle>{'Heading title 1'}<i className="fa fa-angle-down pull-right"></i></Panel.Title>
                    </Panel.Heading>
                    {
                        <div key={categoryIndex}>
                            <Panel.Body collapsible>

                                {/* {this.props.categories.map((subcategory1, subcategoryIndex1) => */}
                                <PanelGroup key={0} accordion id={"subcategory-sub-bar" + 0} defaultActiveKey="0">

                                    {/* {subcategory1.categories && subcategory1.categories.length > 0 ? */}
                                    <Panel  >
                                        <Panel.Heading>
                                            <Panel.Title toggle>{'Category 1'}<i className="fa fa-angle-down pull-right"></i></Panel.Title>
                                        </Panel.Heading>
                                        <div>
                                            <Panel.Body key={0} collapsible>
                                                {'Test 1'}
                                            </Panel.Body>
                                            <Panel.Body key={1} collapsible>
                                                {'Test 2'}
                                            </Panel.Body>
                                        </div>
                                    </Panel>
                                    {/* :
                                            <Panel>
                                                <div>
                                                    <Panel.Heading>
                                                        <Panel.Title toggle>{subcategory1.categoryName}<i ></i></Panel.Title>
                                                    </Panel.Heading></div></Panel>
                                        } */}

                                </PanelGroup>
                                {/* )} */}
                                <PanelGroup key={0} accordion id={"subcategory-sub-bar" + 0} defaultActiveKey="0">

                                    {/* {subcategory1.categories && subcategory1.categories.length > 0 ? */}
                                    <Panel  >
                                        <Panel.Heading>
                                            <Panel.Title toggle>{'Category 2'}<i className="fa fa-angle-down pull-right"></i></Panel.Title>
                                        </Panel.Heading>
                                        <div>
                                            <Panel.Body key={0} collapsible>
                                                {'Test 3'}
                                            </Panel.Body>
                                            <Panel.Body key={1} collapsible>
                                                {'Test 4'}
                                            </Panel.Body>
                                        </div>
                                    </Panel>
                            
                                </PanelGroup>

                            </Panel.Body>
                        </div>
                    }

                </Panel>
            )
    }

}

export default NavBarChild;