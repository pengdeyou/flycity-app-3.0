import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {StyleSheet, View, Text,TextInput, Image,KeyboardAvoidingView, TouchableHighlight,TouchableOpacity, Alert} from 'react-native';
import {connect} from 'react-redux';
import theme from '../constants/theme';
import setting from '../constants/setting';
import ItemLogin from '../components/ItemLogin';
import usernameImg from '../assets/images/username.png';
import passwordImg from '../assets/images/password.png';
import eyeImg  from '../assets/images/eye_black.png';

class LoginForm extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
			showPass: true,
			press: false,
		};
		this.showPass = this.showPass.bind(this);
	}

	showPass() {
      this.state.press === false ? this.setState({ showPass: false, press: true }) :this.setState({ showPass: true, press: false });
    }

	render() {
		return (
			<KeyboardAvoidingView behavior='padding'
				style={styles.container}>
			<ItemLogin source={usernameImg}
				placeholder='账号/手机号/邮箱'
				autoCapitalize={'none'}
				returnKeyType={'done'}
				autoCorrect={false} />
			<ItemLogin source={passwordImg}
				secureTextEntry={this.state.showPass}
				placeholder='密码'
				returnKeyType={'done'}
				autoCapitalize={'none'}
				autoCorrect={false} />
				<TouchableOpacity
					activeOpacity={0.7}
					style={styles.btnEye}
					onPress={this.showPass}
				>
					<Image source={eyeImg} style={styles.iconEye} />
				</TouchableOpacity>


			</KeyboardAvoidingView>
		);
	}
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	btnEye: {
    	position: 'absolute',
    	top: 65,
    	right: 38,
	},
	  iconEye: {
		width: 25,
		height: 25,
		tintColor: 'rgba(0,0,0,0.2)',
	  },
});
const mapStateToProps = (state) => {
	return {
		pageBackgroundColor: state.SettingReducer.colorScheme.pageBackgroundColor,
		segmentColor: state.SettingReducer.colorScheme.segmentColor,
		titleColor: state.SettingReducer.colorScheme.titleColor,
		subTitleColor: state.SettingReducer.colorScheme.subTitleColor,
		rowItemBackgroundColor: state.SettingReducer.colorScheme.rowItemBackgroundColor,
		arrowColor: state.SettingReducer.colorScheme.arrowColor,
		tabIconColor: state.SettingReducer.colorScheme.tabIconColor
	}
}

export default connect(mapStateToProps)(LoginForm);