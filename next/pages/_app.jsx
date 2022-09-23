// 该App组件是所有不同页面通用的顶级组件。例如，您可以使用此App组件在页面之间导航时保​​持状态。
// 全局css只能在此文件导入
import "../styles/global.css";

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}