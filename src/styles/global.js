import {StyleSheet} from 'react-native';

const SPACING_UNIT = 4;

export const globalStyles = StyleSheet.create({
  flex1: {flex: 1},
  wFull: {width: '100%'},
  hFull: {height: '100%'},
  static: {position: 'static'},
  absolute: {position: 'absolute'},
  displayNone: {display: 'none'},
  roundedFull: {borderRadius: 9999},

  //overflow
  overflowHidden: {overflow: 'hidden'},
  overflowScroll: {overflow: 'scroll'},
  overflowVisible: {overflow: 'visible'},

  // Flex Direction
  flexRow: {flexDirection: 'row'},
  flexCol: {flexDirection: 'column'},

  // Justify Content
  justifyCenter: {justifyContent: 'center'},
  justifyStart: {justifyContent: 'flex-start'},
  justifyEnd: {justifyContent: 'flex-end'},
  justifyBetween: {justifyContent: 'space-between'},
  justifyAround: {justifyContent: 'space-around'},
  justifyEvenly: {justifyContent: 'space-evenly'},

  // Align Items
  itemsCenter: {alignItems: 'center'},
  itemsStart: {alignItems: 'flex-start'},
  itemsEnd: {alignItems: 'flex-end'},
  itemsBaseline: {alignItems: 'baseline'},
  itemsStretch: {alignItems: 'stretch'},

  // Align Self
  selfCenter: {alignSelf: 'center'},
  selfStart: {alignSelf: 'flex-start'},
  selfEnd: {alignSelf: 'flex-end'},
  selfAuto: {alignSelf: 'auto'},
  selfStretch: {alignSelf: 'stretch'},

  // Text Align
  textCenter: {textAlign: 'center'},
  textLeft: {textAlign: 'left'},
  textRight: {textAlign: 'right'},
  textJustify: {textAlign: 'justify'},

  // Flex Wrapping
  flexWrap: {flexWrap: 'wrap'},
  flexNoWrap: {flexWrap: 'nowrap'},

  // Flex Grow and Shrink
  flexGrow: {flexGrow: 1},
  flexShrink: {flexShrink: 1},
  flexNone: {flexGrow: 0, flexShrink: 0},

  // Flex Basis
  flexBasisAuto: {flexBasis: 'auto'},
  flexBasisFull: {flexBasis: '100%'},

  //text transform
  uppercase: {textTransform: 'uppercase'},
  lowercase: {textTransform: 'lowercase'},
  capitalize: {textTransform: 'capitalize'},

  // Gap (spacing between items in flex layouts)
  gap1: {gap: SPACING_UNIT * 1},
  gap2: {gap: SPACING_UNIT * 2},
  gap3: {gap: SPACING_UNIT * 3},
  gap4: {gap: SPACING_UNIT * 4},
  gap5: {gap: SPACING_UNIT * 5},

  // Padding (for all sides)
  p1: {padding: SPACING_UNIT * 1},
  p2: {padding: SPACING_UNIT * 2},
  p3: {padding: SPACING_UNIT * 3},
  p4: {padding: SPACING_UNIT * 4},
  p5: {padding: SPACING_UNIT * 5},

  // Padding (individual sides)
  pt1: {paddingTop: SPACING_UNIT * 1},
  pt2: {paddingTop: SPACING_UNIT * 2},
  pt3: {paddingTop: SPACING_UNIT * 3},
  pt4: {paddingTop: SPACING_UNIT * 4},
  pt5: {paddingTop: SPACING_UNIT * 5},

  pr1: {paddingRight: SPACING_UNIT * 1},
  pr2: {paddingRight: SPACING_UNIT * 2},
  pr3: {paddingRight: SPACING_UNIT * 3},
  pr4: {paddingRight: SPACING_UNIT * 4},
  pr5: {paddingRight: SPACING_UNIT * 5},

  pb1: {paddingBottom: SPACING_UNIT * 1},
  pb2: {paddingBottom: SPACING_UNIT * 2},
  pb3: {paddingBottom: SPACING_UNIT * 3},
  pb4: {paddingBottom: SPACING_UNIT * 4},
  pb5: {paddingBottom: SPACING_UNIT * 5},

  pl1: {paddingLeft: SPACING_UNIT * 1},
  pl2: {paddingLeft: SPACING_UNIT * 2},
  pl3: {paddingLeft: SPACING_UNIT * 3},
  pl4: {paddingLeft: SPACING_UNIT * 4},
  pl5: {paddingLeft: SPACING_UNIT * 5},

  // Padding (axis-specific)
  px1: {paddingHorizontal: SPACING_UNIT * 1},
  px2: {paddingHorizontal: SPACING_UNIT * 2},
  px3: {paddingHorizontal: SPACING_UNIT * 3},
  px4: {paddingHorizontal: SPACING_UNIT * 4},
  px5: {paddingHorizontal: SPACING_UNIT * 5},

  py1: {paddingVertical: SPACING_UNIT * 1},
  py2: {paddingVertical: SPACING_UNIT * 2},
  py3: {paddingVertical: SPACING_UNIT * 3},
  py4: {paddingVertical: SPACING_UNIT * 4},
  py5: {paddingVertical: SPACING_UNIT * 5},

  // Margin (for all sides)
  m1: {margin: SPACING_UNIT * 1},
  m2: {margin: SPACING_UNIT * 2},
  m3: {margin: SPACING_UNIT * 3},
  m4: {margin: SPACING_UNIT * 4},
  m5: {margin: SPACING_UNIT * 5},

  // Margin (individual sides)
  mt1: {marginTop: SPACING_UNIT * 1},
  mt2: {marginTop: SPACING_UNIT * 2},
  mt3: {marginTop: SPACING_UNIT * 3},
  mt4: {marginTop: SPACING_UNIT * 4},
  mt5: {marginTop: SPACING_UNIT * 5},

  mr1: {marginRight: SPACING_UNIT * 1},
  mr2: {marginRight: SPACING_UNIT * 2},
  mr3: {marginRight: SPACING_UNIT * 3},
  mr4: {marginRight: SPACING_UNIT * 4},
  mr5: {marginRight: SPACING_UNIT * 5},

  mb1: {marginBottom: SPACING_UNIT * 1},
  mb2: {marginBottom: SPACING_UNIT * 2},
  mb3: {marginBottom: SPACING_UNIT * 3},
  mb4: {marginBottom: SPACING_UNIT * 4},
  mb5: {marginBottom: SPACING_UNIT * 5},

  ml1: {marginLeft: SPACING_UNIT * 1},
  ml2: {marginLeft: SPACING_UNIT * 2},
  ml3: {marginLeft: SPACING_UNIT * 3},
  ml4: {marginLeft: SPACING_UNIT * 4},
  ml5: {marginLeft: SPACING_UNIT * 5},

  // Margin (axis-specific)
  mx1: {marginHorizontal: SPACING_UNIT * 1},
  mx2: {marginHorizontal: SPACING_UNIT * 2},
  mx3: {marginHorizontal: SPACING_UNIT * 3},
  mx4: {marginHorizontal: SPACING_UNIT * 4},
  mx5: {marginHorizontal: SPACING_UNIT * 5},

  my1: {marginVertical: SPACING_UNIT * 1},
  my2: {marginVertical: SPACING_UNIT * 2},
  my3: {marginVertical: SPACING_UNIT * 3},
  my4: {marginVertical: SPACING_UNIT * 4},
  my5: {marginVertical: SPACING_UNIT * 5},
});
