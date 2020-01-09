import React from 'react'
import { Svg, Path } from 'react-native-svg'

const NewsTabSVG = ({ tintColor }) => (
  <Svg width='28' height='23' viewBox='0 0 28 23' fill='none'>
    <Path d='M1.80469 15.1016L5.97266 12.6953C6.14453 13.082 6.40234 13.4688 6.74609 13.8555L2.49219 16.3047C2.40625 16.3906 2.32031 16.3906 2.23438 16.3477C2.14844 16.3477 2.0625 16.2617 2.01953 16.1758L1.67578 15.5742C1.58984 15.4883 1.58984 15.4023 1.63281 15.3164C1.63281 15.2305 1.71875 15.1875 1.80469 15.1016ZM4.8125 8.3125C4.8125 8.82812 4.85547 9.30078 4.94141 9.6875H0.34375C0.257812 9.6875 0.171875 9.6875 0.0859375 9.60156C0 9.51562 0 9.42969 0 9.34375V8.65625C0 8.57031 0 8.52734 0.0859375 8.44141C0.171875 8.35547 0.257812 8.3125 0.34375 8.3125H4.8125ZM1.80469 2.89844C1.71875 2.85547 1.63281 2.76953 1.63281 2.68359C1.58984 2.59766 1.58984 2.51172 1.67578 2.42578L2.01953 1.82422C2.0625 1.73828 2.14844 1.69531 2.23438 1.65234C2.32031 1.65234 2.40625 1.65234 2.49219 1.69531L6.05859 3.75781C5.80078 4.1875 5.62891 4.57422 5.45703 5.00391L1.80469 2.89844ZM25.6953 2.89844L22.043 5.00391C21.8711 4.57422 21.6562 4.1875 21.4414 3.75781L25.0078 1.69531C25.0938 1.65234 25.1797 1.65234 25.2656 1.65234C25.3516 1.69531 25.3945 1.73828 25.4805 1.82422L25.8242 2.42578C25.8672 2.51172 25.8672 2.59766 25.8672 2.68359C25.8242 2.76953 25.7812 2.85547 25.6953 2.89844ZM27.1562 8.3125C27.2422 8.3125 27.2852 8.35547 27.3711 8.44141C27.457 8.52734 27.5 8.57031 27.5 8.65625V9.34375C27.5 9.42969 27.457 9.51562 27.3711 9.60156C27.2852 9.6875 27.2422 9.6875 27.1562 9.6875H22.5586C22.6445 9.17188 22.6875 8.69922 22.6875 8.3125H27.1562ZM25.6953 15.1016C25.7812 15.1875 25.8242 15.2305 25.8672 15.3164C25.8672 15.4023 25.8672 15.4883 25.8242 15.5742L25.4805 16.1758C25.3945 16.2617 25.3516 16.3477 25.2656 16.3477C25.1797 16.3906 25.0938 16.3906 25.0078 16.3047L20.7539 13.8125C21.0547 13.4258 21.3125 13.0391 21.5273 12.6953L25.6953 15.1016ZM13.75 3.5C13.9219 3.5 14.0938 3.58594 14.2227 3.71484C14.3516 3.84375 14.4375 4.01562 14.4375 4.1875C14.4375 4.40234 14.3516 4.57422 14.2227 4.70312C14.0938 4.83203 13.9219 4.875 13.75 4.875C12.8047 4.875 11.9883 5.21875 11.3008 5.90625C10.6133 6.59375 10.3125 7.36719 10.3125 8.3125C10.3125 8.52734 10.2266 8.69922 10.0977 8.82812C9.96875 8.95703 9.79688 9 9.625 9C9.41016 9 9.23828 8.95703 9.10938 8.82812C8.98047 8.69922 8.9375 8.52734 8.9375 8.3125C8.9375 7.45312 9.15234 6.67969 9.58203 5.90625C10.0117 5.17578 10.5703 4.57422 11.3438 4.14453C12.0742 3.71484 12.8906 3.5 13.75 3.5ZM13.75 0.75C15.125 0.75 16.3711 1.09375 17.5312 1.78125C18.6914 2.46875 19.5938 3.37109 20.2812 4.53125C20.9688 5.69141 21.3125 6.9375 21.3125 8.3125C21.3125 9.25781 21.1406 10.1602 20.7969 11.0195C20.4531 11.8789 20.0234 12.6094 19.4219 13.2969C18.9062 13.8984 18.3906 14.6289 17.9609 15.4883C17.4883 16.3047 17.2305 16.9062 17.1875 17.25V20.4727C17.1875 20.6445 17.1445 20.7734 17.0586 20.8594L16.0273 22.4492C15.8555 22.6641 15.6836 22.75 15.4258 22.75H12.0742C11.8164 22.75 11.6016 22.6641 11.4727 22.4492L10.4414 20.8594C10.3555 20.7734 10.3125 20.6445 10.3125 20.4727V17.25C10.2266 16.9062 10.0117 16.3477 9.58203 15.4883C9.06641 14.6289 8.59375 13.8984 8.07812 13.2969C7.47656 12.6094 7.00391 11.8789 6.66016 11.0195C6.31641 10.1602 6.1875 9.25781 6.1875 8.3125C6.1875 7.02344 6.48828 5.77734 7.13281 4.61719C7.77734 3.45703 8.67969 2.51172 9.83984 1.82422C11 1.13672 12.2891 0.75 13.75 0.75ZM15.8125 20.2578V20H11.6875V20.2578L12.418 21.375H15.082L15.8125 20.2578ZM15.8125 18.625V17.25H11.6875V18.625H15.8125ZM18.3906 12.3945C18.9062 11.8359 19.293 11.1914 19.5508 10.5039C19.8086 9.81641 19.9375 9.08594 19.9375 8.3125C19.9375 7.19531 19.6367 6.16406 19.0781 5.21875C18.5195 4.27344 17.7891 3.54297 16.8438 2.98438C15.8984 2.42578 14.8242 2.125 13.707 2.125C12.5469 2.125 11.5156 2.42578 10.5703 2.98438C9.625 3.54297 8.85156 4.31641 8.33594 5.26172C7.82031 6.20703 7.5625 7.23828 7.5625 8.3125C7.5625 9.85938 8.07812 11.2344 9.10938 12.3945C9.45312 12.7812 9.79688 13.2539 10.1836 13.8555C10.6133 14.543 10.957 15.2305 11.2578 15.875H16.2422C16.5 15.2305 16.8867 14.543 17.3164 13.8555C17.6602 13.2539 18.0469 12.7812 18.3906 12.3945Z' fill={tintColor} />
  </Svg>
)

export default NewsTabSVG
