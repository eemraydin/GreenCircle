import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ProgressBarAndroid,
  Dimensions,
} from "react-native";
import { getAllCollections } from "../../services/collectionsAPI";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCard from "../../components/journey&impact/Impact";
import Heading from "../../components/texts/Heading";
import SubHeading from "../../components/texts/SubHeading";
import Text from "../../components/texts/Text";

import iconPlastic from "../../assets/icons/impact/Plastic.png";
import iconGlass from "../../assets/icons/impact/Glass.png";
import iconMetal from "../../assets/icons/impact/Metal.png";
import iconPaper from "../../assets/icons/impact/Paper.png";
import iconTobacco from "../../assets/icons/impact/Tobacco.png";
import iconFabric from "../../assets/icons/impact/Fabric.png";

import blooming from "../../assets/icons/journey/Blooming.png";
import evergreen from "../../assets/icons/journey/Evergreen.png";
import forest from "../../assets/icons/journey/Forest.png";
import sapling from "../../assets/icons/journey/Sapling.png";
import seedling from "../../assets/icons/journey/Seedling.png";

import arrow from "../../assets/icons/iconsAchivements/arrow.png";
import arrowOdd from "../../assets/icons/iconsAchivements/arrowOdd.png";
import look from "../../assets/icons/iconsAchivements/look.png";

import { AnimatedCircularProgress } from "react-native-circular-progress";

import { format, parseISO } from "date-fns";
import { Bar } from "react-native-progress";
import ProgressBar from "react-native-progress/Bar";

import { Link } from "expo-router";
import { getAllEvents } from "../../services/eventsAPI";

import one from "../../assets/lottie/01_Seedling 1.png";
import two from "../../assets/lottie/02_Seedling 2.png";
import three from "../../assets/lottie/03_Seedling 3.png";
import four from "../../assets/lottie/04_Sapling 1.png";
import five from "../../assets/lottie/05_Sapling 2.png";
import six from "../../assets/lottie/06_Sapling 3.png";
import seven from "../../assets/lottie/07_Blooming 1.png";
import eight from "../../assets/lottie/08_Blooming 2.png";
import nine from "../../assets/lottie/09_Blooming 3.png";
import ten from "../../assets/lottie/10_Forest 1.png";
import eleven from "../../assets/lottie/11_Forest 2.png";
import twelve from "../../assets/lottie/12_Forest 3.png";
import thirteen from "../../assets/lottie/13_Evergreen 1.png";
import fourteen from "../../assets/lottie/14_Evergreen 2.png";
import fifteen from "../../assets/lottie/15_Evergreeen 3.png";



