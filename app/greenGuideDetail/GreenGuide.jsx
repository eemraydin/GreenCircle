import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import Text from "../../components/texts/Text";

import Articles from "../../assets/icons/greenGuideIcons/Articles";
import Safety from "../../assets/icons/greenGuideIcons/Safety";
import Wildlife from "../../assets/icons/greenGuideIcons/Wildlife";
import WildlifeWhite from "../../assets/icons/greenGuideIcons/Wildlife-white";
import ArticlesWhite from "../../assets/icons/greenGuideIcons/Articles-white";
import SafetyWhite from "../../assets/icons/greenGuideIcons/Safety-white";
import UpArrow from "../../assets/icons/greenGuideIcons/upArrow";
import DownArrow from "../../assets/icons/greenGuideIcons/downArrow";
import Tips from "../../assets/icons/greenGuideIcons/Tips";
import { images } from "../../constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../assets/icons/iconsActive/Back-Icon";
import Cross from "../../assets/icons/iconsActive/Cross";

const carouselData = [
  {
    id: "1",
    text: "Stick to designated trails.\nSome animals have learned to avoid trails and stay in areas that are not used by humans. (However, many animals do use trails.)",
  },
  {
    id: "2",
    text: "Stick to designated trails. Some animals have learned to avoid trails and stay in areas that are not used by humans. (However, many animals do use trails.)",
  },
  {
    id: "3",
    text: "Stick to designated trails. Some animals have learned to avoid trails and stay in areas that are not used by humans. (However, many animals do use trails.)",
  },
];

const safetyData = [
  {
    title: "Bear Safety",
    subtitle: "What to do in an encounter",
    content: [
      "If you see a bear, stop where you are and stay calm. Never run away. Observe the bear’s behaviour to decide on your next move.",
      "Check you have your bear spray and make sure you can get to it quickly, if you need it.",
      "If the bear has not noticed you, leave the area quietly. Go back the way you came while keeping an eye on them.",
      "If the bear has noticed you but is not reacting to your presence, speak softly and back away slowly.",
      "If the bear becomes agitated, makes noises, or seems aggressive, continue backing away slowly and talking softly. Do not run away.",
      "While backing away, do not make eye contact, but keep the bear in sight. Take your bear spray out and get ready to use it.",
      "If the bear charges, stand your ground and discharge your bear spray when they are within spraying range.",
      "If you spot a bear causing an issue, you can report it via the RAPP Line 1-877-952-7277 Information sourced from bcparks.ca",
    ],
    image: images.Bear,
  },
  {
    title: "Coyote Safety",
    subtitle: "Concerns and encounters",
    content: [
      "It is not normal for coyotes to attack or pursue humans, especially adults. Aggressive behavior toward humans by coyotes is usually the result of the animal becoming conditioned/comfortable with people as a result of direct or indirect feeding.",
      "If a coyote is spotted in an urban or rural area it is recommend to keep children inside until the animal has left the area or to pick children up and carry them. The animal was likely just passing through. Children shouldn't be left unsupervised. Also refer to pets if applicable.",
      "If a coyote approaches you:",
      "Make yourself look as large as possible - if sitting, stand for example.",
      "Wave your arms and throw objects.",
      "Shout in a loud aggressive voice.",
    ],
    image: images.Coyote,
  },
  {
    title: "Cougar Safety",
    subtitle: "Avoiding interactions",
    content: [
      "Stay calm and keep the cougar in view, pick up children immediately. Children frighten easily and the noise and movements they make could provoke an attack. Back away slowly, ensuring that the animal has a clear avenue of escape.",
      "Make yourself look as large as possible and keep the cougar in front of you at all times. Never run or turn your back on a cougar, sudden movement may provoke an attack.",
      "If a cougar shows interest or follows you, respond aggressively, maintain eye contact with the cougar, show your teeth and make loud noise. Arm yourself with rocks or sticks as weapons.",
      "If a cougar attacks, fight back, convince the cougar you are a threat and not prey, use anything you can as a weapon. Focus your attack on the cougar's face and eyes. Use rocks, sticks, bear spray or personal belongings as weapons. You are trying to convince the cougar that you are a threat, and are not prey.",
    ],
    image: images.Cougar,
  },
];

