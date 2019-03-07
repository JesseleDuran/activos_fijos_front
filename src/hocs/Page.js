import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import HomePage from "../components/pages/PageLayout";
import { getUser } from "../reducers/auth";
import { getError } from "../reducers/UI";

const Page = (settings = {}) => WrappedComponent => {
  	const {
    	// The title of the page
    	title = "",
  	} = settings;

class PageContainer extends Component {
    state = {
    	shouldRender: true,
    };

    renderWrappedComponent = () => {
      	return (
        	<HomePage {...this.props} title={title}>
          		<WrappedComponent {...this.props} />
        	</HomePage>
      	);
    };

    render = () => {
      	return this.renderWrappedComponent();
    };
}

const mapStateToProps = state => ({
    user: getUser(state),
    error: getError(state),
});

return connect(
	mapStateToProps,
    {},
  	)(PageContainer);
};

export default Page;
