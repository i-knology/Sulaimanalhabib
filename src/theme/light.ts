import { ThemeConfig } from "antd";

const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: "#22baed",
    colorBgContainer: "#fff",
    colorSplit: "#F2F2F21A",
    fontFamily: "SuisseIntl",
    controlHeight: 50,
    colorPrimaryActive: "#22baed",
  },
  components: {
    Table: {
      headerBg: "#fff",
      headerColor: "#828282",
      borderColor: "#fff",
      cellPaddingBlock: 8,
      cellPaddingInline: 8,
    },
    Button: {
      defaultColor: "#22baed",
      boxShadow: "none",
    },
    Select: {
      selectorBg: "#fff",
    },
    Input: {
      paddingInline: 18,
      fontSize: 16,
    },
    DatePicker: {
      cellHeight: 14,
    },
    Card: {
      colorBorder: "transparent",
      boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
    },
    Segmented: {
      itemSelectedColor: "#22baed",
    },
    Pagination: {
      itemActiveBg: "black",
      borderRadius: 100,
      colorPrimary: "white",
      controlHeight: 40,
    },
    Modal: {
      padding: 0,
      paddingLG: 0,
    },
  },
};

export default lightTheme;
