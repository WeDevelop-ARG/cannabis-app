import { StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '~/styleMixins'

const styles = StyleSheet.create({
  diagnoseContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 0,
    marginTop: 20,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: 'center'
  },
  answerContainer: {
    marginLeft: 10,
    width: widthPercentageToDP('60%')
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10
  },
  answeredBy: {
    width: widthPercentageToDP('60%'),
    fontWeight: 'bold'
  },
  answerSeparator: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    bottom: heightPercentageToDP('2%')
  },
  answer: {
    width: widthPercentageToDP('70%'),
    paddingRight: widthPercentageToDP('10%'),
    bottom: heightPercentageToDP('2%')
  }
})

export default styles
