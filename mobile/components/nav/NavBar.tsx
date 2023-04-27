import React, { useState, useRef, ReactNode } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Animated,
} from 'react-native';

type Props = {
    children: ReactNode
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    height: 60,
    backgroundColor: '#f2f2f2',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  navButton: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  menu: {
    backgroundColor: '#f2f2f2',
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  menuItem: {
    padding: 10,
  },
  content: {
    flex: 1,
    marginTop: 60,
  },
});

function NavBar({ children }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuHeight = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    if (isMenuOpen) {
      Animated.timing(menuHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsMenuOpen(false));
    } else {
      setIsMenuOpen(true);
      Animated.timing(menuHeight, {
        toValue: 100,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const menuStyle = {
    height: menuHeight,
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={toggleMenu}>
          <Text style={styles.navButton}>{isMenuOpen ? 'Close' : 'Menu'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {children}
      </View>
      <Animated.View style={[styles.menu, menuStyle]}>
        <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
          <Text>Measure</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
          <Text>Calendar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

export default NavBar;
