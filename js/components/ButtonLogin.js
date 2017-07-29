import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	TouchableOpacity,
	Text,
	Animated,
	Easing,
	Image,
	Alert,
	View,
} from 'react-native';

import {connect} from 'react-redux';
import theme from '../constants/theme';
import setting from '../constants/setting';
import spinner from '../assets/images/loading.gif';
import UserIndex from '../containers/UserIndex';


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 50;

class ButtonPrimary extends Component {
	static propTypes = {
        btnIcon: PropTypes.string,
        btnText: PropTypes.string,
        btnPress: PropTypes.func
    };
	constructor(props){
		super(props)

		this.state = {
			isLoading: false,
		};

		this.buttonAnimated = new Animated.Value(0);
		this.growAnimated = new Animated.Value(0);
		this._onPress = this._onPress.bind(this);
	}
	_switchPage(component){
		this.props.navigator.push({
			component: component
		});
	}
	_onPress() {
		const { btnIcon, btnText, btnPress} = this.props;
		if (this.state.isLoading) return;

		this.setState({ isLoading: true });
		Animated.timing(
			this.buttonAnimated,
			{
				toValue: 1,
				duration: 200,
				easing: Easing.linear
			}
		).start();

		setTimeout(() => {
			this._onGrow();
		}, 2000);

		setTimeout(() => {
			//this._switchPage(UserIndex);
			this.setState({ isLoading: false });
			this.buttonAnimated.setValue(0);
			this.growAnimated.setValue(0);
		}, 2300);
	}

	_onGrow() {
		Animated.timing(
			this.growAnimated,
			{
				toValue: 1,
				duration: 200,
				easing: Easing.linear
			}
		).start();
	}

	render() {
		const changeWidth = this.buttonAnimated.interpolate({
	    inputRange: [0, 1],
	    outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
	  });
	  const changeScale = this.growAnimated.interpolate({
	    inputRange: [0, 1],
	    outputRange: [1, MARGIN]
	  });
		const { btnIcon, btnText, btnPress} = this.props;
		return (
			<View style={styles.container}>
				<Animated.View style={{width: changeWidth}}>
					<TouchableOpacity style={styles.button}
						onPress={btnPress}
						activeOpacity={1} >
							{this.state.isLoading ?
								<Image source={spinner} style={styles.image} />
								:
								<Text style={styles.text}>{btnText}</Text>
							}
					</TouchableOpacity>
					<Animated.View style={[ styles.circle, {transform: [{scale: changeScale}]} ]} />
				</Animated.View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		top:5,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F035E0',
		height: MARGIN,
		borderRadius: 30,
		zIndex: 100,
	},
	circle: {
		height: MARGIN,
		width: MARGIN,
		marginTop: -MARGIN,
		borderWidth: 1,
		borderColor: '#F035E0',
		borderRadius: 100,
		alignSelf: 'center',
		zIndex: 99,
		backgroundColor: '#F035E0',
	},
	text: {
		color: 'white',
		backgroundColor: 'transparent',
	},
	image: {
		width: 24,
		height: 24,
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
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};
export default connect(mapStateToProps)(ButtonPrimary);