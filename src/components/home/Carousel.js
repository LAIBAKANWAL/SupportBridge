import React, { useState, useRef, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions, Image, ScrollView, FlatList } from 'react-native';
import COLORS from '../../../constants/Colors';
import SIZES from '../../../constants/Sizes';
import { slides } from '../Data';

// const { width, height } = Dimensions.get('window');
const Screen_width = Dimensions.get('window').width;


const Carousel = () => {

  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offset / Screen_width);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      if (scrollViewRef.current) {
       
        scrollViewRef.current.scrollTo({
          x: nextIndex * Screen_width,
          animated: true,
        });
      
      }
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => {
      
      clearInterval(scrollInterval);

    };
  }, [currentIndex]);

  return (
    <SafeAreaView style={styles.container}>
    
          <View style={styles.carouselContainer}>
            <ScrollView
              ref={scrollViewRef}
              // onScroll={onChange}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              horizontal
              style={styles.wrap}
              snapToInterval={Screen_width}
              snapToAlignment='center'
              decelerationRate={'fast'}
              onScroll={handleScroll}
              scrollEventThrottle={0}
            >
              {slides.map((slide, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image
                    resizeMode="stretch"
                    style={styles.image}
                    source={slide}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  {
                    backgroundColor: index === currentIndex ? COLORS.primary : COLORS.white,
                  },
                ]}
              />
            ))}
          </View>
      

    </SafeAreaView>
  );
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: SIZES.small,
  },
  carouselContainer: {
    width: '100%',
    // height: height * 0.28,
    height: Screen_width - 150,
    borderRadius: 20,
    overflow: 'hidden',
  },
  wrap: {
    width: '100%',
  },
  imageContainer: {
    flex: 1,
    width: Screen_width,
  },
  image: {
    flex: 1,
    width: '100%',
  },
  pagination: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
});


export default Carousel;

