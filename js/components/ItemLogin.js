import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	View,
	TextInput,
	Image,
} from 'react-native';
import {connect} from 'react-redux';
import theme from '../constants/theme';
import setting from '../constants/setting';
class ItemInput extends Component {


	render() {
		return (
			<View style={styles.inputWrapper}>
				<Image source={this.props.source}
					style={styles.inlineImg} />
				<TextInput style={styles.input}
					placeholder={this.props.placeholder}
					secureTextEntry={this.props.secureTextEntry}
					autoCorrect={this.props.autoCorrect}
					autoCapitalize={this.props.autoCapitalize}
					returnKeyType={this.props.returnKeyType}
					placeholderTextColor='white'
					underlineColorAndroid='transparent' />
			</View>
		);
	}
}

ItemInput.propTypes = {
	source: PropTypes.number.isRequired,
	placeholder: PropTypes.string.isRequired,
	secureTextEntry: PropTypes.bool,
	autoCorrect: PropTypes.bool,
	autoCapitalize: PropTypes.string,
	returnKeyType: PropTypes.string,
};

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	input: {
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
		width: DEVICE_WIDTH - 40,
		height: 40,
		marginHorizontal: 20,
		paddingLeft: 45,
		borderRadius: 20,
		color: '#fff',
	},
	inputWrapper: {
		flex: 1,
	},
	inlineImg: {
		position: 'absolute',
		zIndex: 99,
		width: 22,
		height: 22,
		left: 35,
		top: 9,
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

export default connect(mapStateToProps)(ItemInput);