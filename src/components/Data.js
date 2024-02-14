const IMAGES = {
    image1: require('../../assets/images/chair.jpg'),
    image2: require('../../assets/images/earthquake.jpg'),
    image3: require('../../assets/images/drugs.jpg'),
    image4: require('../../assets/images/hunger.jpg'),
    image5: require('../../assets/images/hunger.jpg'),
    image6: require('../../assets/images/hunger.jpg'),
  };
  
  const list = [
    {
      id: '0',
      image: IMAGES.image1,
      title: 'Wooden Dining Table Set',
      category: 'social',
      description: 'Solid wood dining table set with four chairs. Beautiful craftsmanship. Perfect for family meals or entertaining guests.',
      status: 'Available',
    },
    {
      id: '1',
      image: IMAGES.image2,
      title: 'Helping Earthquake Victims',
      category: 'social',
      description: 'Solid wood dining table set with four chairs.Beautiful craftsmanship.Perfect for family meals or entertaining guests.',
      status: 'Available'
    },
    {
      id: '3',
      image: IMAGES.image3,
      title: 'Say No to Drugs',
      category: 'medical',
      description: 'Solid wood dining table set with four chairs.Beautiful craftsmanship.Perfect for family meals or entertaining guests.',
      status: 'Pending'
    },
    {
      id: '4',
      image: IMAGES.image4,
      title: 'Hunger People',
      category: 'disaster',
      description: 'Solid wood dining table set with four chairs.Beautiful craftsmanship.Perfect for family meals or entertaining guests.',
      status: 'Pending'
    },
    {
      id: '5',
      image: IMAGES.image5,
      title: 'Help Cayna Brain Cancer Surgery',
      category: 'humaninty',
      description: 'Solid wood dining table set with four chairs.Beautiful craftsmanship.Perfect for family meals or entertaining guests.',
      status: 'Pending'
    },
    {
      id: '6',
      image: IMAGES.image6,
      title: 'Help Cayna Brain Cancer Surgery',
      category: 'humaninty',
      description: 'Solid wood dining table set with four chairs.Beautiful craftsmanship.Perfect for family meals or entertaining guests.',
      status: 'Pending'
    },
    {
      id: '7',
      image: IMAGES.image6,
      title: 'Help Cayna Brain Cancer Surgery',
      category: 'education',
      description: 'Solid wood dining table set with four chairs.Beautiful craftsmanship.Perfect for family meals or entertaining guests.',
      status: 'Donated'
    },
    {
      id: '8',
      image: IMAGES.image6,
      title: 'Help Cayna Brain Cancer Surgery',
      category: 'education',
      description: 'Solid wood dining table set with four chairs.Beautiful craftsmanship.Perfect for family meals or entertaining guests.',
      status: 'Donated'
    },
  ];

  const categoryImages = {
    image1: require('../../assets/images/awareness.png'),
    image2: require('../../assets/images/medical.png'),
    image3: require('../../assets/images/world.png'),
    image4: require('../../assets/images/icon1.png'),
    image5: require('../../assets/images/education.png'),
  };
  
  
  const categories = [
    {
      id: "0",
      image: categoryImages.image1,
      name: "Social",
      backgroundColor: "#E1F3E6"
    },
    {
      id: "1",
      image: categoryImages.image2,
      name: "Medical",
      backgroundColor: "#DEECF1"
    },
    {
      id: "3",
      image: categoryImages.image3,
      name: "Disaster",
      backgroundColor: "#ede8e3"
    },
    {
      id: "4",
      image: categoryImages.image4,
      name: "Humaninty",
      backgroundColor: "#edeaf9"
    },
    {
      id: "5",
      image: categoryImages.image5,
      name: "Education",
      backgroundColor: "#EBF2D2"
    },
  ];

  const slides = [
    require('../../assets/images/carousel_4.jpg'),
    require('../../assets/images/carousel_1.jpg'),
    require('../../assets/images/carousel_2.jpg'),
    require('../../assets/images/carousel_3.jpg'),
  ];

 const moneyIcon ={
  price : require('../../assets/images/rupee.png'),
  priceIcon : require('../../assets/images/rupeeIcon.png'),
 }

 const imageGallery = [
  {
    id: '0',
    uri: 'https://plus.unsplash.com/premium_photo-1663127861345-cd4a2e05591f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8b2xkJTIwb2JqZWN0c3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '1',
    uri: 'https://images.unsplash.com/photo-1533654294186-c1752ef9a0b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D',
  },
  {
    id: '3',
    uri: 'https://plus.unsplash.com/premium_photo-1681825213276-865b5f7db0bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8',
  },
  {
    id: '4',
    uri: 'https://images.unsplash.com/photo-1585521551385-0e1671d7c7e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8',
    // imageNo: '4/4'
  },
  {
    id: '5',
    uri: 'https://images.unsplash.com/photo-1585521551385-0e1671d7c7e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8',
    // imageNo: '4/4'
  },
  
];
  export { IMAGES, list, slides, moneyIcon, imageGallery,categories};
  