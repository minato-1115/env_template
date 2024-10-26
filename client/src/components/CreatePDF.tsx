import {
  Document,
  Page,
  View,
  Font,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";


interface CreatePDFProps {
  state: any;
}
Font.register({
  family: "Noto Sans JP",
  fonts: [{ src: "/fonts/static/NotoSerifJP-Black.ttf" }],
});

const CreatePDF = ({ state }: CreatePDFProps) => {
  return (
    <Document title="実験表紙">
      <Page size="A4" style={[styles.page]}>
        <Image style={styles.imageStyle} src={"/images/sign.png"}></Image>
        <View style={styles.section}>
          <Text style={[styles.textHeader, { textAlign: "center" }]}>
            物理学実験報告書
          </Text>
        </View>

        <View style={[styles.section]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "88%",
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ fontSize: 36, position: "relative", top: 5 }}>
              題目
            </Text>
            <Text
              style={{ fontSize: 24, position: "relative", top: 18, left: 10 }}
            >
              {state.title}
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", width: "88%", borderBottomWidth: 1 }}
          >
            <Text style={{ fontSize: 24, marginTop: 24 }}>担当先生</Text>
            <Text
              style={{
                fontSize: 24,
                marginTop: 24,
                position: "relative",
                left: 20,
                padding: 0,
              }}
            >
              {state.teacher}
            </Text>
          </View>
        </View>

        <View style={[styles.section]}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "flex-start",
              borderBottomWidth: 1,
            }}
          >
            <Text style={[styles.text, { fontSize: 20, width: 1000 }]}>
              理学部 第二部 物理学科
            </Text>
            <Text style={[styles.text, { fontSize: 20 }]}>{state.grade}年</Text>
            <Text style={[styles.text, { fontSize: 20 }]}>
              {state.grade}曜コース
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "88%",
              borderBottomWidth: 1,
            }}
          >
            <Text style={[styles.text, { fontSize: 20 }]}>学籍番号</Text>
            <Text style={styles.text}>{state.number}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "88%",
              borderBottomWidth: 1,
            }}
          >
            <Text style={[styles.text, { fontSize: 20 }]}>氏名</Text>
            <Text style={styles.text}>{state.name}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "70%",
              marginTop: 8,
            }}
          >
            <Text style={styles.text}>提出年月日</Text>
            <Text style={styles.text}>
              {state.submitDay.format(" YYYY 年 MM 月 DD 日 ")}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "70%",
            }}
          >
            <Text style={styles.text}>
              実験実施日{state.experimentDay1.format(" MM 月 DD 日 ")}
              {state.experimentDay2.format(" MM 月 DD 日 ")} 枚
            </Text>
          </View>
        </View>

        <View style={[styles.section, { position: "relative", left: 120 }]}>
          <Text style={[styles.text, { paddingBottom: 16 }]}>気象条件</Text>
          <Text style={styles.textStatus}>
            ➀{state.experimentDay1.format("MM/DD")},天気{state.weather1},気圧
            {state.airPressure1}hPa,室温{state.temperature1}℃,湿度
            {state.humidity1}%
          </Text>
          <Text style={styles.textStatus}>
            ➁{state.experimentDay2.format("MM/DD")},天気{state.weather2},気圧
            {state.airPressure2}hPa,室温{state.temperature2}℃,湿度
            {state.humidity2}%
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>共同実験者</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "88%",
              borderBottomWidth: 1,
            }}
          >
            <Text style={styles.text}>番号</Text>
            <Text style={styles.text}>{state.co1Number}</Text>
            <Text style={styles.text}>氏名</Text>
            <Text style={styles.text}>{state.coName1}</Text>
            <Text style={styles.text}></Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "88%",
              borderBottomWidth: 1,
            }}
          >
            <Text style={styles.text}>番号</Text>
            <Text style={styles.text}>{state.co2Number}</Text>
            <Text style={styles.text}>氏名</Text>
            <Text style={styles.text}>{state.coName2}</Text>
            <Text style={styles.text}></Text>
          </View>
        </View>

        <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 40 }}>
          東京理科大学　理学部物理学教室
        </Text>
      </Page>
    </Document>
  );
};
const styles = StyleSheet.create({
  page: {
    marginTop: 16,
    fontSize: 11,
    fontFamily: "Noto Sans JP",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  section: {
    marginTop: 8,
    marginHorizontal: 8,
    width: "80%",
    flexDirection: "column",
    alignItems: "center",
  },
  textHeader: {
    fontSize: 44,
  },
  itemFont: {
    fontSize: 24,
  },
  text: {
    fontSize: 16,
    margin: 8,
    width: "100%",
    position: "relative",
    top: 10,
  },
  textStatus: {
    fontSize: 12,
    width: "100%",
  },
  imageStyle: {
    width: 72,
    height: 88,
    marginLeft: 16,
    position: "absolute",
    top: "12%",
    right: "8%",
  },
});
export default CreatePDF;