const articleData = [
  {
    id: "1",
    image: require("../../assets/icons/greenGuideIcons/article1.png"),
    title: "The Science Behind Mindfulness and Nature",
    author: "Lynn Louise Wonders via Medium",
    published: "Sept 24, 2023",
    profilePicture: require("../../assets/icons/greenGuideIcons/PP-Article1.png"),
    content:
      "The demands of this modern life we lead can create overwhelming stress and often take a toll on our mental health...",
    fullContent:
      "The demands of this modern life we lead can create overwhelming stress and often take a toll on our mental health. The constant hustle and bustle, the never-ending to-do lists, and the omnipresence of digital screens can leave us feeling overwhelmed and mentally drained. However, there are two powerful remedies that can help us find solace and restore our mental well-being: mindfulness and spending time in nature. In this article, we will explore the science-backed reasons why these two practices are essential for our mental health and provide practical tips on incorporating them into even the busiest lifestyles.The Science Behind Mindfulness and Nature Mindfulness: A Mental Reset ButtonMindfulness is the practice of being fully present in the moment, paying attention to your thoughts and feelings without judgment. Numerous studies have shown its profound benefits for mental health: Stress Reduction: A meta-analysis conducted by Hofmann et al. (2010) found that mindfulness-based interventions significantly reduce symptoms of anxiety and depression. Mindfulness helps individuals become more aware of their stress triggers and develop healthier habits.",
  },
  {
    id: "2",
    image: require("../../assets/icons/greenGuideIcons/article2.png"),
    title:
      "'Nature is good medicine': What is forest bathing and why are people doing it?",
    author: "Alanna Kelly via Vancouver is Awesome",
    published: "Mar 21, 2024",
    profilePicture: require("../../assets/icons/greenGuideIcons/PP-Article2.png"),
    content:
      "Forest bathing, or Shinrin-yoku, is a Japanese practice that involves immersing oneself in a forest environment. ",
    fullContent:
      "Forest bathing, or Shinrin-yoku, is a Japanese practice that involves immersing oneself in a forest environment. This is to engage the senses and promote well-being. Unlike traditional hiking, it focuses on mindfulness and sensory awareness, encouraging participants to walk slowly, breathe deeply, and attentively observe their surroundings. This practice offers relief from the stress and distractions of modern life.Scientific research supports the benefits of forest bathing, showing it can reduce cortisol levels, lower blood pressure, and improve mood. The practice has also been linked to enhanced immune function due to phytoncides, antimicrobial compounds emitted by trees. Mentally, it promotes clarity, reduces anxiety, and fosters a deep sense of connection with nature.As people seek to reconnect with nature amidst urban living and digital distractions, forest bathing is gaining popularity. Forest therapy guides now offer structured experiences to maximize its benefits. This practice highlights that sometimes the best medicine is as simple as a mindful walk in the woods.",
  },
  {
    id: "3",
    image: require("../../assets/icons/greenGuideIcons/article3.png"),
    title:
      "Peyto Lake named one of the best spots to see clearest water on Earth",
    author: "Laine Mitchell via Daily Hive Canada",
    published: "May 11, 2024",
    profilePicture: require("../../assets/icons/greenGuideIcons/PP-Article3.png"),
    content:
      "Peyto Lake, nestled in the Canadian Rockies of Banff National Park, has earned the distinction of being one of the best spots on Earth to witness crystal-clear water.",
    fullContent:
      "Peyto Lake, nestled in the Canadian Rockies of Banff National Park, has earned the distinction of being one of the best spots on Earth to witness crystal-clear water. This stunning glacial lake, renowned for its striking turquoise hue, attracts visitors from around the world who are eager to experience its pristine beauty. The clarity of Peyto Lake's water is attributed to the glacial rock flour that flows into it, which refracts light and gives the lake its unique, vivid color. It is not only visually stunning but also indicative of the pristine natural environment that surrounds it. This clarity is maintained by the lake's remote location, high altitude, and the protected status of Banff National Park, which helps to minimize pollution and human impact overall in this area. Visitors to Peyto Lake often remark on the almost surreal quality of the water, which allows for exceptional visibility and creates a mirror-like reflection of the surrounding mountains and forests. As one of the clearest bodies of water on Earth, Peyto Lake has become a must-visit destination for nature enthusiasts, photographers, and travelers seeking a unique and awe-inspiring experience. ",
  },
];

const ITEM_WIDTH = 309; // Adjust this width as per your requirement

