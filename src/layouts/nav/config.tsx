import SvgColor from "@/components/svg-color";

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);
const navConfig = [
  {
    title: "首页",
    path: "/dashboard/index",
    icon: icon("ic_home"),
  },
  {
    title: "知识库",
    path: "/dashboard/knowledge",
    icon: icon("ic_knowledge"),
  },
  {
    title: "报告管理",
    path: "/dashboard/report",
    icon: icon("ic_report"),
  },
  {
    title: "小工具",
    path: "/dashboard/tools",
    icon: icon("ic_tool"),
  },
];

export default navConfig;