const JourneyCard = ({ allCollect }) => {
  const getCardStatus = (level, cleanups) => {
    const requiredCleanups = (level + 1) * 3;
    if (cleanups >= requiredCleanups) {
      return {
        image: levelImages[level],
        text: `Earned on ${earnedTexts[level]}`,
        earnedOn: getEarnedDate(level + 2),
        completed: true,
      };
    } else {
      return {
        image: levelImages[level],
        text: `Need ${requiredCleanups - cleanups} more cleanups to ${
          journeyStages[level]
        }`,
        earnedOn: "-",
        completed: false,
      };
    }
  };

  const getCardStatus2 = (level, cleanups) => {
    const requiredCleanups = (level) * 3;
    if (cleanups >= requiredCleanups) {
      return {
        image: levelImages[level],
        text: `Earned on ${earnedTexts[level]}`,
        earnedOn: getEarnedDate(level + 2),
        completed: true
      };
    } else {
      return {
        image: levelImages[level],
        text: `Need ${requiredCleanups - cleanups} more cleanups to ${journeyStages[level]}`,
        earnedOn: '-',
        completed: false
      };
    }
  };


  const getEarnedDate = (level) => {
    const foundDate = allCollect.eventDatesWithSequence.find(
      (item) => item.sequence === level
    );
    return foundDate ? `Earned on ${formatDate(foundDate.dateOfEvent)}` : "-";
  };

  const formatDate = (dateString) => {
    try {
      const date = parseISO(dateString);
      const formattedDate = format(date, "MMM do, yyyy");
      return formattedDate;
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return "Invalid date";
    }
  };

  const levelImages = [seedling, sapling, blooming, forest, evergreen];
  const journeyStages = [
    "Seedling",
    "Sapling",
    "Blooming",
    "Forest",
    "Evergreen",
  ];

  const createdAtDates = allCollect.collections
    ? allCollect.collections.map((item) => item.createdAt)
    : [];
  const earnedTexts = createdAtDates.map((date) => formatDate(date));

  const levelsNotCom = [];
  [0, 1, 2, 3, 4].forEach((level) => {
    const status = getCardStatus(level, allCollect.totalEventCount);
    if (!status.completed) {
      levelsNotCom.push(journeyStages[level].toLowerCase());
    }
  });
  console.log("Niveles no completados:", levelsNotCom);
  let actualLevel = levelsNotCom[0];
  console.log("Nivel actual:", actualLevel);

  const levelImages2 = {
    seedling: seedling,
    sapling: sapling,
    blooming: blooming,
    forest: forest,
    evergreen: evergreen,
  };

  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!startAnimation) {
    return null;
  }

  const actualLevelCapitalized =
    actualLevel.charAt(0).toUpperCase() + actualLevel.slice(1);
  const index = journeyStages.findIndex(
    (stage) => stage === actualLevelCapitalized
  );
  console.log("Index:", index);
  let actualLevelImage = levelImages2[actualLevel];

  const fill = (allCollect.totalEventCount / 15) * 100;
  console.log("Fill:", fill);
  const arrAllCollect = Math.floor(allCollect.totalEventCount / 3);
  const extra = allCollect.totalEventCount % 3;

  console.log("ArrAllCollect:", arrAllCollect);
  console.log("Extra:", extra);
  const resultArray = Array.from({ length: arrAllCollect }, () => 3);

  resultArray.push(extra);
  for (let i = 0; i < 5; i++) {
    resultArray.push(0);
  }

  let totalEventCount = resultArray.reduce((acc, curr) => acc + curr, 0);
  console.log("TotalEventCount:", totalEventCount);
  console.log("Resultado:", resultArray);
  const modifiedArray = resultArray.map((value) => (value / 3) * 100);

  console.log("Resultado modificado:", modifiedArray);

  // let totalEventCount = 15;
  let EventAnim = null;

  switch (totalEventCount) {
    case 1:
      EventAnim = one;
      break;
    case 2:
      EventAnim = two;
      break;
    case 3:
      EventAnim = three;
      break;
    case 4:
      EventAnim = four;
      break;
    case 5:
      EventAnim = five;
      break;
    case 6:
      EventAnim = six;
      break;
    case 7:
      EventAnim = seven;
      break;
    case 8:
      EventAnim = eight;
      break;
    case 9:
      EventAnim = nine;
      break;
    case 10:
      EventAnim = ten;
      break;
    case 11:
      EventAnim = eleven;
      break;
    case 12:
      EventAnim = twelve;
      break;
    case 13:
      EventAnim = thirteen;
      break;
    case 14:
      EventAnim = fourteen;
      break;
    case 15:
      EventAnim = fifteen;
      break;
    default:
      EventAnim = one;
  }


  return (
    <View style={styles.container}>
      <View style={styles.mainProgressBarCir}>
        <AnimatedCircularProgress
          size={280}
          width={16}
          fill={modifiedArray[index]}
          tintColor="#005435"
          onAnimationComplete={() => console.log("onAnimationComplete")}
          backgroundColor="#d9d9d9"
          lineCap="round"
          arcSweepAngle={360}
          rotation={0}
        >
          {() => (
            <View style={styles.mainLEvel}>
              <Image
                source={EventAnim}
                style={{ width: 160, height: 160 }}
                resizeMode="contain"
              ></Image>
              <SubHeading
                className="text-xl text-primary"
                style={styles.mainLEvelText}
              >
                {actualLevel.charAt(0).toUpperCase() + actualLevel.slice(1)}
              </SubHeading>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
      <View style={styles.textContainer}>
        <Heading
          className="color-black"
          style={[styles.heading, styles.leftText]}
        >
          Your Journey
        </Heading>
        <Link href="/cleanUpHistory/Clean History">
          <Text
            className="text-14"
            style={[styles.cleanupHistory, styles.rightText]}
          >
            View Cleanup History
          </Text>
        </Link>
      </View>
      <SubHeading className="text-2xl" style={styles.textJournayTotal}>
        You have done {allCollect.totalEventCount} cleanups!
      </SubHeading>
      {/* <ProgressBarAndroid
        styleAttr="Horizontal"
        indeterminate={false}
        progress={allCollect.totalEventCount / 15}
      /> */}
      {/* <Bar
        progress={allCollect.totalEventCount / 15}
        width={200} // Establece un ancho fijo para la prueba
        indeterminate={false}
        borderWidth={2}
        borderRadius={4}
        color="blue"
        unfilledColor="gray"
      /> */}
      <View style={styles.containerProgr}>
        <View style={styles.progressBarContainer}>
          {/* <ProgressBar
            progress={allCollect.totalEventCount / 15}
            width={200}
            height={12}
            color='#20603C'
            unfilledColor='#D9D9D9'
            borderWidth={0}
            borderRadius={8}
          /> */}
          {Array.from({ length: 15 }).map((_, index) => {
            const sumResultArray = resultArray.reduce(
              (acc, curr) => acc + curr,
              0
            );
            const isActive = index < sumResultArray;
            return (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  isActive ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            );
          })}
          <Text className="text-right" style={styles.textJournayProgres}>
            {" "}
            {allCollect.totalEventCount}/15 cleanups
          </Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        {[0, 1, 2, 3, 4].map(level => {
          const status = getCardStatus2(level, allCollect.totalEventCount);
          const status2 = getCardStatus(level, allCollect.totalEventCount);
          console.log("Status:", status); 
          return (
            <View
              key={level}
              style={[
                styles.cardJour,
                status.completed
                  ? styles.cardJourCompleted
                  : styles.cardJourInactive,
              ]}
            >
              <View style={styles.leftCol}>
                <AnimatedCircularProgress
                  size={130}
                  width={7}
                  fill={modifiedArray[level]}
                  tintColor="#005435"
                  onAnimationComplete={() => console.log("onAnimationComplete")}
                  backgroundColor="#e6e6e6"
                  lineCap="round"
                  arcSweepAngle={360}
                  rotation={0}
                >
                  {() => <Image source={status.image} style={styles.image} />}
                </AnimatedCircularProgress>
              </View>
              <View style={styles.rightCol}>
                <Heading>{journeyStages[level]}</Heading>
                {status.completed && (
                  <View style={styles.completedbox}>
                    {status.completed && (
                      <Text
                        className="text-10 text-center"
                        style={styles.completedText}
                      >
                        Completed!
                      </Text>
                    )}
                  </View>
                )}
                <Text className="text-xs text-right" style={styles.earnedate}>
                  {status.text}
                </Text>
              </View>
              {!status.completed && (
                <Image
                  source={look}
                  style={{ position: "absolute", right: 15, top: 15 }}
                />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const { width: screenWidth } = Dimensions.get("window");

const ImpactContent = ({ allCollect }) => {
  const [allEvents, setAllEvents] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedAllEvents = await getAllEvents();
        console.log("All Events:", fetchedAllEvents);
        setAllEvents(fetchedAllEvents);
        console.log(fetchedAllEvents.length);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const data = [
    {
      impactTitle: 'Total Users',
      impactValue: '17',
    },
    {
      impactTitle: 'Total Material Collections',
      impactValue: String(Number('50') + (Number(allCollect.totalMaterialCount) || 0)),
    },
    {
      impactTitle: 'Total Cleanups',
      impactValue: allEvents ? allEvents.length : 0,
    },
  ];
  const initialIndex = 1;

  const calculateInitialScrollPosition = () => {
    const cardWidth = screenWidth - 180;
    const initialOffset = initialIndex * cardWidth;

    return initialOffset;
  };
  return (


    <View style={styles.container2}>
      <Text style={styles.heading}>Community Impact</Text>
      <Text>Your efforts have helped your community!</Text>
      {/* <CarouselComponent /> */}
      <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ marginVertical: 20 }}
      contentOffset={{ x: calculateInitialScrollPosition(), y: 0 }}
    >
      {data.map((item, index) => (
        <View
          key={index}
          style={[styles.cardCarousel, index % 2 !== 0 ? styles.cardOdd : null]}
        >
          <View style={styles.cardImpact}>
            <SubHeading style={[index % 2 !== 0 ? styles.textOdd : null]}>
              {item.impactTitle}
            </SubHeading>
            <Image
              source={index % 2 !== 0 ? arrow : arrowOdd}
              style={styles.iconStyle}
            />
            <Heading
              className="text-5xl"
              style={[index % 2 === 0 ? styles.textEven : styles.textOdd]}
            >
              {item.impactValue}
            </Heading>
          </View>
        </View>
      ))}
    </ScrollView>
      <Text style={styles.heading}>Your Impact</Text>
      <Text>Review your efforts!</Text>

      <View style={styles.cardImpact3}>
        <SubHeading>Total Material Collections</SubHeading>
        <Heading style={styles.totalm} className="text-5xl text-primary text-center">
          {allCollect.totalMaterialCount}
        </Heading>
      </View>
      {allCollect && (
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 10 }}
        >
          {Object.entries(allCollect.materialSums).map(
            ([material, count], index) => (
              <View
                key={material}
                style={{
                  width: "50%",
                  padding: 8,
                  marginBottom: 8,
                }}
              >
                <MaterialCard material={material} count={count} imageSrc={getMaterialImage(material)} />
              </View>
          ))}
        </View>
      )}
    </View>
  );
};

const getMaterialImage = (material) => {
  switch (material) {
    case "plastic":
      return iconPlastic;
    case "glass":
      return iconGlass;
    case "metal":
      return iconMetal;
    case "paper":
      return iconPaper;
    case "tobacco":
      return iconTobacco;
    case "fabric":
      return iconFabric;
    default:
      return null;
  }
};

const Achievement = () => {
  const [selectedTab, setSelectedTab] = useState("Journey");
  const [allCollect, setAllCollect] = useState({ materialSums: {} });

  useEffect(() => {
    const fetchAllCollection = async () => {
      try {
        const allCollect = await getAllCollections();
        console.log("All Collection:", allCollect);
        setAllCollect(allCollect);
      } catch (error) {
        console.error("Error fetching all collections:", error);
      }
    };
    fetchAllCollection();
  }, []);

  if (!allCollect) {
    return null;
  }
  return (
    <>
      <View style={styles.container1}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "Journey" && styles.activeTab,
            ]}
            onPress={() => setSelectedTab("Journey")}
          >
            <SubHeading
              className="text-base"
              style={[
                styles.tabText,
                selectedTab === "Journey" && styles.activeTabText,
              ]}
            >
              Journey
            </SubHeading>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "Impact" && styles.activeTab,
            ]}
            onPress={() => setSelectedTab("Impact")}
          >
            <SubHeading
              className="text-base"
              style={[
                styles.tabText,
                selectedTab === "Impact" && styles.activeTabText,
              ]}
            >
              Impact
            </SubHeading>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {selectedTab === "Journey" && <JourneyCard allCollect={allCollect} />}
          {selectedTab === "Impact" && (
            <ImpactContent allCollect={allCollect} />
          )}
        </ScrollView>

        {/* <View style={{ marginBottom: 10 }}>
          <Text>Total Cleanups: {allCollect.totalEventCount}</Text>
        </View> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: "#F7F8FB",
    alignItems: "center",
  },
  container2: {
    padding: 16,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#DCDCDC",
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#004d40",
  },
  tabText: {
    color: "#777777",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  scrollViewContent: {
    alignItems: "center",
  },
  heading: {
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  cardImpact3: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 10,
  },
  header: {
    padding: 16,
    backgroundColor: "#007E4C",
    alignItems: "center",
  },
  // headerTitle: {
  //   fontSize: 24,
  //   color: "#F7F8FB",
  // },
  cardCarousel: {
    width: screenWidth - 150,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.3,
    borderColor: '#d5f3e7',
  },
  cardOdd: {
    backgroundColor: "#005435",
  },
  cardImpact: {
    marginTop: 10,
    alignItems: "center",
  },
  textOdd: {
    color: "#fff",
    paddingTop: 10,
  },
  textEven: {
    paddingTop: 10,
  },
  totalm: {
    paddingTop: 15,
  },
  iconStyle: {
    margin: 10,
    marginTop: 20,
  },
  textContainer: {
    gap: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightText: {
    color: "#5940C1",
  },
  textJournayTotal: {
    color: "#131313",
  },
  textJournayProgres: {
    color: "#131313",
    margin: 10,
  },
  cardJour: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 100,
    position: "relative",
    marginBottom: 20,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  cardJourCompleted: {
    backgroundColor: "#D3DBD8",
  },

  cardJourInactive: {
    backgroundColor: '#989898',
    opacity: 0.5,
  },
  leftCol: {
    flex: 1,
    alignItems: "center",
  },
  rightCol: {
    flex: 1,
  },
  completedText: {
    color: "#5940C1",
  },
  completedbox: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: "50%",
    padding: 4,
    marginBottom: 24,
    marginTop: 24,
  },
  earnedate: {
    color: "#131313",
    marginRight: 20,
  },
  mainLEvel: {
    margin: 50,
    alignItems: "center",
  },
  mainLEvelText: {
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  containerProgr: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainProgressBarCir: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  progressDot: {
    width: 18,
    height: 9,
    borderRadius: 3,
    margin: -1.7,
  },
  activeDot: {
    backgroundColor: "#005435",
  },
  inactiveDot: {
    backgroundColor: "#d9d9d9",
  },
});

export default Achievement;
