import CustomInput from "./CustomInput";
import { useContext } from "react";
import { MyContext } from "../hooks/useTestHook";
import PickDate from "./PickDate";
import { Dayjs } from "dayjs";
import Pulldown from "./Pulldown";
import { selectItem } from "../common/constants/selectItems";
import useWindowSize from "../hooks/useWindowSize";
import ConvertButton from "./ConvertButton";
const InputForm = () => {
  const context = useContext(MyContext);
  const windowSize = useWindowSize();
  // コンテキストがundefinedの場合のエラーハンドリング
  if (!context) {
    throw new Error("MyContext.Provider が正しく設定されていません");
  }

  const { state, setState } = context;
  return (
    <div
      style={{
        paddingTop: "10%",
        alignSelf: "center",
        backgroundColor: "#fff",
        overflowY: "auto",
        width: windowSize.width * 0.3,
        height: windowSize.height,
      }}
    >
      <h2 style={{ color: "#000" }}>レポート表紙の入力欄</h2>
      <div
        style={{
          borderTopWidth: 2,
          borderTopColor: "#BFC5CA",
          borderTopStyle: "solid",
        }}
      >
        <p
          style={{
            fontWeight: "bold",
            fontFamily: "sans-serif",
            color: "#000",
            height: 0,
            textAlign: "left",
            marginLeft: 24,
            paddingBottom: 24,
            fontSize: 20,
          }}
        >
          必須の入力事項
        </p>
      </div>

      <Pulldown
        options={selectItem.title}
        itemName="タイトル"
        selectValue={(newValue: string) => {
          setState((prevState) => ({ ...prevState, title: newValue }));
        }}
      />
      <Pulldown
        options={selectItem.teacher}
        itemName="担当教員"
        selectValue={(newValue: string) => {
          setState((prevState) => ({ ...prevState, teacher: newValue }));
        }}
      />
      <CustomInput
        label="学籍番号"
        placeholder="22XXXXX"
        catchValue={(text) =>
          setState((prevState) => ({
            ...prevState,
            number: text,
          }))
        }
      />
      <CustomInput
        placeholder="氏名の入力をしてください　(例:山田　太郎）"
        label="氏名"
        catchValue={(text) =>
          setState((prevState) => ({
            ...prevState,
            name: text,
          }))
        }
      />

      <PickDate
        label="提出年月日"
        selectDate={(selectedDate: Dayjs) =>
          setState((prevState) => ({ ...prevState, submitDay: selectedDate }))
        }
      />
      <CustomInput
        placeholder="ページ数を入力してください"
        label="ページ数"
        catchValue={(text) =>
          setState((prevState) => ({
            ...prevState,
            page: text,
          }))
        }
      />

      <CustomInput
        placeholder="共同実験者の名前を入力してください"
        label="共同実験者1"
        catchValue={(text) =>
          setState((prevState) => ({
            ...prevState,
            coName1: text,
          }))
        }
      />
      <CustomInput
        placeholder="共同実験者の学籍番号を入力してください"
        label="共同実験者1の学籍番号"
        catchValue={(text) =>
          setState((prevState) => ({
            ...prevState,
            co1Number: text,
          }))
        }
      />
      <CustomInput
        placeholder="共同実験者の名前を入力してください"
        label="共同実験者2"
        catchValue={(text) =>
          setState((prevState) => ({
            ...prevState,
            coName2: text,
          }))
        }
      />
      <CustomInput
        placeholder="共同実験者の学籍番号を入力してください"
        label="共同実験者2の学籍番号"
        catchValue={(text) =>
          setState((prevState) => ({
            ...prevState,
            co2Number: text,
          }))
        }
      />
      <div
        style={{
          margin: 16,
          borderTopWidth: 2,
          borderTopColor: "#BFC5CA",
          borderTopStyle: "solid",
          borderBottomWidth: 2,
          borderBottomColor: "#BFC5CA",
          borderBottomStyle: "solid",
        }}
      >
        <div>
          <p
            style={{
              fontWeight: "bold",
              fontFamily: "sans-serif",
              color: "#000",
              height: 0,
              textAlign: "left",
              marginLeft: 24,
              marginBottom: 24,
              fontSize: 20,
            }}
          >
            1日目の入力事項
          </p>
          <PickDate
            label="実験実施日1"
            grade={state.grade}
            selectDate={(selectedDate: Dayjs) =>
              setState((prevState) => ({
                ...prevState,
                experimentDay1: selectedDate,
              }))
            }
          />
          <CustomInput
            placeholder="気圧の入力してください (一般に1013hpaくらい)"
            label="１日目の気圧"
            catchValue={(text) =>
              setState((prevState) => ({
                ...prevState,
                airPressure1: text,
              }))
            }
          />

          <CustomInput
            placeholder="気温の入力してください"
            label="1日目の気温"
            catchValue={(text) =>
              setState((prevState) => ({
                ...prevState,
                temperature1: text,
              }))
            }
          />
          <CustomInput
            placeholder="湿度の入力してください"
            label="1日目の湿度"
            catchValue={(text) =>
              setState((prevState) => ({
                ...prevState,
                humidity1: text,
              }))
            }
          />
          <Pulldown
            options={selectItem.weather}
            itemName="1日目の天気"
            selectValue={(newValue: string) => {
              setState((prevState) => ({ ...prevState, weather1: newValue }));
            }}
          />
        </div>
        <div
          style={{
            marginTop: 16,
            paddingTop: 8,
            borderTopWidth: 2,
            borderTopColor: "#BFC5CA",
            borderTopStyle: "solid",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              fontFamily: "sans-serif",
              color: "#000",
              height: 0,
              textAlign: "left",
              marginLeft: 24,
              marginBottom: 24,
              fontSize: 20,
            }}
          >
            2日目の入力事項
          </p>
          <PickDate
            label="実験実施日2"
            grade={state.grade}
            selectDate={(selectedDate: Dayjs) =>
              setState((prevState) => ({
                ...prevState,
                experimentDay2: selectedDate,
              }))
            }
          />
          <CustomInput
            placeholder="気圧の入力してください (一般に1013hpaくらい)"
            label="2日目の気圧"
            catchValue={(text) =>
              setState((prevState) => ({
                ...prevState,
                airPressure2: text,
              }))
            }
          />
          <CustomInput
            placeholder="気温の入力してください"
            label="2日目の気温"
            catchValue={(text) =>
              setState((prevState) => ({
                ...prevState,
                temperature2: text,
              }))
            }
          />

          <CustomInput
            placeholder="湿度の入力してください"
            label="2日目の湿度"
            catchValue={(text) =>
              setState((prevState) => ({
                ...prevState,
                humidity2: text,
              }))
            }
          />
          <Pulldown
            options={selectItem.weather}
            itemName="2日目の天気"
            selectValue={(newValue: string) => {
              setState((prevState) => ({ ...prevState, weather2: newValue }));
            }}
          />
        </div>
      </div>
      <ConvertButton />
    </div>
  );
};
export default InputForm;