const TabContent1 = () => {
  const [expanded, setExpanded] = useState(null);

  const renderCarouselItem = ({ item }) => (
    <View
      className="mx-3 border-[0.5px] border-gray-200 rounded-[8px] bg-white flex-row"
      style={{ width: ITEM_WIDTH }}
    >
      <View className="justify-start pt-4 pl-4">
        <Tips name="home" size={24} className="justify-start" />
      </View>
      <View className="pl-4 pt-4 max-w-[225px] h-full">
        <Text className="text-xs font-redhatText">{item.text}</Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1">
      <Text className="text-2xl px-2 pb-2 text-primary font-redhatBold">
        Wildlife 101
      </Text>
      <Text className="font-redhatBold pb-2 px-2">
        Avoiding animal encounters
      </Text>

      <FlatList
        horizontal
        data={carouselData}
        renderItem={renderCarouselItem}
        keyExtractor={(item) => item.id}
        className="h-[130px]"
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        initialScrollIndex={1}
        pagingEnabled
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
      />
      {safetyData.map((item, index) => (
        <View className="mt-6" key={index}>
          <View
            key={index}
            className="mx-4 border-[0.5px] border-gray-200 rounded bg-white"
          >
            <TouchableOpacity
              onPress={() => setExpanded(expanded === index ? null : index)}
            >
              <View className="flex-row">
                <View>
                  <Image source={item.image} className="w-[110px]" />
                </View>

                <View className="justify-center flex-col p-6">
                  <Text className="text-lg font-redhatBold">{item.title}</Text>
                  <Text>{item.subtitle}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => setExpanded(expanded === index ? null : index)}
          >
            <View className="mx-4 mt-1 border-[0.5px] border-gray-200 rounded bg-white justify-center items-center">
              <View className="h-[30px] justify-center items-center">
                <Text>{expanded === index ? <DownArrow /> : <UpArrow />} </Text>
              </View>
              {expanded === index && (
                <View className="mx-4 w-full p-4 border-[0.5px] border-gray-200">
                  {item.content.map((text, idx) => (
                    <View key={idx} className="flex-row py-1">
                      <Text className="text-xs font-redhat">• </Text>
                      <Text className="text-xs flex-shrink font-redhat">
                        {text}
                      </Text>
                    </View>
                  ))}
                  <Text className="text-xs font-bold font-redhat">
                    It is an offence under section 33.1(1) of the Wildlife Act
                    to feed dangerous wildlife. Report via 1-877-952-7277 anyone
                    that is feeding or intentionally attracting dangerous
                    wildlife. Information sourced from gov.bc.ca
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      ))}
      <SafeAreaView />
    </View>
  );
};

const TabContent2 = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <View className="flex-1 m-2">
      {expandedIndex !== null ? (
        <View>
          <TouchableOpacity
            onPress={() => setExpandedIndex(null)}
            className="absolute top-6 left-6 z-10"
          >
            <View>
              <BackButton />
            </View>
          </TouchableOpacity>
          <View className="p-4">
            <Image
              source={articleData[expandedIndex].image}
              className="w-full h-[200px] rounded-t-[10px]"
            />
            <View className="border-[0.5px] border-gray-400 rounded-lg mt-[-20px] bg-white p-3 ">
              <Text className="text-lg font-bold mt-4 font-redhat">
                {articleData[expandedIndex].title}
              </Text>
              <View className="flex-row mt-2 items-center ">
                <Image
                  source={articleData[expandedIndex].profilePicture}
                  className="w-[30px] h-[30px] rounded-full"
                />
                <View className="flex-col ">
                  <Text className="ml-2 text-sm text-gray-500 font-redhat">
                    {articleData[expandedIndex].author}
                  </Text>
                  <Text className="ml-2 text-sm text-gray-500 font-redhat">
                    {articleData[expandedIndex].published}
                  </Text>
                </View>
              </View>
              <Text className="mt-4 font-redhat p-1">
                {articleData[expandedIndex].fullContent}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View>
          <Text className="text-2xl font-bold pl-4 font-redhat">
            Latest Articles
          </Text>
          {articleData.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => toggleExpand(index)}
              className="border-[1px] border-gray-300 rounded-[10px] m-4 overflow-hidden"
            >
              {index === 1 || index === 2 ? (
                <View className="flex-row">
                  <View>
                    <Image
                      source={item.image}
                      className=" w-24 rounded-b-[10px]"
                    />
                  </View>
                  <View className="p-4 w-[250px]">
                    <Text className="text-lg font-bold font-redhat">
                      {item.title}
                    </Text>
                    <View className="flex-row mt-2 items-center ">
                      <Image
                        source={item.profilePicture}
                        className="w-[30px] h-[30px] rounded-full"
                      />
                      <View className="flex-col ">
                        <Text className="ml-2 text-xs text-gray-500 font-redhat">
                          {item.author}
                        </Text>
                        <Text className="ml-2 text-xs text-gray-500 font-redhat">
                          {item.published}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row mt-2 w-[100px] h-[30px] bg-primary text-white rounded-full justify-center items-center ml-auto">
                      <Text className="text-white">Read More</Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View>
                  <Image
                    source={item.image}
                    className="w-full h-[150px] rounded-t-[10px]"
                  />
                  <View className="p-4">
                    <Text className="text-lg font-bold font-redhat">
                      {item.title}
                    </Text>
                    <View className="flex-row mt-2 items-center ">
                      <Image
                        source={item.profilePicture}
                        className="w-[30px] h-[30px] rounded-full"
                      />
                      <View className="flex-col ">
                        <Text className="ml-2 text-sm text-gray-500 font-redhat">
                          {item.author}
                        </Text>
                        <Text className="ml-2 text-sm text-gray-500 font-redhat">
                          {item.published}
                        </Text>
                      </View>
                    </View>
                    <Text className="mt-2 font-redhat">{item.content}</Text>
                    <View className="flex-row mt-2 w-[100px] h-[30px] bg-primary text-white rounded-full justify-center items-center ml-auto">
                      <Text className="text-white">Read More</Text>
                    </View>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
      <SafeAreaView />
    </View>
  );
};

const TabContent3 = () => {
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (row) => {
    setExpandedRow(expandedRow === row ? null : row);
  };

  const rows = [
    {
      title: "Needles/syringes",
      content:
        "  • Do not pick up under any circumstances.\n Leave needle where it is and call the Needle Hotline at (604-657-6561)Information sourced from The City of Vancouver",
    },
    {
      title: "Broken glass/sharp objects",
      content:
        "  • Use a litter picker, then wrap in newspaper before placing in garbage bag. \n Information sourced from The City of Vancouver",
    },
    {
      title: "Used gloves/tissues/wipes",
      content:
        "  • Use litter picker and place in garbage bag. \n Information sourced from The City of Vancouver",
    },
    {
      title: "Hazardous material",
      content:
        " • Do not handle hazardous materials.Report by calling 3-1-1 or contact via the Van311 website. \n Information sourced from The City of Vancouver",
    },
    {
      title: "Large or heavy items",
      content:
        " • Do not attempt to lift large or heavy items. Report abandoned large items by calling 3-1-1 or contacting via the Van311 website. \n Information sourced from The City of Vancouver",
    },
  ];

  return (
    //Tab-1
    <View className="flex-1">
      <View className="m-2 rounded-xl h-[70px] bg-red-500 justify-end border-[0.5px] border-gray-400">
        <View className="bg-white h-[55px] w-full px-4 py-2 rounded-b-xl overflow-hidden justify-center items-center">
          <Text className="text-xs font-bold font-redhat">
            In the event of an accident or emergency, always dial 9-1-1
          </Text>
        </View>
      </View>

      <View
        className={`m-2 rounded-xl bg-white border-[0.5px] border-gray-400 ${
          expanded ? "h-auto" : "h-[95px]"
        } `}
      >
        <View className="bg-primary w-full h-[15px] rounded-t-xl"></View>
        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          className="w-full"
        >
          <View className="bg-white w-full rounded-b-xl overflow-hidden justify-start items-center">
            <Text className="text-lg font-bold font-redhat p-4">
              Safety Tips
            </Text>

            <View className="w-full pb-1 justify-center items-center">
              {expanded ? <DownArrow /> : <UpArrow />}
            </View>

            {expanded && (
              <View className="w-full px-6 py-4 border-t-[0.5px] border-gray-300">
                <Text className="text-xs font-redhat">
                  • Cross streets at intersections or marked crosswalks.
                </Text>
                <Text className="text-xs  font-redhat">
                  • Ensure minors are supervised by adults.
                </Text>
                <Text className="text-xs  font-redhat">
                  • Work in pairs, if possible.
                </Text>
                <Text className="text-xs  font-redhat">
                  • Don't consume alcohol and/or drugs.
                </Text>
                <Text className="text-xs font-redhat">
                  • Report injuries to someone you're with, immediately.
                </Text>
                <Text className="text-xs font-redhat">
                  • In case of emergency, always dial 911.
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <View
        className={`m-2 rounded-xl bg-white border-[0.5px] border-gray-400 ${
          expanded2 ? "h-auto" : "h-[95px]"
        } `}
      >
        <View className="bg-accent w-full h-[15px] rounded-t-xl"></View>
        <TouchableOpacity
          onPress={() => setExpanded2(!expanded2)}
          className="w-full"
        >
          <View className="bg-white w-full rounded-b-xl overflow-hidden justify-start items-center">
            <Text className="text-lg font-bold font-redhat p-4">
              Staying Prepared
            </Text>

            <View className="w-full pb-1 justify-center items-center">
              {expanded2 ? <DownArrow /> : <UpArrow />}
            </View>

            {expanded2 && (
              <View className="w-full px-6 py-4 border-t-[0.5px] border-gray-300">
                <Text className="text-xs font-redhat">
                  • Wear high-visibility or bright clothing, if possible.
                </Text>
                <Text className="text-xs  font-redhat">
                  • Wear protective gloves when picking up items.
                </Text>
                <Text className="text-xs  font-redhat">
                  • Dress appropriately for the weather.
                </Text>
                <Text className="text-xs  font-redhat">
                  • Avoid the use of headphones or earbuds.
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <View
        className={`m-2 rounded-xl bg-white border-[0.5px] border-gray-400 h-auto`}
      >
        <View className="bg-primary w-full h-[15px] rounded-t-xl"></View>
        <View className="bg-white w-full rounded-b-xl overflow-hidden justify-start items-center">
          <Text className="text-lg font-bold font-redhat p-4">
            Proper Handling of Materials
          </Text>
          {rows.map((row, index) => (
            <View
              key={index}
              className={`w-full ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              }`}
            >
              <TouchableOpacity
                onPress={() => handleRowClick(index)}
                className="w-full"
              >
                <View className="w-full px-6 py-2 justify-center items-center flex-row ">
                  <View className="justify-center items-cente px-2">
                    <Cross />
                  </View>
                  <Text className="text-xs font-redhat flex-1">
                    {row.title}
                  </Text>
                </View>
              </TouchableOpacity>

              {expandedRow === index && (
                <View className="w-full px-6 py-4 border-t-[0.5px] border-gray-300 ">
                  <Text className="text-xs font-redhat">{row.content}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
      <SafeAreaView />
    </View>
  );
};

const GreenGuide = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return <TabContent1 />;
      case 1:
        return <TabContent2 />;
      case 2:
        return <TabContent3 />;
      default:
        return <TabContent1 />;
    }
  };

  return (
    <ScrollView>
      <View className="flex-1">
        <Text className="text-xs p-2">
          Learn more about the environment and wellbeing
        </Text>
        <View className="flex-row justify-center gap-x-6 bg-gray-100 py-6">
          <View className="items-center">
            <TouchableOpacity
              onPress={() => setSelectedTab(0)}
              className={`border-[0.5px] rounded-[8px] w-[76px] h-[76px] justify-center items-center ${
                selectedTab === 0 ? "bg-primary" : "bg-white"
              } `}
            >
              {selectedTab === 0 ? (
                <WildlifeWhite name="home" size={24} />
              ) : (
                <Wildlife name="home" size={24} className="bg-white" />
              )}
            </TouchableOpacity>
            <Text
              className={`mt-1 font-redhat ${
                selectedTab === 0 ? "text-primary" : "text-gray-500"
              }`}
            >
              Wildlife 101
            </Text>
          </View>
          <View className="items-center">
            <TouchableOpacity
              onPress={() => setSelectedTab(1)}
              className={`border-[0.5px] rounded-[8px] w-[76px] h-[76px] justify-center items-center ${
                selectedTab === 1 ? "bg-primary" : "bg-white"
              } `}
            >
              {selectedTab === 1 ? (
                <ArticlesWhite name="home" size={24} />
              ) : (
                <Articles name="search" size={24} />
              )}
            </TouchableOpacity>
            <Text
              className={`mt-1 font-redhat ${
                selectedTab === 1 ? "text-primary" : "text-gray-500"
              }`}
            >
              Articles
            </Text>
          </View>
          <View className="items-center">
            <TouchableOpacity
              onPress={() => setSelectedTab(2)}
              className={`border-[0.5px] rounded-[8px] w-[76px] h-[76px] justify-center items-center  ${
                selectedTab === 2 ? "bg-primary" : "bg-white"
              } `}
            >
              {selectedTab === 2 ? (
                <SafetyWhite name="home" size={24} />
              ) : (
                <Safety name="search" size={24} />
              )}
            </TouchableOpacity>
            <Text
              className={`mt-1 font-redhat ${
                selectedTab === 2 ? "text-primary" : "text-gray-500"
              }`}
            >
              Safety Tips
            </Text>
          </View>
        </View>
        <View className="flex-1">{renderContent()}</View>
      </View>
    </ScrollView>
  );
};

export default GreenGuide;
