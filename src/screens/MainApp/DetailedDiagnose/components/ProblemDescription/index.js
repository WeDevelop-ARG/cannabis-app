import React from 'react'
import { View } from 'react-native'
import { Title, Description } from '~/components/texts'
import styles from './styles'

const ProblemDescription = ({ description }) => (
  <View style={styles.descriptionContainer}>
    <Title style={styles.title}>Descripción</Title>
    <Description gray>{description}</Description>
  </View>
)

export default ProblemDescription
