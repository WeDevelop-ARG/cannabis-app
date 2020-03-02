import { YellowBox } from 'react-native'

/*
This warning is printed when using `flexWrap` property in `contentContainerStyle` for FlatLists, it's the only way that the flatlist can wrap it's content.
Using numColumns property causes CellRenderer's key to be a concatenation of the renderItems keys, so appending a new element AT THE START OF
THE FLATLIST DATA causes new keys generation and a rerendering of all CellRenderers, which manifest as a flicker on the screen
*/

YellowBox.ignoreWarnings(['Warning: `flexWrap: `wrap`` is not supported with the `VirtualizedList` components.Consider using `numColumns` with `FlatList` instead.'])
